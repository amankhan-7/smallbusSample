import { SEO_CONFIG } from "@/config/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/payment/",
        "/seat/",
        "/account/",
        "/api/",
        "/_next/",
        "/admin/",
      ],
    },
    sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
  };
}
