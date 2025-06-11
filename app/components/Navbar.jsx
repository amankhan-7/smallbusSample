"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "My Trips", href: "/trips" },
    { name: "Help", href: "/help" },
  ];

  return (
    <header className="bg-white shadow fixed w-full top-0 z-[1000]">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[24px] text-[#004aad] font-mont font-black"
        >
          smallbus
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
          <Link
            href="/login"
            className="px-3 py-2 bg-[#004aad] text-white rounded-md hover:bg-[#00348a] transition inline-flex items-center gap-2"
          >
            <User size={16} /> Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="relative w-8 h-8 text-[#004aad] md:hidden pb-5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* Menu Icon */}
          <Menu
            size={28}
            className={`absolute transition-all duration-300 ease-in-out transform ${
              menuOpen
                ? "opacity-0 scale-90 rotate-45"
                : "opacity-100 scale-100 rotate-0"
            }`}
          />
          {/* X Icon */}
          <X
            size={30}
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
          {/* Transparent Dim Overlay */}
          <div
            className="w-1/2 bg-black/30 mix-blend-multiply"
            onClick={() => setMenuOpen(false)}
          />
          {/* Sidebar */}
          <div className="w-1/2 bg-white shadow-lg p-6 flex flex-col pt-30 items-center relative">
            {/* Close Button aligned same as toggle */}
            <button
              className="absolute top-4 right-4 text-[#004aad]"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={30} className="mb-18 mt-2.5 mr-0.5" />
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
              <Link
                href="/login"
                className="mt-4 px-4 py-2 bg-[#004aad] text-white rounded-md hover:bg-[#00348a] transition inline-flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <User size={16} /> Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
