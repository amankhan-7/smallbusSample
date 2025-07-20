"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passengerSchema } from "@/utils/validations/form-validation";
import {
  useGetBusDetailsQuery,
  useLockSeatsForBookingMutation,
  useConfirmBookingPaymentMutation,
} from "@/utils/redux/api/bus";
import { useAuth } from "@/hooks/useAuth";
import AuthGuard from "@/components/auth/AuthGuard";
import { FORM_DEFAULTS } from "@/constants/payment";
import { usePaymentHandlers } from "@/hooks/usePaymentHandlers";
import { useBookingData } from "@/hooks/useBookingData";
import PaymentForm from "@/components/payment/PaymentForm";
import LoadingSpinner from "@/components/payment/LoadingSpinner";
import PaymentHeader from "@/components/payment/PaymentHeader";
import PaymentScripts from "@/components/payment/PaymentScripts";
export default function PaymentPage() {
  const searchParams = useSearchParams();
  const busId = searchParams.get("busId");
  const currentUser = useAuth().user;

  const { data, isLoading } = useGetBusDetailsQuery(
    { busId },
    { skip: !busId }
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

  const form = useForm({
    resolver: zodResolver(passengerSchema),
    defaultValues: FORM_DEFAULTS,
  });

  const handleSubmit = async (formData) => {
    await processPayment(formData, booking, busId);
  };

  const onSubmit = form.handleSubmit(handleSubmit);

  return (
    <AuthGuard redirectTo="/login" requireAuth>
      <div className="bg-gray-100 min-h-screen">
        <PaymentScripts />
        <PaymentHeader />

        <main className="max-w-[720px] mx-auto pt-[90px] pb-[50px] px-4">
          {isLoading ? (
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
