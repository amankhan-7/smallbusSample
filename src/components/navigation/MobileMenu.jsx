"use client";

import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";
import { AccountButton } from "./AccountButton";
import { BackLink } from "./BackLink";

export function MobileMenu({
  isOpen,
  onLinkClick,
  showBackLink = false,
  backTo = "/",
  className,
  ...props
}) {
  return (
    <nav
      className={cn(
        "fixed top-0 right-0 bottom-0 bg-white w-[270px] p-[100px_32px_32px] flex flex-col gap-[24px] shadow-[0_10px_15px_rgba(0,0,0,0.03)] z-[1000] transition-transform",
        isOpen ? "translate-x-0" : "translate-x-[100%]",
        className
      )}
      {...props}
    >
      <NavLink href="/" isMobile onClick={onLinkClick}>
        Home
      </NavLink>
      <NavLink href="/my-trips" isMobile onClick={onLinkClick}>
        My Trips
      </NavLink>
      <NavLink href="/help" isMobile onClick={onLinkClick}>
        Help
      </NavLink>
      <AccountButton onClick={onLinkClick} />
      {showBackLink && <BackLink href={backTo} onClick={onLinkClick} />}
    </nav>
  );
}
