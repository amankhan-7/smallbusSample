"use client";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  useBookSeatsMutation,
  useGetBusDataQuery,
} from "@/utils/redux/api/bus";
import { resetBooking } from "@/utils/redux/features/booking/bookingSlice";
import { addBooking } from "@/utils/redux/features/user/userSlice";
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
  const dispatch = useDispatch();
  const router = useRouter();
  const [bookSeats, { isLoading: isBooking }] = useBookSeatsMutation();

  const handleProceed = async () => {
    try {
      console.log("Proceeding to payment with selected seats:", selectedSeats);

      const result = await bookSeats({
        id: selectedBusId,
        seats: selectedSeats,
      }).unwrap();

      dispatch(addBooking(result.booking));
      dispatch(resetBooking());
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
        isBooking={isBooking}
      />
    </Card>
  );
}
