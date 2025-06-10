"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IndianRupee } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function BookingSummary() {
  const { selectedSeats, bookingData } = useSelector((state) => state.booking);
  const router = useRouter();
  const handleProceed = () => {
    console.log("Proceeding to payment with selected seats:", selectedSeats);
    router.push("/payment");
  };

  const canProceed = selectedSeats.length > 0;
  return (
    <Card className="p-5 md:p-6 gap-0 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-200">
      <CardHeader className="mb-6">
        <CardTitle className="flex justify-center text-primary items-center text-[1.2rem] font-semibold md:text-[1.4rem]">
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-0 m-0">
        <AmountSummaryItem
          label="Selected Seats"
          value={selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
          className="min-w-[5rem]"
        >
          <span className="text-center">
            {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
          </span>
        </AmountSummaryItem>
      <Separator className="my-[0.9375rem]" />
        <AmountSummaryItem label="Total Seats" className="min-w-[5rem]">
          <span className="text-center">
            {selectedSeats.length}
          </span>
        </AmountSummaryItem>
      <Separator className="my-[0.9375rem]" />
        <AmountSummaryItem label="Fare per Seat:" className="min-w-[5rem] gap-0">
          <IndianRupee className="w-3 h-3" />
          <span className="text-center">
            {bookingData.seatPrice}
          </span>
        </AmountSummaryItem>
      <Separator className="my-[0.9375rem]" />
      <Separator className="my-[0.9375rem]" />
        <AmountSummaryItem
          label="Total Amount"
          className="font-bold text-primary bg-primary/10 text-[1.1rem] md:text-[1.3rem] px-[0.9375rem] py-2.5"
          labelClassname="text-[1.1rem] font-semibold text-[#333]"
        >
          <IndianRupee className="w-4 h-4 mr-1" />
          <span className="text-center ">
            {bookingData.seatPrice * selectedSeats.length}
          </span>
        </AmountSummaryItem>
        <Button
          className={cn("w-full h-fit m-0 p-3 md:p-[0.9375rem] md:text-[1.1rem] font-medium text-[1rem] mt-[0.9375rem] md:mt-[1.5625rem] hover:text-white text-white disabled:opacity-100 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-200",
            canProceed
              ? "bg-primary  hover:bg-secondary"
              : "bg-[#ccc] cursor-not-allowed"
          )}
          disabled={!canProceed}
          onClick={handleProceed}
        >
          Continue to Payment
        </Button>
      </CardContent>
    </Card>
  );
}

const AmountSummaryItem = ({ label, children, className, labelClassname }) => {
  return (
    <>
      <div className="flex p-0 m-0 justify-between font-semibold">
        <span className={cn("flex items-center text-[#666] text-[0.95rem] font-medium", labelClassname)}>{label}</span>
        <div
          className={cn(
            "flex items-center justify-center rounded-[0.5rem] py-2 px-3 gap-1  text-[#333] font-semibold bg-[#f8f9fa]",
            className
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};
