import { apiSlice } from "./apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Payment"],

  endpoints: (builder) => ({
    getPaymentMethods: builder.query({
      query: () => ({
        url: "/get-payment-methods",
        method: "POST",
        body: {
          userType: "consumer",
        },
      }),
      transformResponse: (res) => res?.data ?? null,
    }),

    getPaymentDetails: builder.mutation({
      query: ({ paymentId }) => ({
        url: "/get-payment-details",
        method: "POST",
        body: { paymentId, userType: "consumer" },
      }),
      transformResponse: (res) => res?.data ?? null,
    }),

    getRefundDetails: builder.mutation({
      query: ({ refundId }) => ({
        url: "/get-refund-details",
        method: "POST",
        body: { refundId, userType: "consumer" },
      }),
      transformResponse: (res) => res?.data ?? null,
    }),

    getRazorpayHealth: builder.query({
      query: () => ({
        url: "/razorpay-health",
        method: "POST",
        body: {
          userType: "consumer",
        },
      }),
      transformResponse: (res) => res?.data ?? null,
    }),
  }),
});

export const {
  useGetPaymentMethodsQuery,
  useGetPaymentDetailsMutation,
  useGetRefundDetailsMutation,
  useGetRazorpayHealthQuery,
} = paymentApiSlice;
