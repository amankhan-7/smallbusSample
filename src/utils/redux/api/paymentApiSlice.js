// src/redux/services/paymentApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApiSlice = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://smallbusserver.devtab.xyz/api/v1/consumer",
  }),
  tagTypes: ["Payment"],

  endpoints: (builder) => ({
    //Lock seats and get Razorpay payment order
    lockSeatsForBooking: builder.mutation({
      query: ({ busId, seatNumbers, userId, passengerDetails = {} }) => ({
        url: "/lock-seats",
        method: "POST",
        body: { busId, seatNumbers, userId, passengerDetails },
      }),
      transformResponse: (res) => res?.data ?? null,
      invalidatesTags: ["Payment"],
    }),

    //Confirm Razorpay payment after successful checkout
    confirmBookingPayment: builder.mutation({
      query: ({ bookingId, paymentId, orderId, signature, paymentMethod = "upi" }) => ({
        url: "/confirm-booking",
        method: "POST",
        body: { bookingId, paymentId, orderId, signature, paymentMethod },
      }),
      transformResponse: (res) => res?.data ?? null,
      invalidatesTags: ["Payment"],
    }),

    //Get payment methods from Razorpay (POST even though it's read-only)
    getPaymentMethods: builder.query({
      query: () => ({
        url: "/get-payment-methods",
        method: "POST",
      }),
      transformResponse: (res) => res?.data ?? null,
    }),

    //Fetch Razorpay payment details
    getPaymentDetails: builder.mutation({
      query: ({ paymentId }) => ({
        url: "/get-payment-details",
        method: "POST",
        body: { paymentId },
      }),
      transformResponse: (res) => res?.data ?? null,
    }),

    //Fetch refund details by refundId
    getRefundDetails: builder.mutation({
      query: ({ refundId }) => ({
        url: "/get-refund-details",
        method: "POST",
        body: { refundId },
      }),
      transformResponse: (res) => res?.data ?? null,
    }),

    //Razorpay health check
    getRazorpayHealth: builder.query({
      query: () => ({
        url: "/razorpay-health",
        method: "POST",
      }),
      transformResponse: (res) => res?.data ?? null,
    }),
  }),
});

export const {
  useLockSeatsForBookingMutation,
  useConfirmBookingPaymentMutation,
  useGetPaymentMethodsQuery,
  useGetPaymentDetailsMutation,
  useGetRefundDetailsMutation,
  useGetRazorpayHealthQuery,
} = paymentApiSlice;
