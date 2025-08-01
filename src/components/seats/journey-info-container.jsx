"use client";
import React, { Suspense } from "react";
import { useGetBusDetailsQuery } from "@/utils/redux/api/bus";
import JourneyInfo from "@/components/seats/journey-info";
import { useDecryptedParam } from "@/hooks/useEncryptedSearchParams";

function JourneyInfoContent() {
  const { value: busId, isLoading: isDecryptingBusId } =
    useDecryptedParam("busId");
  const { data: busDetailsResponse, isLoading } = useGetBusDetailsQuery(
    {
      busId,
    },
    {
      skip: !busId || isDecryptingBusId,
    }
  );

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

export default function JourneyInfoContainer() {
  return (
    <Suspense fallback={null}>
      <JourneyInfoContent />
    </Suspense>
  );
}
