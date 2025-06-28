"use client";

import { Button } from "@/components/ui/button";

const OPTIONS= [
  { label: "All",     value: "all" },
  { label: "Completed",value: "confirmed" },
  { label: "Upcoming", value: "pending" },
  { label: "Cancelled",value: "cancelled" },
];

export function BookingFilter({ value, onChange }) {
  return (
    <div className="flex space-x-2 mb-[15px]">
      {OPTIONS.map(({ label, value: val }) => (
        <Button
          key={val}
          variant={value === val ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(val)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
