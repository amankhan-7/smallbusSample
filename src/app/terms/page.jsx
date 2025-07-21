import LegalDocument from "@/components/LegalDocument";
import termsContent from "@/lib/legal/terms";
import { SEO_CONFIG } from "@/config/seo";

export const metadata = {
  title: SEO_CONFIG.pages.terms.title,
  description: SEO_CONFIG.pages.terms.description,
  keywords: [
    "terms and conditions",
    "legal terms",
    "user agreement",
    "service terms",
    "booking terms",
    "cancellation policy",
    "SmallBus terms",
  ],
  openGraph: {
    title: SEO_CONFIG.pages.terms.title,
    description: SEO_CONFIG.pages.terms.description,
    url: `${SEO_CONFIG.siteUrl}/terms`,
  },
  twitter: {
    title: "Terms and Conditions | SmallBus",
    description: "Read SmallBus terms and conditions for bus ticket booking.",
  },
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/terms`,
  },
};

const Terms = () => {
  return <LegalDocument content={termsContent} />;
};

export default Terms;
