"use client";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IndianRupee } from "lucide-react";

const SummaryItem = memo(({
  label,
  children,
  className,
  labelClassName,
}) => {
  return (
    <div className="flex p-0 m-0 justify-between font-semibold">
      <span
        className={cn(
          "flex items-center text-[#666] text-[0.95rem] font-medium",
          labelClassName
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "flex items-center justify-center rounded-[0.5rem] py-2 px-3 gap-1 text-[#333] font-semibold bg-[#f8f9fa]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
});

const BookingSummary = memo(
  ({
    selectedSeats = [],
    seatPrice = 0,
    onProceed,
    isLoading = false,
    className = "",
  }) => {
    const totalAmount = seatPrice * selectedSeats.length;
    const canProceed = selectedSeats.length > 0;

    if (isLoading) {
      return (
        <div className={cn("p-5 md:p-6", className)}>
          <div className="mb-6">
            <h3 className="text-center text-primary text-[1.2rem] font-semibold md:text-[1.4rem]">
              Booking Summary
            </h3>
          </div>
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
            <p>Loading booking details...</p>
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "p-5 md:p-6 gap-0 ",
          className
        )}
      >
        <div className="mb-6">
          <h3 className="flex justify-center text-primary items-center text-[1.2rem] font-semibold md:text-[1.4rem]">
           Booking Summary
          </h3>
        </div>
        <div className="space-y-4 p-0 m-0">
          <SummaryItem label="Selected Seats" className="min-w-[5rem]">
            <span className="text-center">
              {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
            </span>
          </SummaryItem>

          <div className="w-full h-px bg-gray-200"></div>

          <SummaryItem label="Total Seats" className="min-w-[5rem]">
            <span className="text-center">{selectedSeats.length}</span>
          </SummaryItem>

          <div className="w-full h-px bg-gray-200"></div>

          <SummaryItem label="Fare per Seat:" className="min-w-[5rem] gap-0">
            <IndianRupee className="w-3 h-3" />
            <span className="text-center">{seatPrice}</span>
          </SummaryItem>

          <div className="w-full h-px bg-gray-200"></div>
          <div className="w-full h-px bg-gray-200"></div>

          <SummaryItem
            label="Total Amount"
            className="font-bold text-primary bg-primary/10 text-[1.1rem] md:text-[1.3rem] px-[0.9375rem] py-2.5"
            labelClassName="text-[1.1rem] font-semibold text-[#333]"
          >
            <IndianRupee className="w-4 h-4 mr-1" />
            <span className="text-center">{totalAmount}</span>
          </SummaryItem>

          <Button
            className={cn(
              "w-full h-fit m-0 p-3 md:p-[0.9375rem] md:text-[1.1rem] font-medium text-[1rem] mt-[0.9375rem] md:mt-[1.5625rem] hover:text-white text-white disabled:opacity-100 ",
              canProceed
                ? "bg-primary hover:bg-secondary"
                : "bg-[#ccc] cursor-not-allowed"
            )}
            disabled={!canProceed}
            onClick={onProceed}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    );
  }
);

export default BookingSummary;
