"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h1>
        <p className="text-gray-700 mb-4">
          {reason
            ? decodeURIComponent(reason)
            : "Unfortunately, your payment could not be processed."}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Please try again. If the problem persists, contact support.
        </p>

        <Link
          href="/booking"
          className="inline-block w-full py-2 px-4 rounded-xl bg-[#004aad] text-white font-medium text-center hover:bg-blue-800 transition duration-300 cursor-pointer"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
