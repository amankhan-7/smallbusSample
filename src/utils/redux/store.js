import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./features/booking/bookingSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    user: userReducer,
  },
});
