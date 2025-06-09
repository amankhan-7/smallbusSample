"use client";
import React, { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import {
  generateSeatLayout,
  getSeatStatus,
} from "@/utils/seat-utils";
import { SEAT_STATUS } from "@/constants/seat-selection";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectSeat,
  selectSeat,
} from "@/utils/redux/features/booking/bookingSlice";
import { Separator } from "../ui/separator";

const SeatItem = memo(function SeatItem({
  seatItem,
  onSeatClick,
  bookedSeats,
  selectedSeats,
}) {
  const status = bookedSeats.includes(seatItem.id)
    ? SEAT_STATUS.BOOKED
    : selectedSeats.includes(seatItem.id)
    ? SEAT_STATUS.SELECTED
    : SEAT_STATUS.AVAILABLE;

  const className = [
    "w-[45px] h-[45px] text-[0.9rem] border-2 border-[#ddd] rounded-lg flex items-center justify-center text-[#555] bg-white cursor-pointer transition-all duration-200 ease-in-out shadow-sm relative overflow-hidden sm:w-[40px] sm:h-[40px] sm:text-[0.85rem] md:w-[35px] md:h-[35px] md:text-[0.8rem] md:border md:border-[1px] max-[480px]:w-[36px] max-[480px]:h-[36px] max-[480px]:text-[0.8rem]",

    "flex items-center justify-center",
    "rounded-[0.5rem] border-2 shadow-lg",
    "transition-all duration-300",
    "cursor-pointer",

    "hover:-translate-y-0.5 hover:shadow-lg hover:text-white",

    status === SEAT_STATUS.BOOKED &&
      "bg-gray-400 text-white border-gray-500 cursor-not-allowed opacity-75 hover:translate-y-0 hover:shadow-none",

    status === SEAT_STATUS.SELECTED &&
      "bg-primary border-primary text-white hover:bg-primary hover:text-white animate-selectedPulse",

    status === SEAT_STATUS.AVAILABLE &&
      "bg-white text-[#555] border hover:scale-105 active:scale-95",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Button
      className={className}
      onClick={() => onSeatClick(seatItem.id)}
      disabled={status === SEAT_STATUS.BOOKED || seatItem.type !== "seat"}
    >
      {status === SEAT_STATUS.BOOKED ? <X className="h-3 w-3" /> : seatItem.id}
    </Button>
  );
});


const BusRow = memo(function BusRow({
  rowSeats,
  onSeatClick,
  bookedSeats,
  selectedSeats,
}) {
  if (rowSeats.length === 3) {
    return (
      <>
        <div className="flex gap-1">
          <SeatItem
            seatItem={rowSeats[0]}
            onSeatClick={onSeatClick}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
          />
        </div>
        <div className="flex gap-1">
          <SeatItem
            seatItem={rowSeats[1]}
            onSeatClick={onSeatClick}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
          />
          <SeatItem
            seatItem={rowSeats[2]}
            onSeatClick={onSeatClick}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex gap-1">
        <SeatItem
          seatItem={rowSeats[0]}
          onSeatClick={onSeatClick}
          bookedSeats={bookedSeats}
          selectedSeats={selectedSeats}
        />
        <SeatItem
          seatItem={rowSeats[1]}
          onSeatClick={onSeatClick}
          bookedSeats={bookedSeats}
          selectedSeats={selectedSeats}
        />
      </div>
      <div className="flex gap-1">
        <SeatItem
          seatItem={rowSeats[2]}
          onSeatClick={onSeatClick}
          bookedSeats={bookedSeats}
          selectedSeats={selectedSeats}
        />
        <SeatItem
          seatItem={rowSeats[3]}
          onSeatClick={onSeatClick}
          bookedSeats={bookedSeats}
          selectedSeats={selectedSeats}
        />
      </div>
    </>
  );
});

const LastRow = memo(function LastRow({
  onSeatClick,
  bookedSeats,
  selectedSeats,
}) {
  const lastRowSeats = [
    { id: "L1", type: "seat" },
    { id: "L2", type: "seat" },
    { id: "L3", type: "seat" },
    { id: "L4", type: "seat" },
  ];

  return (
    <div className="flex justify-between items-center">
      {lastRowSeats.map((seat) => (
        <SeatItem
          key={seat.id}
          seatItem={seat}
          onSeatClick={onSeatClick}
          bookedSeats={bookedSeats}
          selectedSeats={selectedSeats}
        />
      ))}
    </div>
  );
});

const FrontRow = memo(function FrontRow({
  onSeatClick,
  bookedSeats,
  selectedSeats,
}) {
  const frontRowSeats = [
    { id: "F", type: "seat" },
    { id: "D", type: "driver" },
  ];

  return (
    <div className="flex justify-between items-center p-2.5">
      {frontRowSeats.map((seat) => (
        <SeatItem
          key={seat.id}
          seatItem={seat}
          onSeatClick={onSeatClick}
          bookedSeats={bookedSeats}
          selectedSeats={selectedSeats}
        />
      ))}
    </div>
  );
});

export default function BusLayout() {
  const { bookingData, selectedSeats } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const seatLayout = useMemo(() => {
    try {
      return generateSeatLayout({
        busType: bookingData.busType,
        rows: bookingData.rows,
      });
    } catch (error) {
      console.error("Error generating seat layout:", error);
      return [];
    }
  }, [bookingData.busType, bookingData.rows]);

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      dispatch(deselectSeat(seatId));
    } else {
      dispatch(selectSeat(seatId));
    }
  };

  return (
    <Card className="mx-auto p-4 mb-[1.875rem] w-full rounded-xl will-change-transform">
      <CardContent className="space-y-2 p-0">
        <FrontRow
          bookedSeats={bookingData.bookedSeats}
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
        />
        <Separator className="mb-[1.875rem]" />
        {seatLayout.map((rowSeats, rowIndex) => (
          <div key={rowIndex} className="flex justify-between gap-2.5 pt-2.5 items-center">
            <BusRow
              rowSeats={rowSeats}
              bookedSeats={bookingData.bookedSeats}
              selectedSeats={selectedSeats}
              onSeatClick={handleSeatClick}
            />
          </div>
        ))}
        <div className="w-full h-px my-[1.875rem] bg-gray-200 mx-4"></div>
        <LastRow
          bookedSeats={bookingData.bookedSeats}
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
        />
      </CardContent>
    </Card>
  );
}
