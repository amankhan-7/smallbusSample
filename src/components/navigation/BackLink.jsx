"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackLink({
  href = "/",
  children = "Back to Home",
  className,
  onClick,
  ...props
}) {
  return (
    <Link
      href={href}
      className={cn(
        "mt-auto flex items-center gap-[8px] font-semibold min-h-fit text-[0.95rem] text-[#666] transition-colors hover:text-[#004aad]",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <ArrowLeft size={16} />
      {children}
    </Link>
  );
}
