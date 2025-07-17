import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function AuthRedirectLoading() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] text-[var(--text-color)] font-sans">
      <div className="max-w-[900px] w-full min-h-screen mt-16 pt-6 mx-auto mb-[50px] px-[15px]">
        <h1 className="text-center text-2xl font-bold mb-6">
          Redirecting to login...
        </h1>
        <p className="text-center text-gray-600">
          If you are not redirected automatically, please click the button
          below.
        </p>
        <Button asChild className="flex justify-center mt-6">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </Link>
        </Button>
      </div>
    </div>
  );
}
