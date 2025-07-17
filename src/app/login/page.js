"use client";
import OTPPage from "@/components/authentication/otp-page";
import LoginPage from "@/components/authentication/phone-page";
import RegisterPage from "@/components/authentication/register-page";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import {
  useInitiateLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
} from "@/utils/redux/api/user";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/utils/redux/slices/authSlice";

function LoginComponent() {
  const [step, setStep] = useState(1);
  const [phoneData, setPhoneData] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const [initiateLogin, { isLoading: isSendingOtp }] =
    useInitiateLoginMutation();
  const [verifyOtp, { isLoading: isLoggingIn }] = useVerifyOtpMutation();
  const [register] = useRegisterMutation();

  const handleResendOTP = async () => {
    try {
      const result = await initiateLogin({
        phoneNumber: phoneData.phone,
      }).unwrap();

      if (result.success) {
        console.log("OTP resent successfully");
      } else {
        alert(result.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Failed to resend OTP:", error);

      if (error?.data?.message) {
        alert(error.data.message);
      } else if (error?.message) {
        alert(error.message);
      } else {
        alert("Failed to resend OTP. Please try again.");
      }
    }
  };

  const handlePhoneSubmit = async (data) => {
    try {
      const result = await initiateLogin({ phoneNumber: data.phone }).unwrap();

      if (result.success) {
        setPhoneData(data);
        setStep(2);
      } else {
        alert(result.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.warn("Failed to send OTP:", error);
      if (error.status === 404 || error.data.message?.includes("not found")) {
        setPhoneData(data);
        setStep(3);
      }
    }
  };

  const handleOTPSubmit = async ({ otp }) => {
    try {
      console.log("OTP submitted:", otp);
      const result = await verifyOtp({
        phoneNumber: phoneData.phone,
        otp,
        purpose: "login",
      }).unwrap();
      console.log("OTP verification result:", result);

      if (result.success) {
        dispatch(setCredentials({ user: result.user }));
        router.push("/");
      } else {
        alert(result.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);

      if (error?.data?.message) {
        alert(error.data.message);
      } else if (error?.message) {
        alert(error.message);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    }
  };

  const handleRegisterSubmit = async (data) => {
    console.log("Registering with data:", data);
    try {
      const result = await register({
        phoneNumber: phoneData.phone,
        firstName: data.firstName,
        lastName: data.lastName,
      }).unwrap();

      console.log("Registration result:", result);

      setPhoneData({
        phoneNumber: phoneData.phone,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      setStep(1);
    } catch (error) {
      console.error("Registration failed:", error);

      if (error?.data?.message) {
        alert(error.data.message);
      } else if (error?.message) {
        alert(error.message);
      } else {
        alert("Failed to register. Please try again.");
      }
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <main className="flex md:items-center justify-center h-fit md:min-h-screen pt-[6.25rem] md:p-0 px-5">
      {step === 1 && (
        <LoginPage onSubmit={handlePhoneSubmit} isLoading={isSendingOtp} />
      )}
      {step === 2 && (
        <OTPPage
          onSubmit={handleOTPSubmit}
          onBack={handleBack}
          onResend={handleResendOTP}
          isLoading={isLoggingIn}
          isResending={isSendingOtp}
        />
      )}
      {step === 3 && (
        <RegisterPage onBack={handleBack} onSubmit={handleRegisterSubmit} />
      )}
    </main>
  );
}

export default function Login() {
  return (
    <AuthGuard requireAuth={false}>
      <LoginComponent />
    </AuthGuard>
  );
}
