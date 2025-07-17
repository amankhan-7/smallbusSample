import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { paymentApiSlice } from "./api/paymentApiSlice";
import authReducer from "./slices/authSlice";
import busReducer from "./slices/busSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bus: busReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [paymentApiSlice.reducerPath]: paymentApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(paymentApiSlice.middleware),
});
