import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

interface LoginResponse {
  token: string;
  user: { email: string | null; username: string | null };
}

interface LoginArgs {
  credential: string;
  password: string;
}

interface AuthState {
  user: null | { email: string | null; username: string | null };
  token: null | string;
  loading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  user: null,
  token: sessionStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<LoginResponse, LoginArgs>(
  "auth/loginUser",
  async ({ credential, password }, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", { credential, password });
      const { accessToken, refreshToken, user } = response.data;
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      return { token: accessToken, user };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const refreshToken = createAsyncThunk<{ accessToken: string }>(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const response = await api.post("/auth/refresh-token");
      const { accessToken } = response.data;

      sessionStorage.setItem("accessToken", accessToken);
      return { accessToken };
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Failed to refresh token");
    }
  }
);

export const logoutUser = createAsyncThunk<void>(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("Refresh token tidak ditemukan!");
      await api.post("/auth/logout", { refreshToken });
    } catch (error: any) {
      console.error("Logout API Failed: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    } finally {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("refreshToken");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.token = null;
      })

      // logout

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { restoreToken } = authSlice.actions;
export default authSlice.reducer;
