"use client";

import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, CalendarX } from "lucide-react";

export default function BookingHistory() {
  const bookingHistory = useSelector((state) => state.user.bookingHistory);

  if (!bookingHistory || bookingHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <CalendarX className="text-[3rem] text-[#ddd] mb-[15px] mx-auto" />
        <h3 className="text-xl font-medium mb-[8px]">No Booking History</h3>
        <p className="mb-[15px]">You haven't made any bookings yet.</p>
        <Button asChild>
          <a
            href="/"
            className="px-[20px] py-[10px] bg-primary text-white rounded-none min-h-fit transition-colors hover:bg-[var(--secondary-color)]"
          >
            Book Now
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {bookingHistory.map((b) => (
        <div
          key={b.id}
          className="border border-[--border-color] mb-[15px] transition-transform hover:-translate-y-[2px] hover:shadow-[0_3px_8px_rgba(0,0,0,0.05)]"
        >
          <div className="p-[15px] bg-[--hover-bg] flex justify-between items-center">
            <div className="font-[500] text-[--text-color]">
              {new Date(b.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div
              className={`px-[10px] py-[4px] text-[0.8rem] font-[500] uppercase text-white ${
                b.status === "completed"
                  ? "bg-[#28a745]"
                  : b.status === "upcoming"
                  ? "bg-primary"
                  : "bg-[#dc3545]"
              }`}
            >
              {b.status}
            </div>
          </div>

          <div className="p-[15px] border-t border-[--border-color]">
            <div className="flex items-center mb-[15px] max-md:flex-col max-md:gap-[10px]">
              <div className="flex-1 text-center">
                <div className="font-[500] text-[--text-color] mb-[3px]">
                  {b.from.city}
                </div>
                <div className="text-[0.85rem] text-[#666]">{b.from.time}</div>
              </div>

              <div className="text-[#999] text-[1.2rem] px-[15px] max-md:rotate-[90deg] max-md:px-0 max-md:py-[10px]">
                <ArrowRight />
              </div>

              <div className="flex-1 text-center">
                <div className="font-[500] text-[--text-color] mb-[3px]">
                  {b.to.city}
                </div>
                <div className="text-[0.85rem] text-[#666]">{b.to.time}</div>
              </div>
            </div>

            <div className="flex justify-between border-t border-[--border-color] pt-[15px] max-md:flex-wrap">
              {[
                { label: "Booking ID", value: b.id },
                { label: "Seats", value: b.seats.join(", ") },
                { label: "Bus Type", value: b.busType },
                { label: "Amount", value: `₹${b.amount}` },
              ].map((info) => (
                <div
                  key={info.label}
                  className="flex-1 text-center max-md:flex-[0_0_50%] max-md:mb-[10px]"
                >
                  <div className="text-[0.8rem] text-[#666] mb-[3px]">
                    {info.label}
                  </div>
                  <div className="font-[500] text-[--text-color]">
                    {info.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
