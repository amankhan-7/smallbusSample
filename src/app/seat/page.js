import SeatSelection from "@/components/seats/seat-selection";
import { SEO_CONFIG } from "@/lib/seo";

export const metadata = {
  title: SEO_CONFIG.pages.seat.title,
  description: SEO_CONFIG.pages.seat.description,
  keywords: [
    "bus seat selection",
    "choose bus seats",
    "seat map",
    "bus seat booking",
    "window seat",
    "aisle seat",
    "bus seating chart",
    "select seats online",
  ],
  openGraph: {
    title: SEO_CONFIG.pages.seat.title,
    description: SEO_CONFIG.pages.seat.description,
    url: `${SEO_CONFIG.siteUrl}/seat`,
  },
  twitter: {
    title: "Select Your Seats | SmallBus",
    description:
      "Select your preferred bus seats with our interactive seat map.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SeatsPage() {
  return <SeatSelection />;
}
