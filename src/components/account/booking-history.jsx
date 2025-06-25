"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setBookingHistory } from "@/utils/redux/features/user/userSlice";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarX, IndianRupee } from "lucide-react";
import { safeLocalStorage } from "@/lib/localStorage";
import Link from "next/link";

export default function BookingHistory() {
  const bookingHistory = useSelector((state) => state.user.bookingHistory);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const savedBookings = safeLocalStorage.getItem("bookingHistory") || "[]";
      dispatch(setBookingHistory(savedBookings));
    } catch (error) {
      console.error("Error loading booking history:", error);
      dispatch(setBookingHistory([]));
    }
  }, [dispatch]);

  if (!bookingHistory || bookingHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <CalendarX className="text-[3rem] text-[#ddd] mb-[15px] mx-auto" />
        <h3 className="text-xl font-medium mb-[8px]">No Booking History</h3>
        <p className="mb-[15px]">You haven't made any bookings yet.</p>
        <Button asChild>
          <Link
            href="/seats"
            className="px-[20px] py-[10px] bg-primary text-white rounded-none min-h-fit transition-colors hover:bg-[var(--secondary-color)]"
          >
            Book Now
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {bookingHistory.map((booking) => (
        <Card
          key={booking.id}
          className="mb-[15px] transition-transform hover:-translate-y-[2px] hover:shadow-[0_3px_8px_rgba(0,0,0,0.05)]"
        >
          <CardHeader className="p-[15px] bg-[--hover-bg] flex flex-row justify-between items-center space-y-0">
            <div className="font-[500] text-[--text-color]">
              Booking #{booking.id}
            </div>
            <div
              className={`px-[10px] py-[4px] text-[0.8rem] font-[500] uppercase text-white rounded ${
                booking.status === "confirmed"
                  ? "bg-[#28a745]"
                  : booking.status === "pending"
                  ? "bg-[#ffc107]"
                  : "bg-[#dc3545]"
              }`}
            >
              {booking.status}
            </div>
          </CardHeader>

          <CardContent className="p-[15px]">
            <div className="flex justify-between items-center mb-[10px]">
              <div className="flex items-center gap-2">
                <span className="font-medium">{booking.from}</span>
                <ArrowRight className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{booking.to}</span>
              </div>
              <div className="text-[#666] text-[0.9rem]">
                {new Date(booking.bookingDate).toLocaleDateString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[0.9rem]">
              <div>
                <span className="text-[#666]">Seats: </span>
                <span className="font-medium">{booking.seats.join(", ")}</span>
              </div>
              <div>
                <span className="text-[#666]">Departure: </span>
                <span className="font-medium">{booking.departureTime}</span>
              </div>
              <div>
                <span className="text-[#666]">Date: </span>
                <span className="font-medium">{booking.date}</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#666]">Total: </span>
                <span className="font-medium flex items-center">
                  <IndianRupee className="w-3 h-3" />
                  {booking.totalAmount}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
