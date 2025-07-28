"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { SEO_CONFIG } from "@/lib/seo";

export default function Error({ error, reset }) {
  useSEO({
    title: "Error - SmallBus",
    description:
      "An error occurred while loading the page. Please try again or contact support if the problem persists.",
    robots: "noindex,nofollow",
    openGraph: {
      title: "Error | SmallBus",
      description: "An error occurred while loading the page.",
    },
    url: `${SEO_CONFIG.siteUrl}/error`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Error - SmallBus",
      description:
        "An error occurred while loading the page. Please try again or contact support if the problem persists.",
    },
    noIndex: true,
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Something went wrong!
          </h1>
          <p className="text-gray-600 mb-8">
            We encountered an unexpected error. Don&apos;t worry, our team has
            been notified and we&apos;re working to fix it.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={reset}
            className="w-full bg-[#004aad] hover:bg-[#00388a] text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Try Again
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              className="w-full border-[#004aad] text-[#004aad] hover:bg-[#004aad] hover:text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Return to Home
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need immediate help?</p>
          <div className="mt-2">
            <Link href="/help" className="text-[#004aad] hover:underline">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
