import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JourneyInfoContainer from "@/components/seats/journey-info-container";
import SeatLegendContainer from "@/components/seats/seat-legend-container";
import BusLayoutContainer from "@/components/seats/bus-layout-container";
import BookingSummaryContainer from "@/components/seats/booking-summary-container";
import { Suspense } from "react";
import { SeatSelectionSkeleton } from "@/components/ui/skeletons";

export default function SeatSelection() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <Card className="mx-[0.9375rem] md:mx-auto md:mt-4 max-w-[56.25rem] p-5 md:p-[1.875rem] rounded-[0.75rem] md:rounded-2xl gap-0 mb-[1.875rem]">
        <CardHeader className="text-primary gap-0 text-center mb-[1.875rem]">
          <CardTitle className="text-[1.8rem] font-semibold">
            Select Your Seats
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col">
          <JourneyInfoContainer />
          <SeatLegendContainer />
          <BusLayoutContainer />
          <BookingSummaryContainer />
        </CardContent>
      </Card>
    </main>
  );
}
