"use client";
import React, { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { generateSeatLayout } from "@/utils/seat-utils";
import { SEAT_STATUS } from "@/constants/seat-selection";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectSeat,
  selectSeat,
} from "@/utils/redux/features/booking/bookingSlice";
import { useGetBusDataQuery } from "@/utils/redux/api/bus";
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
    "border-2 border-[#ddd] rounded-lg flex items-center justify-center text-[#555] bg-white cursor-pointer hover:shadow-lg hover:-translate-y-1.5 transition-all duration-200 ease-in-out overflow-hidden border shadow-[0_1px_3px_rgba(0,0,0,0.05)] gap-0 p-0",

    "w-[36px] h-[36px] text-[0.8rem]",
    "md:w-[40px] md:h-[40px] md:text-[0.85rem]",
    "lg:w-[45px] lg:h-[45px] lg:text-[0.9rem]",
    "flex items-center justify-center",
    "rounded-[0.5rem] border-2",
    "cursor-pointer",

    "hover:-translate-y-0.5 hover:shadow-lg hover:text-white",

    status === SEAT_STATUS.BOOKED &&
      "bg-gray-400 text-white border-gray-500 cursor-not-allowed opacity-75 hover:translate-y-0 hover:shadow-none",

    status === SEAT_STATUS.SELECTED &&
      "bg-primary border-primary text-white hover:bg-primary hover:text-white animate-selectedPulse",

    status === SEAT_STATUS.AVAILABLE &&
      "hover:bg-white hover:border-primary hover:text-[#555] border hover:scale-105 active:scale-95",
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
        <div className="flex gap-2">
          <SeatItem
            seatItem={rowSeats[0]}
            onSeatClick={onSeatClick}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
          />
        </div>
        <div className="flex gap-2">
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
      <div className="flex gap-2">
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
      <div className="flex gap-2">
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
      <SeatItem
        key={frontRowSeats[0].id}
        seatItem={frontRowSeats[0]}
        onSeatClick={onSeatClick}
        bookedSeats={bookedSeats}
        selectedSeats={selectedSeats}
      />
      <div className="flex flex-col items-center">

      <div className="w-[36px] h-[36px] font-[0.8rem]  sm:w-[44px] sm:h-[44px] bg-[#f5f5f5] rounded-[0.5rem] border-2 border-[#999] position-relative flex items-center justify-center">
        <div className="w-5 h-5  md:w-6 md:h-6 border-2 border-[#999] rounded-full"></div>
      </div>
      <div className="text-[0.75rem] text-[#999] mt-[5px]">Driver</div>
      </div>
    </div>
  );
});

export default function BusLayout() {
  const { selectedSeats, selectedBusId } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  const {
    data: busData,
    isLoading,
    error,
  } = useGetBusDataQuery({ id: selectedBusId });

  const seatLayout = useMemo(() => {
    if (!busData) return [];

    try {
      return generateSeatLayout({
        busLayout: busData.busLayout,
        rows: busData.rows,
      });
    } catch (error) {
      console.error("Error generating seat layout:", error);
      return [];
    }
  }, [busData?.busLayout, busData?.rows]);


  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      dispatch(deselectSeat(seatId));
    } else {
      dispatch(selectSeat(seatId));
    }
  };

  if (isLoading) {
    return (
      <Card className="mx-auto shadow-[0_2px_15px_rgba(0,0,0,0.05)] p-4 md:p-[1.5625rem] mb-[1.875rem] w-full rounded-xl">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
            <p>Loading bus layout...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto shadow-[0_2px_15px_rgba(0,0,0,0.05)] p-4 md:p-[1.5625rem] mb-[1.875rem] w-full rounded-xl">
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-red-500">Error loading bus data</p>
        </CardContent>
      </Card>
    );
  }

  if (!busData) {
    return null;
  }

  return (
    <Card className="mx-auto shadow-[0_2px_15px_rgba(0,0,0,0.05)] p-4 md:p-[1.5625rem] mb-[1.875rem] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-200 w-full rounded-xl will-change-transform">
      <CardContent className="space-y-2 p-0">
        <FrontRow
          bookedSeats={busData.bookedSeats}
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
        />
        <Separator className="mb-[2.5rem]" />
        {seatLayout.map((rowSeats, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-between mt-2.5 mb-0 items-center"
          >
            <BusRow
              rowSeats={rowSeats}
              bookedSeats={busData.bookedSeats}
              selectedSeats={selectedSeats}
              onSeatClick={handleSeatClick}
            />
          </div>
        ))}
        <div className="w-full h-px my-[1.875rem] bg-gray-200 mx-4"></div>
        <LastRow
          bookedSeats={busData.bookedSeats}
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
        />
      </CardContent>
    </Card>
  );
}
