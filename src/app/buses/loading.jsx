import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div className="absolute inset-0 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        <div className="flex items-center justify-center h-screen">
          <div className="text-primary">Loading...</div>
        </div>
      </div>
    </div>
  );
}
