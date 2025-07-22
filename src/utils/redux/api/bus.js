import { createBusSearchUrl } from "@/utils/navigation";
import { apiSlice } from "./apiSlice";

export const busApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchBuses: builder.query({
      query: ({ fromCity, toCity, travelDate }) => ({
        url: `/search-buses`,
        method: "POST",
        body: { fromCity, toCity, travelDate },
      }),
      transformResponse: (res) => res.data,
      providesTags: (_res, _err, { fromCity, toCity, travelDate }) => [
        { type: "Bus", id: `${fromCity}-${toCity}-${travelDate}` },
      ],
    }),

    getBusDetails: builder.query({
      query: ({ busId }) => ({
        url: `/buses/${busId}`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: (_res, _err, { busId }) => [{ type: "Bus", id: busId }],
    }),

    getAvailableSeats: builder.query({
      query: ({ busId }) => ({
        url: `/buses/${busId}/seats`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: (_res, _err, { busId }) => [
        { type: "AvailableSeats", id: busId },
      ],
    }),

    getPopularRoutes: builder.query({
      query: () => ({ url: `/popular-routes`, method: "GET" }),
      transformResponse: async (res) => {
        if (!res.data || !Array.isArray(res.data.popularRoutes)) {
          return [];
        }
        const popularRoutes = await Promise.all(
          res.data.popularRoutes.map(async (route) => ({
            from: route.route.from,
            to: route.route.to,
            totalBookings: route.totalBookings,
            avgPrice: route.avgPrice,
            href: await createBusSearchUrl({
              fromCity: route.route.from,
              toCity: route.route.to,
              travelDate: new Date().toISOString().split("T")[0],
            }),
          }))
        );
        return popularRoutes;
      },
      providesTags: () => [{ type: "PopularRoutes", id: "LIST" }],
    }),

    getBusSchedule: builder.mutation({
      query: ({ fromCity, toCity, travelDate }) => {
        return {
          url: `/bus-schedule?fromCity=${fromCity}&toCity=${toCity}&date=${travelDate}`,
          method: "GET",
        };
      },
      transformResponse: (res) => res.data,
      providesTags: (_res, _err, { fromCity, toCity, travelDate }) => [
        { type: "BusSchedule", id: `${fromCity}-${toCity}-${travelDate}` },
      ],
    }),

    lockSeatsForBooking: builder.mutation({
      query: ({ busId, seatNumbers, userId, passengerDetails }) => ({
        url: `/lock-seats`,
        method: "POST",
        body: { busId, seatNumbers, userId, passengerDetails },
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (_res, _err, { busId }) => [{ type: "Bus", id: busId }],
    }),

    confirmBookingPayment: builder.mutation({
      query: ({ bookingId, paymentId, orderId, signature, paymentMethod }) => ({
        url: `/confirm-booking`,
        method: "POST",
        body: { bookingId, paymentId, orderId, signature, paymentMethod },
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (_res, _err, { bookingId }) => [
        { type: "Booking", id: bookingId },
      ],
    }),

    cancelBooking: builder.mutation({
      query: ({ bookingId, userId }) => ({
        url: `/cancel-booking`,
        method: "POST",
        body: { bookingId, userId },
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (_res, _err, { bookingId }) => [
        { type: "Booking", id: bookingId },
      ],
    }),

    getSeatMap: builder.query({
      query: ({ busId }) => ({
        url: `/buses/${busId}/seat-map`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: (_res, _err, { busId }) => [{ type: "SeatMap", id: busId }],
    }),

    getBusAvailableSeats: builder.query({
      query: ({ busId }) => ({
        url: `/buses/${busId}/available-seats`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: (_res, _err, { busId }) => [
        { type: "BusAvailableSeats", id: busId },
      ],
    }),

    getBookingDetails: builder.query({
      query: ({ bookingId }) => ({
        url: `/get-booking-details`,
        method: "POST",
        body: { bookingId },
      }),
      transformResponse: (res) => res.data,
      providesTags: (_res, _err, { bookingId }) => [
        { type: "BookingDetails", id: bookingId },
      ],
    }),

    getBookingHistory: builder.mutation({
      query: ({ userId, status, fromDate, limit }) => ({
        url: `/get-booking-history`,
        method: "POST",
        body: { userId, status, fromDate, limit },
      }),
      transformResponse: (res) => res.data,
      providesTags: (_res, _err, { userId }) => [
        { type: "Booking", id: userId },
      ],
    }),
    getBookingStats: builder.query({
      query: ({ userId }) => ({
        url: `/get-booking-stats`,
        method: "POST",
        body: { userId },
      }),
      transformResponse: (res) => res.data,
      providesTags: (_res, _err, { userId }) => [
        { type: "BookingStats", id: userId },
      ],
    }),
  }),
});

export const {
  useSearchBusesQuery,
  useGetBusDetailsQuery,
  useGetAvailableSeatsQuery,
  useGetPopularRoutesQuery,
  useGetBusScheduleMutation,
  useLockSeatsForBookingMutation,
  useConfirmBookingPaymentMutation,
  useCancelBookingMutation,
  useGetSeatMapQuery,
  useGetBusAvailableSeatsQuery,
  useGetBookingDetailsQuery,
  useGetBookingHistoryMutation,
  useGetBookingStatsQuery,
} = busApiSlice;
