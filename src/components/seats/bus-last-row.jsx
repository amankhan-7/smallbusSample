"use client";
import { memo } from "react";
import Seat from "@/components/seats/seat";

const BusLastRow = memo(
  ({
    onSeatClick,
    bookedSeats = [],
    selectedSeats = [],
    lastRowSeats = [
      { id: "L1", type: "seat" },
      { id: "L2", type: "seat" },
      { id: "L3", type: "seat" },
      { id: "L4", type: "seat" },
    ],
  }) => {
    return (
      <div className="flex justify-between items-center">
        {lastRowSeats.map((seat) => (
          <Seat
            key={seat.id}
            seatItem={seat}
            onSeatClick={onSeatClick}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
          />
        ))}
      </div>
    );
  }
);

export default BusLastRow;
