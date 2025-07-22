import Hero from "@/components/Hero";
import { SEO_CONFIG } from "@/config/seo";

export const metadata = {
  title: SEO_CONFIG.pages.home.title,
  description: SEO_CONFIG.pages.home.description,
  keywords: SEO_CONFIG.pages.home.keywords,
  openGraph: {
    title: SEO_CONFIG.pages.home.title,
    description: SEO_CONFIG.pages.home.description,
    url: SEO_CONFIG.siteUrl,
    images: SEO_CONFIG.openGraph.images,
  },
  twitter: {
    title: "Book Bus Tickets Online - Best Deals | SmallBus",
    description:
      "Find and book bus tickets online at SmallBus. Compare prices and travel comfortably across India.",
  },
  alternates: {
    canonical: SEO_CONFIG.siteUrl,
  },
};

export default function HeroSearch() {
  return (
    <main>
      <Hero />
    </main>
  );
}
