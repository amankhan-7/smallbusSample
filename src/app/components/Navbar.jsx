/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle("overflow-hidden");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={classNames(
              "font-[700] text-[1.5rem] text-[#004aad] no-underline transition-colors hover:text-[#003580]",
              montserrat.className
            )}
          >
            smallbus
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-0"
          >
            <span className="block w-6 h-0.5 bg-gray-700 transition-all"></span>
            <span className="block w-6 h-0.5 bg-gray-700 transition-all"></span>
            <span className="block w-6 h-0.5 bg-gray-700 transition-all"></span>
          </button>

          {/* Navigation Links */}
          <ul
            className={`md:flex items-center gap-8 ${
              isMenuOpen
                ? "fixed top-0 right-0 bottom-0 w-[270px] bg-white p-8 flex flex-col transform translate-x-0"
                : "hidden md:flex"
            }`}
          >
            <li>
              <Link
                href="/"
                className="text-gray-600 hover:text-[#004aad] font-medium text-sm transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#my-trips"
                className="text-gray-600 hover:text-[#004aad] font-medium text-sm transition-colors"
              >
                My Trips
              </Link>
            </li>
            <li>
              <Link
                href="/help"
                className="text-gray-600 hover:text-[#004aad] font-medium text-sm transition-colors"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="flex items-center gap-2 bg-[#004aad] text-white rounded-lg px-4 py-2.5 font-medium text-sm hover:bg-[#003580] transition-colors"
              >
                <i className="fas fa-user-circle"></i>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMenu}
          />
          {/* Mobile Menu */}
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white md:hidden">
            {/* Close button */}
            <button
              onClick={toggleMenu}
              className="absolute top-6 right-6 text-4xl text-[#004aad] focus:outline-none"
              aria-label="Close menu"
            >
              &times;
            </button>
            <nav className="flex flex-col items-center gap-10 w-full">
              <Link
                href="/"
                className="text-3xl font-medium text-gray-900 hover:text-[#004aad] transition-colors"
              >
                Home
              </Link>
              <Link
                href="#my-trips"
                className="text-3xl font-medium text-gray-900 hover:text-[#004aad] transition-colors"
              >
                My Trips
              </Link>
              <Link
                href="#help"
                className="text-3xl font-medium text-gray-900 hover:text-[#004aad] transition-colors"
              >
                Help
              </Link>
              <Link
                href="/login"
                className="mt-6 flex items-center justify-center gap-2 bg-[#004aad] text-white rounded-xl px-10 py-5 font-semibold text-2xl hover:bg-[#003580] transition-colors shadow-lg w-full max-w-xs"
              >
                <span className="text-2xl">
                  <i className="fas fa-user-circle"></i>
                </span>
                Login
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
