"use client";

import { Button } from "@/components/ui/button";

const OPTIONS = [
  { label: "All", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Expired", value: "expired" },
];

export function BookingFilter({ value, onChange }) {
  return (
    <div className="flex space-x-2 overflow-x-auto hide-scrollbar mb-[15px]">
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
