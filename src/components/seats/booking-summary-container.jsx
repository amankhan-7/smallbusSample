"use client";
import React, { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetBusDetailsQuery } from "@/utils/redux/api/bus";
import { useDecryptedParam } from "@/hooks/useEncryptedSearchParams";
import { createPaymentUrl } from "@/utils/navigation";
import BookingSummary from "./booking-summary";
import { selectSelectedSeats } from "@/utils/redux/slices/busSlice";

function BookingSummaryContent() {
  const selectedSeats = useSelector(selectSelectedSeats);
  const { value: busId, isLoading: isDecryptingBusId } =
    useDecryptedParam("busId");
  const {
    data: busDetailsResponse,
    isLoading,
    isFetching,
  } = useGetBusDetailsQuery(
    {
      busId,
    },
    {
      skip: !busId || isDecryptingBusId,
    }
  );
  const router = useRouter();

  const busData = busDetailsResponse?.bus;

  const handleProceed = async () => {
    try {
      const encryptedUrl = await createPaymentUrl(busId);
      router.push(encryptedUrl);
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <Card className="gap-0">
      <BookingSummary
        selectedSeats={selectedSeats}
        seatPrice={busData?.price || 0}
        onProceed={handleProceed}
        isLoading={isLoading}
      />
    </Card>
  );
}

export default function BookingSummaryContainer() {
  return (
    <Suspense fallback={<div>Loading booking summary...</div>}>
      <BookingSummaryContent />
    </Suspense>
  );
}
