"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaUser, FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/ui/svg-components";

export default function Navbar({ navItems = [], logoText = "smallbus" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  let actionLink;
  if (!isAuthenticated) {
    actionLink = {
      href: "/login",
      label: "Login",
      icon: <FaUser size={16} />,
    };
  } else {
    actionLink = {
      href: "/account",
      label: "Account",
      icon: <FaUserCircle size={18} />,
    };
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleMenuToggle = () => {
    if (!menuOpen) {
      setIsTransitioning(true);
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <header className="bg-white shadow fixed w-full top-0 z-[1000]">
      <nav className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Logo width={120} height={50} />
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
            href={actionLink.href}
            className="px-3 py-2 bg-[#004aad] text-white rounded-md hover:bg-[#00348a] transition inline-flex items-center gap-2"
          >
            {actionLink.icon}
            {actionLink.label}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="w-8 h-8 text-[#004aad] flex items-center justify-center md:hidden"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          {!menuOpen ? (
            <FaBars
              size={24}
              className={`transition-all duration-300 ease-in-out transform ${
                menuOpen
                  ? "opacity-0 scale-90 rotate-45"
                  : "opacity-100 scale-100 rotate-0"
              }`}
            />
          ) : (
            <FaTimes
              size={26}
              className={`transition-all duration-300 ease-in-out transform ${
                menuOpen
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-90 -rotate-45"
              }`}
            />
          )}
        </button>
      </nav>

      {/* Mobile Sidebar & Overlay */}
      {(menuOpen || isTransitioning) && (
        <div
          className={`fixed inset-0 z-[999] flex transition-all duration-300 ease-in-out ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Overlay */}
          <div
            className={`w-1/2 bg-black/30 mix-blend-multiply transition-opacity duration-300 ease-in-out ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleMenuClose}
          />
          {/* Sidebar */}
          <div
            className={`w-1/2 bg-white shadow-lg p-6 flex flex-col pt-30 items-center relative transform transition-all duration-300 ease-in-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              className="absolute top-4 right-4 text-[#004aad]"
              onClick={handleMenuClose}
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
                  onClick={handleMenuClose}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href={actionLink.href}
                className="mt-4 px-4 py-2 bg-[#004aad] text-white rounded-md hover:bg-[#00348a] transition inline-flex items-center gap-2"
                onClick={handleMenuClose}
              >
                {actionLink.icon}
                {actionLink.label}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
