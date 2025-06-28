"use client";
import { memo, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { generateSeatLayout } from "@/utils/seat-utils";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectSeat,
  selectSeat,
} from "@/utils/redux/features/booking/bookingSlice";
import { useGetBusDataQuery } from "@/utils/redux/api/bus";
import { Separator } from "@/components/ui/separator";
import BusRow from "@/components/seats/bus-row";
import BusFrontRow from "@/components/seats/bus-front-row";
import BusLastRow from "@/components/seats/bus-last-row";

const BusLayout = memo(({
  selectedBusId,
  selectedSeats = [],
  onSeatClick,
  className = "",
}) => {
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

  if (isLoading) {
    return (
      <Card
        className={`mx-auto shadow-[0_2px_15px_rgba(0,0,0,0.05)] p-4 md:p-[1.5625rem] mb-[1.875rem] w-full rounded-xl ${className}`}
      >
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
      <Card
        className={`mx-auto shadow-[0_2px_15px_rgba(0,0,0,0.05)] p-4 md:p-[1.5625rem] mb-[1.875rem] w-full rounded-xl ${className}`}
      >
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
    <Card
      className={`mx-auto shadow-[0_2px_15px_rgba(0,0,0,0.05)] p-4 md:p-[1.5625rem] mb-[1.875rem] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-200 w-full rounded-xl will-change-transform ${className}`}
    >
      <CardContent className="space-y-2 p-0">
        <BusFrontRow
          bookedSeats={busData.bookedSeats}
          selectedSeats={selectedSeats}
          onSeatClick={onSeatClick}
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
              onSeatClick={onSeatClick}
              layout={busData.busLayout}
            />
          </div>
        ))}
        <div className="w-full h-px my-[1.875rem] bg-gray-200 mx-4"></div>
        <BusLastRow
          bookedSeats={busData.bookedSeats}
          selectedSeats={selectedSeats}
          onSeatClick={onSeatClick}
        />
      </CardContent>
    </Card>
  );
});

export default function BusLayoutContainer() {
  const { selectedSeats, selectedBusId } = useSelector(
    (state) => state.booking
  );
  const dispatch = useDispatch();

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      dispatch(deselectSeat(seatId));
    } else {
      dispatch(selectSeat(seatId));
    }
  };

  return (
    <BusLayout
      selectedBusId={selectedBusId}
      selectedSeats={selectedSeats}
      onSeatClick={handleSeatClick}
    />
  );
}
