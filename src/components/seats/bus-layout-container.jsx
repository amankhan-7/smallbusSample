"use client";
import { memo, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { generateSeatLayout } from "@/utils/seat-utils";
import { useDispatch, useSelector } from "react-redux";
// import { Separator } from "@/components/ui/separator";
import BusRow from "@/components/seats/bus-row";
// import BusFrontRow from "@/components/seats/bus-front-row";
// import BusLastRow from "@/components/seats/bus-last-row";
import { useGetBusDetailsQuery } from "@/utils/redux/api/bus";
import {
  deselectSeat,
  selectSeat,
  selectSelectedSeats,
} from "@/utils/redux/slices/busSlice";
import { useSearchParams } from "next/navigation";

const BusLayout = memo(
  ({ selectedSeats = [], onSeatClick, className = "" }) => {
    const busId = useSearchParams().get("busId");
    const {
      data: busDetailsResponse,
      isLoading,
      error,
    } = useGetBusDetailsQuery(
      { busId },
      {
        skip: !busId,
        refetchOnMountOrArgChange: true,
      }
    );

    const busData = busDetailsResponse?.bus;
    const seatsData = busDetailsResponse?.seats;

    const seatLayout = useMemo(() => {
      if (!seatsData?.seatMap) return [];

      try {
        return generateSeatLayout({
          seatMap: seatsData.seatMap,
          totalSeats: seatsData.total,
        });
      } catch (error) {
        console.error("Error generating seat layout:", error);
        return [];
      }
    }, [seatsData?.seatMap, seatsData?.total]);

    const bookedSeats = useMemo(() => {
      if (!seatsData?.seatMap) return [];
      return seatsData.seatMap
        .filter((seat) => seat.status === "booked")
        .map((seat) => seat.seatNumber);
    }, [seatsData?.seatMap]);

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

    if (!busData || !seatsData) {
      return null;
    }

    return (
      <Card
        className={`mx-auto shadow-[0_2px_15px_rgba(0,0,0,0.05)] p-4 md:p-[1.5625rem] mb-[1.875rem] w-full rounded-xl will-change-transform ${className}`}
      >
        <CardContent className="space-y-2 p-0">
          {/* <BusFrontRow
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
            onSeatClick={onSeatClick}
          />
          <Separator className="mb-[2.5rem]" /> */}
          {seatLayout.map((rowSeats, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-between mt-2.5 mb-0 items-center"
            >
              <BusRow
                rowSeats={rowSeats}
                bookedSeats={bookedSeats}
                selectedSeats={selectedSeats}
                onSeatClick={onSeatClick}
                seatMap={seatsData.seatMap}
              />
            </div>
          ))}
          {/* <div className="w-full h-px my-[1.875rem] bg-gray-200 mx-4"></div>
          <BusLastRow
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
            onSeatClick={onSeatClick}
          /> */}
        </CardContent>
      </Card>
    );
  }
);

export default function BusLayoutContainer() {
  const selectedSeats = useSelector(selectSelectedSeats);
  const dispatch = useDispatch();
  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      dispatch(deselectSeat(seatId));
    } else {
      dispatch(selectSeat(seatId));
    }
  };

  return (
    <BusLayout selectedSeats={selectedSeats} onSeatClick={handleSeatClick} />
  );
}
