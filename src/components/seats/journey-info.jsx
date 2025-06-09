"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

export default function JourneyInfo() {
  const { bookingData } = useSelector((state) => state.booking);

  return (
    <Card className="p-0 mb-3 md:mb-4 rounded-[0.5rem] ">
      <CardContent className="flex p-2 md:px-4 md:py-3 flex-row items-center justify-between">
        <div className="flex gap-[0.1875rem] items-center ">
          <div className="flex flex-col items-center">
            <p className="font-semibold p-0">{bookingData.from}</p>
            <p className="text-[0.75rem] md:text-[0.85rem] text-[#5f6368]">
              {bookingData.departureTime}
            </p>
          </div>
          <ArrowRight className="w-6 h-6 text-primary" />
          <div className="flex flex-col items-center">
            <p className="font-semibold">{bookingData.to}</p>
            <p className="text-[0.75rem] md:text-[0.85rem] text-[#5f6368]">
              {bookingData.arrivalTime}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-12 w-px bg-gray-200 mx-4 md:mx-3"></div>
          <div className="flex flex-col items-end">
            <p className="font-semibold my-[0.2rem]">{bookingData.date}</p>
            <p className="text-[0.75rem] md:text-[0.85rem] text-[#5f6368]">
              {bookingData.busType}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
