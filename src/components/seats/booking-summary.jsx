"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IndianRupee } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function BookingSummary({}) {
  const { selectedSeats, bookingData } = useSelector((state) => state.booking);
  const router = useRouter();
  const handleProceed = () => {
    console.log("Proceeding to payment with selected seats:", selectedSeats);
    router.push("/payment");
  };

  const canProceed = selectedSeats.length > 0;
  return (
    <Card className="p-5 md:p-6 gap-0">
      <CardHeader className="mb-6">
        <CardTitle className="flex justify-center text-primary items-center text-[1.2rem] font-semibold md:text-[1.4rem]">
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-0 m-0">
        <div className="flex p-0 m-0 justify-between font-semibold">
          <span className="flex items-center">Selected Seats</span>
          <div className="flex items-center text-[1.1rem] md:text-[1.3rem] justify-center  rounded-[0.5rem]  min-w-[5rem] py-2.5 px-3.5 gap-1  text-[#333] bg-[#f8f9fa]">
            <span className="text-center">
              {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
            </span>
          </div>
        </div>
        <Separator className='my-[0.9375rem]' />

        <div className="flex p-0 m-0 justify-between font-semibold ">
          <span className="flex items-center gap-1">Total Seats</span>
          <div className="flex items-center text-[1.1rem] md:text-[1.3rem] justify-center  rounded-[0.5rem] min-w-[5rem] py-2.5 px-3.5 gap-1 text-[#333] bg-[#f8f9fa]">
            <span className="text-center">{selectedSeats.length}</span>
          </div>
        </div>
        <Separator className='my-[0.9375rem]' />
        <div className="flex p-0 m-0 justify-between font-semibold ">
          <span className="flex items-center gap-1">Fare per Seat:</span>
          <div className="flex items-center text-[1.1rem] md:text-[1.3rem] justify-center  rounded-[0.5rem] min-w-[5rem] py-2.5 px-3.5 gap-1 text-[#333] bg-[#f8f9fa]">
            <IndianRupee className="w-4 h-4" />
            <span className="text-center">{bookingData.seatPrice}</span>
          </div>
        </div>
        <Separator />
        <Separator />
        <div className="flex justify-between font-semibold text-lg">
          <span className="flex items-center gap-1">Total Amount</span>
          <div className="flex items-center text-[1.1rem] font-bold md:text-[1.3rem] justify-center  rounded-[0.5rem] py-2.5 px-3.5 gap-1 text-primary bg-primary/10">
            <IndianRupee className="w-4 h-4" />
            <span className="text-center">{bookingData.seatPrice * selectedSeats.length}</span>
          </div>
        </div>

          <Button
            className="w-full h-fit m-0 p-3 md:p-[0.9375rem] md:text-[1.1rem] font-medium text-[1rem] mt-[0.9375rem] md:mt-[1.5625rem]"
            disabled={!canProceed}
            onClick={handleProceed}
          >
            Continue to Payment
          </Button>
      </CardContent>
    </Card>
  );
}
