import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./features/booking/bookingSlice";
import userReducer from "./features/user/userSlice";
import { apiSlice } from "./api/apiSlice";
import { paymentApiSlice } from "./api/paymentApiSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [paymentApiSlice.reducerPath]: paymentApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(paymentApiSlice.middleware),
});
