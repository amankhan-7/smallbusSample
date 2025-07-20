"use client";

import { cn } from "@/lib/utils";

export function MobileOverlay({ isOpen, onClose, className, ...props }) {
  return (
    <div
      onClick={onClose}
      className={cn(
        "fixed inset-0 bg-[rgba(0,0,0,0.4)] z-[999] transition-opacity",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
      {...props}
    />
  );
}
