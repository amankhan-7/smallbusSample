"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  children,
  className,
  isMobile = false,
  onClick,
  ...props
}) {
  const baseClasses = isMobile
    ? "font-semibold min-h-fit text-[1rem] text-[#495057] transition-colors hover:text-[#004aad]"
    : "nav-link font-semibold min-h-fit text-[0.95rem] text-[#495057] transition-colors relative";

  return (
    <Link
      href={href}
      className={cn(baseClasses, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
}
