"use client";
import OTPPage from "@/components/authentication/otp-page";
import LoginPage from "@/components/authentication/phone-page";
import { setUserInfo } from "@/utils/redux/features/user/userSlice";
import { useSendOtpMutation, useLoginMutation } from "@/utils/redux/api/user";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Login() {
  const [step, setStep] = useState(1);
  const [phoneData, setPhoneData] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { userInfo, isLoggedIn } = useSelector((state) => state.user);

  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const handleResendOTP = async () => {
    try {
      await sendOtp({ phone: phoneData.phone }).unwrap();
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    }
  };

  const handlePhoneSubmit = async (data) => {
    try {
      await sendOtp({ phone: data.phone }).unwrap();
      setPhoneData(data);
      setStep(2);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };
  useEffect(() => {
    console.log("userInfo:", userInfo);
    console.log("isLoggedIn:", isLoggedIn);
    if (userInfo && isLoggedIn === true) {
      router.push("/");
    }
  }, [router, userInfo, isLoggedIn]);

  const handleOTPSubmit = async ({ otp }) => {
    try {
      console.log("OTP submitted:", otp);
      const result = await login({
        phone: phoneData.phone,
        otp,
      }).unwrap();

      dispatch(setUserInfo(result));
      router.push("/");
    } catch (error) {
      console.log("Login failed:", error);
      console.error("Login failed:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleBack = () => {
    setStep(1);
  };
  return (
    <>
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
    </>
  );
}
