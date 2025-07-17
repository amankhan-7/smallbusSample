"use client";
import { useGetBusDetailsQuery } from "@/utils/redux/api/bus";
import { useSelector } from "react-redux";
import JourneyInfo from "@/components/seats/journey-info";
import { useSearchParams } from "next/navigation";

export default function JourneyInfoContainer() {
  const busId = useSearchParams().get("busId");
  const { data: busDetailsResponse, isLoading } = useGetBusDetailsQuery({
    busId,
  });

  const busData = busDetailsResponse?.bus;

  return (
    <JourneyInfo
      from={busData?.routeFrom}
      to={busData?.routeTo}
      departureTime={busData?.departureTime}
      arrivalTime={busData?.arrivalTime}
      date={busData?.date}
      busType={busData?.busName}
      isLoading={isLoading}
    />
  );
}
