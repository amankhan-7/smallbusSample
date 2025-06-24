"use client";
import React, { memo } from "react";
import Seat from "@/components/seats/seat";

const DriverSeat = memo(() => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[36px] h-[36px] font-[0.8rem] sm:w-[44px] sm:h-[44px] bg-[#f5f5f5] rounded-[0.5rem] border-2 border-[#999] position-relative flex items-center justify-center">
        <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-[#999] rounded-full"></div>
      </div>
      <div className="text-[0.75rem] text-[#999] mt-[5px]">Driver</div>
    </div>
  );
});

const BusFrontRow = memo(
  ({
    onSeatClick,
    bookedSeats = [],
    selectedSeats = [],
    frontSeatId = "F",
  }) => {
    const frontRowSeats = [{ id: frontSeatId, type: "seat" }];

    return (
      <div className="flex justify-between items-center p-2.5">
        <Seat
          seatItem={frontRowSeats[0]}
          onSeatClick={onSeatClick}
          bookedSeats={bookedSeats}
          selectedSeats={selectedSeats}
        />
        <DriverSeat />
      </div>
    );
  }
);

export default BusFrontRow;
