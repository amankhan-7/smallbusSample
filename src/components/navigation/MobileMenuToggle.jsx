"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileMenuToggle({
  isOpen,
  onToggle,
  className = "",
  ...props
}) {
  return (
    <Button
      onClick={onToggle}
      className={`flex md:hidden flex-col gap-[5px] bg-transparent border-0 p-0 cursor-pointer z-[1001] ${className}`}
      aria-label="Toggle menu"
      {...props}
    >
      {isOpen ? (
        <X size={24} strokeWidth={2} className="text-[#343a40]" />
      ) : (
        <Menu size={24} strokeWidth={2} className="text-[#343a40]" />
      )}
    </Button>
  );
}
