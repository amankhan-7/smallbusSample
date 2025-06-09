"use client";
import OTPPage from "@/components/authentication/otp-page";
import LoginPage from "@/components/authentication/phone-page";
import { setUserInfo } from "@/utils/redux/features/auth/authSlice";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
  const [step, setStep] = useState(1);
  const [phoneData, setPhoneData] = useState(null);
  const dispatch = useDispatch();

  const handleResendOTP = () => {
    console.log("Resending OTP...");
    console.log("Phone data:", phoneData);
  };

  const handlePhoneSubmit = (data) => {
    setPhoneData(data);
    setStep(2);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      dispatch(setUserInfo(JSON.parse(userInfo)));
      redirect("/home");
    }
  }, [dispatch]);

  const handleOTPSubmit = ({ otp }) => {
    dispatch(setUserInfo({ ...phoneData, otp }));
    redirect("/home");
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <>
      {step === 1 && <LoginPage onSubmit={handlePhoneSubmit} />}
      {step === 2 && (
        <OTPPage
          onSubmit={handleOTPSubmit}
          onBack={handleBack}
          onResend={handleResendOTP}
        />
      )}
    </>
  );
}
