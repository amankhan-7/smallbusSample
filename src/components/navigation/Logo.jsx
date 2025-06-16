"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

export function Logo({ className, ...props }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-[700] text-[1.5rem] text-[#004aad] no-underline transition-colors hover:text-[#003580]",
        montserrat.className,
        className
      )}
      {...props}
    >
      smallbus
    </Link>
  );
}
