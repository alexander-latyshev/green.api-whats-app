import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    authorization: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
