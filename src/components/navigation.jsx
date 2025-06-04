import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function Navigation({ showBackLink = true, backTo = "/home" }) {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/home"
          className="text-2xl font-bold text-primary hover:text-secondary transition-colors"
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
