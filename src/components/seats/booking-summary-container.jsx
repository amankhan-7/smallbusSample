"use client";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  useGetBusDataQuery,
} from "@/utils/redux/api/bus";
import BookingSummary from "./booking-summary";

export default function BookingSummaryContainer() {
  const { selectedSeats, selectedBusId } = useSelector(
    (state) => state.booking
  );
  const {
    data: bookingData,
    isLoading,
    isFetching,
  } = useGetBusDataQuery(selectedBusId);
  const router = useRouter();

  const handleProceed = async () => {
    try {
      console.log("Proceeding to payment with selected seats:", selectedSeats);
      router.push("/payment");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <Card className="gap-0">
      <BookingSummary
        selectedSeats={selectedSeats}
        seatPrice={bookingData?.seatPrice || 0}
        onProceed={handleProceed}
        isLoading={isLoading}
      />
    </Card>
  );
}
