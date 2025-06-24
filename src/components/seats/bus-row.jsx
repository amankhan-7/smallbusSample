"use client";
import { memo } from "react";
import Seat from "@/components/seats/seat";

const BusRow = memo(
  ({
    rowSeats,
    onSeatClick,
    bookedSeats = [],
    selectedSeats = [],
    layout = "4-column",
  }) => {
    if (layout === "3-column" && rowSeats.length === 3) {
      return (
        <>
          <div className="flex gap-2">
            <Seat
              seatItem={rowSeats[0]}
              onSeatClick={onSeatClick}
              bookedSeats={bookedSeats}
              selectedSeats={selectedSeats}
            />
          </div>
          <div className="flex gap-2">
            <Seat
              seatItem={rowSeats[1]}
              onSeatClick={onSeatClick}
              bookedSeats={bookedSeats}
              selectedSeats={selectedSeats}
            />
            <Seat
              seatItem={rowSeats[2]}
              onSeatClick={onSeatClick}
              bookedSeats={bookedSeats}
              selectedSeats={selectedSeats}
            />
          </div>
        </>
      );
    }

    // Default 2+2 layout
    return (
      <>
        <div className="flex gap-2">
          <Seat
            seatItem={rowSeats[0]}
            onSeatClick={onSeatClick}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
          />
          <Seat
            seatItem={rowSeats[1]}
            onSeatClick={onSeatClick}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
          />
        </div>
        <div className="flex gap-2">
          <Seat
            seatItem={rowSeats[2]}
            onSeatClick={onSeatClick}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
          />
          <Seat
            seatItem={rowSeats[3]}
            onSeatClick={onSeatClick}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
          />
        </div>
      </>
    );
  }
);

export default BusRow;
