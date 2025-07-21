import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page Not Found - 404 Error | SmallBus",
  description:
    "Sorry, the page you are looking for could not be found. Return to SmallBus home page to continue your bus booking journey.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-[#004aad] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for could not be found. It might
            have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            asChild
            className="w-full bg-[#004aad] hover:bg-[#00388a] text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            <Link href="/">Return to Home</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full border-[#004aad] text-[#004aad] hover:bg-[#004aad] hover:text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            <Link href="/help">Get Help</Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Popular actions:</p>
          <div className="mt-2 space-x-4">
            <Link href="/" className="text-[#004aad] hover:underline">
              Search Buses
            </Link>
            <span>•</span>
            <Link href="/help" className="text-[#004aad] hover:underline">
              Help Center
            </Link>
            <span>•</span>
            <Link href="/account" className="text-[#004aad] hover:underline">
              My Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
