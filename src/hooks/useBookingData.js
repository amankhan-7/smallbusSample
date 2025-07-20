import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSelectedSeats } from "@/utils/redux/slices/busSlice";
import { BOOKING_INITIAL_STATE } from "@/constants/payment";
import { useRouter } from "next/navigation";

export const useBookingData = (data, isLoading) => {
  const selectedSeats = useSelector(selectSelectedSeats);
  const router = useRouter();

  const [booking, setBooking] = useState(BOOKING_INITIAL_STATE);

  useEffect(() => {
    if (!isLoading && data?.bus) {
      const seats = selectedSeats || [];
      if(seats.length === 0) {
        console.warn("No seats selected for booking.");
        router.push("/account?tab=bookingHistory");
        return;
      }
      const busData = data.bus;
      setBooking({
        id: busData.id,
        bus: busData.busName,
        from: busData.routeFrom,
        to: busData.routeTo,
        date: busData.date,
        timeofdeparture: busData.departureTime,
        timeofarrival: busData.arrivalTime,
        seatid: seats.length > 0 ? seats : [],
        price: busData.seatPrice || busData.price,
      });
    }
  }, [isLoading, data, selectedSeats, router]);

  return booking;
};
