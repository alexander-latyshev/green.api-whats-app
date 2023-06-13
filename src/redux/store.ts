import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import chatSlice from "./reducers/chatSlice";
// import thunk from 'redux-thunk';

// const middlewares = [thunk];

export const store = configureStore({
  reducer: {
    authorization: authSlice,
    chat: chatSlice,
  },
  // middleware: (getDefaultMiddleware) => [
  //   ...getDefaultMiddleware(),
  //   ...middlewares,
  // ],
  // middleware: [...middlewares],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
