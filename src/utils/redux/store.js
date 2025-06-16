import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./features/booking/bookingSlice";
import userReducer from "./features/user/userSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
