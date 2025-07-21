import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAuth } from "@/utils/redux/slices/authSlice";
import { safeLocalStorage } from "@/utils/localStorage";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api/v1/consumer`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Token expired, attempting to refresh...");
    const refreshResult = await baseQuery(
      {
        url: "/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data?.success) {
      console.log("Token refreshed successfully");
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Token refresh failed, clearing auth state");
      api.dispatch(clearAuth());
      safeLocalStorage.removeItem("user");
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Bus",
    "AvailableSeats",
    "PopularRoutes",
    "BusSchedule",
    "Booking",
    "SeatMap",
    "BusAvailableSeats",
    "BookingDetails",
  ],
  endpoints: () => ({}),
});
