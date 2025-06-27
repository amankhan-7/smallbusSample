"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, IndianRupee } from "lucide-react";

const getStatusClass = (status) => {
  switch (status) {
    case "confirmed": return "bg-[#28a745]";
    case "pending":   return "bg-[#ffc107]";
    case "cancelled": return "bg-[#dc3545]";
    default:          return "bg-muted";
  }
};

const formatStatusText = (status) =>
  status === "confirmed" ? "Completed"
    : status === "pending"   ? "Upcoming"
    :                        "Cancelled";

export function BookingCard({ booking }) {
  return (
    <Card className="bg-white p-0 rounded-sm overflow-hidden mb-[15px] shadow-sm">
      <div className="flex justify-between items-center text-white px-[15px] py-[10px] bg-primary">
        <div>{new Date(booking.bookingDate).toLocaleDateString()}</div>
        <div className={`px-[8px] py-[2px] rounded-full text-[0.8rem] font-semibold ${getStatusClass(booking.status)}`}>
          {formatStatusText(booking.status)}
        </div>
      </div>
      <div className="p-[15px]">
        <div className="flex items-center mb-[15px]">
          <div className="flex-1">
            <div className="font-medium text-[1.1rem]">{booking.from}</div>
            <div className="text-[0.9rem] text-[var(--text-secondary)]">{booking.departureTime}</div>
          </div>
          <div className="mx-[15px] text-[var(--text-secondary)]">
            <ArrowRight className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-[1.1rem]">{booking.to}</div>
            <div className="text-[0.9rem] text-[var(--text-secondary)]">{booking.arrivalTime}</div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/2 mb-[10px]">
            <div className="text-[0.8rem] text-[var(--text-secondary)]">Booking ID</div>
            <div className="font-medium">{booking.id}</div>
          </div>
          <div className="w-1/2 mb-[10px]">
            <div className="text-[0.8rem] text-[var(--text-secondary)]">Seats</div>
            <div className="font-medium">{booking.seats.join(", ")}</div>
          </div>
          <div className="w-1/2 mb-[10px]">
            <div className="text-[0.8rem] text-[var(--text-secondary)]">Bus Type</div>
            <div className="font-medium">--</div>
          </div>
          <div className="w-1/2 mb-[10px]">
            <div className="text-[0.8rem] text-[var(--text-secondary)]">Amount</div>
            <div className="font-medium flex items-center">
              <IndianRupee className="w-3 h-3 mr-1" />
              {booking.totalAmount}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
