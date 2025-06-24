import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JourneyInfo from "@/components/seats/journey-info";
import SeatLegend from "@/components/seats/seat-legend";
import BusLayout from "@/components/seats/bus-layout";
import BookingSummary from "@/components/seats/booking-summary";

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
          <JourneyInfo />
          <SeatLegend />
          <BusLayout />
          <BookingSummary />
        </CardContent>
      </Card>
    </main>
  );
}
