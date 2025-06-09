import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

export function Navigation({ showBackLink = true, backTo = "/home" }) {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/home"
          className={cn(
            "text-2xl text-primary hover:text-secondary transition-colors",
            montserrat.className
          )}
        >
          smallbus
        </Link>
        {showBackLink && (
          <Link
            href={backTo}
            className="flex items-center gap-2 text-gray-700 hover:text-primary font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        )}
      </nav>
    </header>
  );
}
