"use client";

import Link from "next/link";
import { UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccountButton({
  href = "/account",
  children = "My Account",
  className,
  onClick,
  ...props
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-[8px] bg-[#004aad] text-white no-underline rounded-[8px] px-[16px] py-[10px] font-semibold min-h-fit text-[0.9rem] transition-colors hover:bg-[#003580]",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <UserCircle2 />
      {children}
    </Link>
  );
}
