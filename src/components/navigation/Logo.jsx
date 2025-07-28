"use client";

import Link from "next/link";
import { Logo as LogoIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function Logo({ className, ...props }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-[700] text-[1.5rem] text-[#004aad] no-underline transition-colors hover:text-[#003580]",
        className
      )}
      {...props}
    >
      <LogoIcon width={120} height={40} priority={true} />
    </Link>
  );
}
