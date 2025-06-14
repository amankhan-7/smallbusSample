"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Menu, UserCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

export function Navigation({ showBackLink = false, backTo = "/" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
  }, [menuOpen]);

  return (
    <header className="bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] fixed top-0 left-0 right-0 z-[1000]">
      <div className="w-full py-[9.4px] max-w-[1200px] mx-auto px-[24px]">
        <div className="flex items-center justify-between h-[3rem]">
          <Link
            href="/"
            className={cn(
              "font-[700] text-[1.5rem] text-[#004aad] no-underline transition-colors hover:text-[#003580]",
              montserrat.className
            )}
          >
            smallbus
          </Link>

          <ul className="hidden md:flex gap-[32px] items-center m-0 p-0 list-none">
            <li>
              <Link
                href="/"
                className="nav-link font-semibold min-h-fit text-[0.95rem] text-[#495057] transition-colors relative"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/my-trips"
                className="nav-link font-semibold min-h-fit text-[0.95rem] text-[#495057] transition-colors"
              >
                My Trips
              </Link>
            </li>
            <li>
              <Link
                href="/help"
                className="nav-link font-semibold min-h-fit text-[0.95rem] text-[#495057] transition-colors"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                href="/account"
                className="flex items-center gap-[8px] bg-[#004aad] text-white no-underline rounded-[8px] px-[16px] py-[10px] font-semibold min-h-fit text-[0.9rem] transition-colors hover:bg-[#003580]"
              >
                <UserCircle2 />
                My Account
              </Link>
            </li>
          </ul>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex md:hidden flex-col gap-[5px] bg-transparent border-0 p-0 cursor-pointer z-[1001]"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={24} strokeWidth={2} className="text-[#343a40]" />
            ) : (
              <Menu size={24} strokeWidth={2} className="text-[#343a40]" />
            )}
          </button>
        </div>
      </div>

      <div
        onClick={() => setMenuOpen(false)}
        className={cn(
          "fixed inset-0 bg-[rgba(0,0,0,0.4)] z-[999] transition-opacity",
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      <nav
        className={cn(
          "fixed top-0 right-0 bottom-0 bg-white w-[270px] p-[100px_32px_32px] flex flex-col gap-[24px] shadow-[0_10px_15px_rgba(0,0,0,0.03)] z-[1000] transition-transform",
          menuOpen ? "translate-x-0" : "translate-x-[100%]"
        )}
      >
        <Link
          href="/"
          className="font-semibold min-h-fit text-[1rem] text-[#495057] transition-colors hover:text-[#004aad]"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/my-trips"
          className="font-semibold min-h-fit text-[1rem] text-[#495057] transition-colors hover:text-[#004aad]"
          onClick={() => setMenuOpen(false)}
        >
          My Trips
        </Link>
        <Link
          href="/help"
          className="font-semibold min-h-fit text-[1rem] text-[#495057] transition-colors hover:text-[#004aad]"
          onClick={() => setMenuOpen(false)}
        >
          Help
        </Link>
        <Link
          href="/account"
          className="flex items-center gap-[8px] bg-[#004aad] text-white no-underline rounded-[8px] px-[16px] py-[10px] font-semibold min-h-fit text-[0.9rem] transition-colors hover:bg-[#003580]"
          onClick={() => setMenuOpen(false)}
        >
          <UserCircle2 />
          My Account
        </Link>
        {showBackLink && (
          <Link
            href={backTo}
            className="mt-auto flex items-center gap-[8px] font-semibold min-h-fit text-[0.95rem] text-[#666] transition-colors hover:text-[#004aad]"
            onClick={() => setMenuOpen(false)}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        )}
      </nav>
    </header>
  );
}
