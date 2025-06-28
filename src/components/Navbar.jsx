"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { hydrate } from "@/utils/redux/features/user/userSlice";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Navbar({
  navItems = [],
  logoText = "smallbus",
  loginUrl = "/login",
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, isHydrated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
    if (!isHydrated) {
      dispatch(hydrate());
    }
  }, [dispatch, isHydrated]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <header className="bg-white shadow fixed w-full top-0 z-[1000]">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "text-[24px] text-[#004aad] font-black",
            montserrat.className
          )}
        >
          {logoText}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center text-lg md:text-base font-medium text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-[#004aad] ${
                pathname === item.href
                  ? "text-[#004aad] underline underline-offset-4"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
          {isMounted && isHydrated && !isLoggedIn && (
            <Link
              href={actionLink.href}
              className="px-3 py-2 bg-[#004aad] text-white rounded-md hover:bg-[#00348a] transition inline-flex items-center gap-2"
            >
              {actionLink.icon}
              {actionLink.label}
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="relative w-8 h-8 text-[#004aad] md:hidden pb-5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FaBars
            size={24}
            className={`absolute transition-all duration-300 ease-in-out transform ${
              menuOpen
                ? "opacity-0 scale-90 rotate-45"
                : "opacity-100 scale-100 rotate-0"
            }`}
          />
          <FaTimes
            size={26}
            className={`pt-5 absolute transition-all duration-300 ease-in-out transform ${
              menuOpen
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-90 -rotate-45"
            }`}
          />
        </button>
      </nav>

      {/* Mobile Sidebar & Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] flex">
          {/* Overlay */}
          <div
            className="w-1/2 bg-black/30 mix-blend-multiply"
            onClick={() => setMenuOpen(false)}
          />
          {/* Sidebar */}
          <div className="w-1/2 bg-white shadow-lg p-6 flex flex-col pt-30 items-center relative">
            <button
              className="absolute top-4 right-4 text-[#004aad]"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes size={26} className="mb-18 mt-2 mr-0.5" />
            </button>

            <div className="flex flex-col items-center space-y-6 text-gray-700 text-base font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "text-[#004aad] underline underline-offset-4"
                      : "hover:text-[#004aad]"
                  } transition`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isMounted && isHydrated && !isLoggedIn && (
                <Link
                  href={actionLink.href}
                  className="mt-4 px-4 py-2 bg-[#004aad] text-white rounded-md hover:bg-[#00348a] transition inline-flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {actionLink.icon}
                  {actionLink.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
