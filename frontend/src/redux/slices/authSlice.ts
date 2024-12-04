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
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<LoginResponse, LoginArgs>(
  "auth/loginUser",
  async ({ credential, password }, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", { credential, password });
      const { accessToken, user } = response.data;

      return { token: accessToken, user };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
