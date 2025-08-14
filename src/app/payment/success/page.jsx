"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const paymentId = searchParams.get("paymentId");
  const amount = searchParams.get("amount");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[#004aad] rounded-full">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#004aad] mb-2">Payment Successful</h1>
        <p className="text-gray-700 mb-4">
          Thank you for booking with <span className="font-semibold text-[#004aad]">smallbus</span>!
        </p>

        {bookingId && (
          <p className="text-sm text-gray-600 mb-2">
            Booking ID: <span className="font-semibold">{bookingId}</span>
          </p>
        )}
        {paymentId && (
          <p className="text-sm text-gray-600 mb-2">
            Payment ID: <span className="font-semibold">{paymentId}</span>
          </p>
        )}
        {amount && (
          <p className="text-sm text-gray-600 mb-6">
            Amount Paid: ₹{(Number(amount) / 100).toFixed(2)}
          </p>
        )}

        <p className="text-sm text-gray-500 mb-6">
          Your seat is confirmed. A confirmation email has been sent to your inbox.
        </p>
        <div className="flex flex-col gap-2">
            <Link
          href="/account?tab=bookingHistory"
          className="inline-block w-full py-2 px-4 rounded-xl bg-[#004aad] text-white font-medium text-center hover:bg-blue-800 transition duration-300 cursor-pointer"
        >
          Your Booking History
        </Link>

        <Link
          href="/"
          className="inline-block w-full py-2 px-4 rounded-xl bg-[#004aad] text-white font-medium text-center hover:bg-blue-800 transition duration-300 cursor-pointer"
        >
          Return to Homepage
        </Link>
        </div>
      
      </div>
    </div>
  );
}
