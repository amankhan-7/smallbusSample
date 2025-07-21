import LegalDocument from "@/components/LegalDocument";
import { privacyContent } from "@/lib/legal/privacy";
import { SEO_CONFIG } from "@/config/seo";

export const metadata = {
  title: SEO_CONFIG.pages.privacy.title,
  description: SEO_CONFIG.pages.privacy.description,
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "privacy rights",
    "data security",
    "user privacy",
    "SmallBus privacy",
  ],
  openGraph: {
    title: SEO_CONFIG.pages.privacy.title,
    description: SEO_CONFIG.pages.privacy.description,
    url: `${SEO_CONFIG.siteUrl}/privacy`,
  },
  twitter: {
    title: "Privacy Policy | SmallBus",
    description: "Learn how SmallBus protects your personal information.",
  },
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/privacy`,
  },
};

const Privacy = () => {
  return <LegalDocument content={privacyContent} />;
};

export default Privacy;
