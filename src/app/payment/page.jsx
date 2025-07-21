"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useDecryptedParam } from "@/hooks/useEncryptedSearchParams";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passengerSchema } from "@/utils/validations/form-validation";
import {
  useGetBusDetailsQuery,
  useLockSeatsForBookingMutation,
  useConfirmBookingPaymentMutation,
} from "@/utils/redux/api/bus";
import { useAuth } from "@/hooks/useAuth";
import AuthGuard from "@/components/wrapper/AuthGuard";
import { formDefaults } from "@/constants/payment";
import { usePaymentHandlers } from "@/hooks/usePaymentHandlers";
import { useBookingData } from "@/hooks/useBookingData";
import PaymentForm from "@/components/payment/PaymentForm";
import LoadingSpinner from "@/components/payment/LoadingSpinner";
import PaymentHeader from "@/components/payment/PaymentHeader";
import PaymentScripts from "@/components/payment/PaymentScripts";
import { useRouter } from "next/navigation";
import { selectSelectedSeats } from "@/utils/redux/slices/busSlice";
import { useSelector } from "react-redux";
import { useSEO } from "@/hooks/useSEO";
import { SEO_CONFIG } from "@/config/seo";


function PaymentContent() {
  const { value: busId, isLoading: isDecryptingBusId } =
    useDecryptedParam("busId");
  const currentUser = useAuth().user;
  const router = useRouter();

  useSEO({
    title: SEO_CONFIG.pages.payment.title,
    url: `${SEO_CONFIG.siteUrl}/payment`,
    description: SEO_CONFIG.pages.payment.description,
    robots: SEO_CONFIG.pages.payment.robots,
    openGraph: {
      title: SEO_CONFIG.pages.payment.title,
      description: SEO_CONFIG.pages.payment.description,
      url: `${SEO_CONFIG.siteUrl}/payment`,
    },
  });

  const selectedSeats = useSelector(selectSelectedSeats);

  const { data, isLoading } = useGetBusDetailsQuery(
    { busId },
    { skip: !busId || isDecryptingBusId }
  );
  const [lockSeats] = useLockSeatsForBookingMutation();
  const [confirmPayment] = useConfirmBookingPaymentMutation();

  const [processing, setProcessing] = useState(false);

  const booking = useBookingData(data, isLoading);
  const { processPayment } = usePaymentHandlers(
    lockSeats,
    confirmPayment,
    setProcessing,
    currentUser
  );

  useEffect(() => {
    if (selectedSeats.length === 0 && !isLoading) {
      console.log(booking, isLoading);
      router.push("/");
    }
  }, [selectedSeats.length, isLoading, router]);

  const form = useForm({
    resolver: zodResolver(passengerSchema),
    defaultValues: formDefaults(currentUser),
  });

  const handleSubmit = async (formData) => {
    await processPayment(formData, booking, busId);
  };

  const onSubmit = form.handleSubmit(handleSubmit);

  return (
    <AuthGuard redirectTo="/login" requireAuth>
      <div className="flex items-center justify-center min-h-screen">
        <PaymentScripts />
        <PaymentHeader />

        <main className="max-w-[720px] mx-auto pt-[90px] pb-[50px] px-4">
          {isLoading || isDecryptingBusId ? (
            <LoadingSpinner />
          ) : (
            <PaymentForm
              booking={booking}
              form={form}
              onSubmit={onSubmit}
              processing={processing}
              isLoading={isLoading}
            />
          )}
        </main>
      </div>
    </AuthGuard>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading payment...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
