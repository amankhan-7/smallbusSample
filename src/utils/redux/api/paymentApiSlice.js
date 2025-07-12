// src/redux/services/paymentApiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApiSlice = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://smallbusserver.devtab.xyz/api/v1/consumer" }),
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    // Create Razorpay Order
    createRazorpayOrder: builder.mutation({
      query: ({ amount, receipt, bookingReference }) => {
        const amountInPaise = Math.round(amount * 100);
        return {
          url: "/create-order",
          method: "POST",
          body: { amount: amountInPaise, receipt, bookingReference },
        };
      },
      transformResponse: (res) => res?.data,
      transformErrorResponse: (err) => err?.data || "Order creation failed",
      invalidatesTags: ["Payment"],
    }),

    //Get Payment Methods
    getPaymentMethods: builder.query({
      query: () => "/methods",
      transformResponse: (res) => res?.data,
      providesTags: ["Payment"],
    }),

    //Get Payment Details
    getPaymentDetails: builder.mutation({
      query: ({ paymentId }) => ({
        url: "/payment-details",
        method: "POST",
        body: { paymentId },
      }),
      transformResponse: (res) => res?.data,
    }),

    //Get Refund Details
    getRefundDetails: builder.mutation({
      query: ({ refundId }) => ({
        url: "/refund-details",
        method: "POST",
        body: { refundId },
      }),
      transformResponse: (res) => res?.data,
    }),

    //Razorpay Health Check
    getRazorpayHealth: builder.query({
      query: () => "/health",
      transformResponse: (res) => res?.data,
    }),
  }),
});

export const {
  useCreateRazorpayOrderMutation,
  useGetPaymentMethodsQuery,
  useGetPaymentDetailsMutation,
  useGetRefundDetailsMutation,
  useGetRazorpayHealthQuery,
} = paymentApiSlice;
