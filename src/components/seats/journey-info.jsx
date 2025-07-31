"use client";
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const JourneyInfo = memo(({
  from,
  to,
  departureTime,
  arrivalTime,
  date,
  busType,
  isLoading = false,
  className = "",
}) => {
  if (isLoading) {
    return (
      <Card className={`mb-3 md:mb-4 rounded-[0.5rem] ${className}`}>
        <CardContent className="text-center text-gray-500">
          {null}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`p-0 mb-3 md:mb-4 rounded-[0.5rem] ${className}`}>
      <CardContent className="flex p-2 md:px-4 md:py-3 flex-row items-center justify-between">
        <div className="flex gap-[0.1875rem] items-center">
          <div className="flex flex-col items-center">
            <p className="font-semibold p-0">{from}</p>
            <p className="text-[0.75rem] md:text-[0.85rem] text-[#5f6368]">
              {departureTime}
            </p>
          </div>
          <ArrowRight className="w-6 h-6 text-primary" />
          <div className="flex flex-col items-center">
            <p className="font-semibold">{to}</p>
            <p className="text-[0.75rem] md:text-[0.85rem] text-[#5f6368]">
              {arrivalTime}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-12 w-px bg-gray-200 mx-4 md:mx-3"></div>
          <div className="flex flex-col items-end">
            <p className="font-semibold my-[0.2rem]">{date}</p>
            <p className="text-[0.75rem] md:text-[0.85rem] text-[#5f6368]">
              {busType}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default JourneyInfo;
