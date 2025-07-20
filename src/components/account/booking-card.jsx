"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight, IndianRupee, Eye } from "lucide-react";
import { BookingDetailsDialog } from "@/components/account/booking-details-dialog";

const getStatusClass = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-[#28a745]";
    case "pending":
      return "bg-[#ffc107]";
    case "cancelled":
      return "bg-[#dc3545]";
    case "expired":
      return "bg-[#6c757d]";
    default:
      return "bg-muted";
  }
};

const formatStatusText = (status) =>
  status === "confirmed"
    ? "Confirmed"
    : status === "pending"
    ? "Pending"
    : status === "cancelled"
    ? "Cancelled"
    : status === "expired"
    ? "Expired"
    : "Unknown";

export function BookingCard({ booking }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(true);
  };

  return (
    <>
      <Card
        className="bg-white p-0 rounded-sm overflow-hidden mb-[15px] shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        onClick={handleCardClick}
      >
        <div className="flex justify-between items-center text-white px-[15px] py-[10px] bg-primary">
          <div>{new Date(booking.journeyDate).toLocaleDateString()}</div>
          <div className="flex items-center space-x-2">
            <div
              className={`px-[8px] py-[2px] rounded-full text-[0.8rem] font-semibold ${getStatusClass(
                booking.status
              )}`}
            >
              {formatStatusText(booking.status)}
            </div>
            <Eye className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="p-[15px]">
          <div className="flex w-full justify-between items-center mb-[15px]">
            <div className="flex-1">
              <div className="font-medium text-[1.1rem]">
                {booking.fromCity}
              </div>
              <div className="text-[0.9rem] text-[var(--text-secondary)]">
                {booking.busId.departureTime || "--"}
              </div>
            </div>
            <div className="flex mr-5 items-center">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-[1.1rem]">{booking.toCity}</div>
              <div className="text-[0.9rem] text-[var(--text-secondary)]">
                {booking.busId.arrivalTime || "--"}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-1/2 mb-[10px]">
              <div className="text-[0.8rem] text-[var(--text-secondary)]">
                Booking ID
              </div>
              <div className="font-medium text-xs">
                {booking.bookingReference}
              </div>
            </div>
            <div className="w-1/2 mb-[10px]">
              <div className="text-[0.8rem] text-[var(--text-secondary)]">
                Seat
              </div>
              <div className="font-medium">{booking.seatNumber}</div>
            </div>
            <div className="w-1/2 mb-[10px]">
              <div className="text-[0.8rem] text-[var(--text-secondary)]">
                Bus Type
              </div>
              <div className="font-medium">
                {booking.busId?.busName || "--"}
              </div>
            </div>
            <div className="w-1/2 mb-[10px]">
              <div className="text-[0.8rem] text-[var(--text-secondary)]">
                Amount
              </div>
              <div className="font-medium flex items-center">
                <IndianRupee className="w-3 h-3 mr-1" />
                {booking.amount}
              </div>
            </div>
            <div className="w-1/2 mb-[10px]">
              <div className="text-[0.8rem] text-[var(--text-secondary)]">
                Passenger
              </div>
              <div className="font-medium">{booking.passengerName}</div>
            </div>
            <div className="w-1/2 mb-[10px]">
              <div className="text-[0.8rem] text-[var(--text-secondary)]">
                Payment Status
              </div>
              <div className="font-medium capitalize">
                {booking.paymentStatus}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <BookingDetailsDialog
        booking={booking}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
}
