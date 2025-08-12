"use client";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useState, useEffect } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/**
 * Loading Spinner with SmallBus Logo
 */
export function LogoSpinner({ size = 60, className = "" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {mounted ? (
          <Image
            src="/logo.svg"
            alt="SmallBus Logo"
            width={size}
            height={size}
            className="animate-pulse"
            priority={false}
          />
        ) : (
          <div
            className="animate-pulse bg-blue-100 rounded flex items-center justify-center"
            style={{ width: size, height: size }}
          >
            <span
              className={cn(
                "text-[#004aad] font-bold text-xs",
                poppins.className
              )}
            >
              smallbus
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * App Loading Screen
 */
export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
      <div className="text-center">
        <LogoSpinner size={80} className="mb-6" />
        <p className="text-gray-600">Loading your journey...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
