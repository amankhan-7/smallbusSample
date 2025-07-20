"use client";
import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetBusDetailsQuery } from "@/utils/redux/api/bus";
import BookingSummary from "./booking-summary";
import { selectSelectedSeats } from "@/utils/redux/slices/busSlice";

export default function BookingSummaryContainer() {
  const selectedSeats = useSelector(selectSelectedSeats);
  const busId = useSearchParams().get("busId");
  const {
    data: busDetailsResponse,
    isLoading,
    isFetching,
  } = useGetBusDetailsQuery(
    {
      busId,
    },
    {
      skip: !busId,
    }
  );
  const router = useRouter();

  const busData = busDetailsResponse?.bus;

  const handleProceed = async () => {
    try {
      console.log("Proceeding to payment with selected seats:", selectedSeats);
      router.push(`/payment?busId=${busId}`);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
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
