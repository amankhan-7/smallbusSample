"use client";
import { useGetBusDataQuery } from "@/utils/redux/api/bus";
import { useSelector } from "react-redux";
import JourneyInfo from "@/components/seats/journey-info";

export default function JourneyInfoContainer() {
  const selectedBusId = useSelector((state) => state.booking.selectedBusId);
  const { data: bookingData, isLoading } = useGetBusDataQuery({
    id: selectedBusId,
  });

  return (
    <JourneyInfo
      from={bookingData?.from}
      to={bookingData?.to}
      departureTime={bookingData?.departureTime}
      arrivalTime={bookingData?.arrivalTime}
      date={bookingData?.date}
      busType={bookingData?.busType}
      isLoading={isLoading}
    />
  );
}
