import { safeLocalStorage } from "@/lib/localStorage";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async (data) => {
        try {
          const { phone, otp } = data;
          if (otp === "1234") {
            const userData = {
              id: 1,
              fullname: "",
              phone,
              email: "",
              profilePicture: null,
            };

            safeLocalStorage.setItem("userInfo", userData);
            safeLocalStorage.setItem("isLoggedIn", "true");

            return { data: userData };
          } else {
            return { error: { status: 400, data: "Invalid OTP" } };
          }
        } catch (error) {
          return { error: { status: 500, data: "Login failed" } };
        }
      },
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      queryFn: async (data) => {
        try {
          const currentUser = safeLocalStorage.getItem("userInfo", {});
          const updatedUser = { ...currentUser, ...data };

          safeLocalStorage.setItem("userInfo", updatedUser);

          return { data: updatedUser };
        } catch (error) {
          return { error: { status: 500, data: "Update failed" } };
        }
      },
      invalidatesTags: ["User"],
    }),
    sendOtp: builder.mutation({
      queryFn: async (data) => {
        try {
          const { phone } = data;
          console.log(`OTP sent to ${phone}: 1234`);

          return { data: { message: "OTP sent successfully", phone } };
        } catch (error) {
          return { error: { status: 500, data: "Failed to send OTP" } };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useUpdateUserMutation, useSendOtpMutation } =
  userApiSlice;
