"use client";

import { NavLink } from "./NavLink";
import { AccountButton } from "./AccountButton";

export function DesktopNavigation({ className = "", ...props }) {
  return (
    <ul
      className={`hidden md:flex gap-[32px] items-center m-0 p-0 list-none ${className}`}
      {...props}
    >
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/my-trips">My Trips</NavLink>
      </li>
      <li>
        <NavLink href="/help">Help</NavLink>
      </li>
      <li>
        <AccountButton />
      </li>
    </ul>
  );
}
