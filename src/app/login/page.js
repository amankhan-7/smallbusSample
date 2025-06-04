"use client";

import OTPPage from "@/components/otp-page";
import LoginPage from "@/components/phone-page";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [step, setStep] = useState(1);
  const [phoneData, setPhoneData] = useState(null);

  const handleResendOTP = () => {
    console.log("Resending OTP...");
    console.log("Phone data:", phoneData);
  };

  const handlePhoneSubmit = (data) => {
    setPhoneData(data);
    setStep(2);
  };
  
  const handleOTPSubmit = ({ otp }) => {
    console.log("OTP submitted:", otp);
    console.log("Phone data:", phoneData);
    console.log("OTP:", otp);
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
