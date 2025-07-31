import React from "react";
import { LoadingSpinnerSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
      <LoadingSpinnerSkeleton />
    </div>
  );
}
