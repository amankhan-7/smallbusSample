import React from "react";
import { PageSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="container mx-auto py-8">
        <PageSkeleton />
      </div>
    </div>
  );
}
