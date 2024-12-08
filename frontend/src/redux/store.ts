console.log("store initialized");

import { configureStore } from "@reduxjs/toolkit";
import authReducer, { refreshToken } from "./slices/authSlice";
import { setTokenHandler } from "@/utils/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const getToken = () => store.getState().auth.token;

const refreshAuthToken = async () => {
  try {
    const result = await store.dispatch(refreshToken()).unwrap();
    return result.accessToken;
  } catch {
    return null;
  }
};

setTokenHandler(getToken, refreshAuthToken);

// Tipe untuk digunakan pada dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
