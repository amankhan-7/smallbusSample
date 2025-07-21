import { useEffect } from "react";
import { SEO_CONFIG } from "@/config/seo";

/**
 * SEO Head Component for client-side metadata updates
 * Use this component in client components where static metadata can't be used
 */
export default function SEOHead({
  title,
  description,
  keywords = [],
  robots = "index,follow",
  canonical,
  openGraph = {},
  structuredData = null,
  noIndex = false,
}) {
  useEffect(() => {
    if (title) {
      document.title = title.includes("SmallBus")
        ? title
        : `${title} | SmallBus`;
    }

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = description;
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
      }
    }

    if (keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.content = keywords.join(", ");
      } else {
        const meta = document.createElement("meta");
        meta.name = "keywords";
        meta.content = keywords.join(", ");
        document.head.appendChild(meta);
      }
    }

    if (robots || noIndex) {
      const robotsContent = noIndex ? "noindex,nofollow" : robots;
      let robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        robotsMeta.content = robotsContent;
      } else {
        const meta = document.createElement("meta");
        meta.name = "robots";
        meta.content = robotsContent;
        document.head.appendChild(meta);
      }
    }

    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.href = canonical;
      } else {
        const link = document.createElement("link");
        link.rel = "canonical";
        link.href = canonical;
        document.head.appendChild(link);
      }
    }

    if (openGraph.title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.content = openGraph.title;
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:title");
        meta.content = openGraph.title;
        document.head.appendChild(meta);
      }
    }

    if (openGraph.description) {
      let ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      if (ogDescription) {
        ogDescription.content = openGraph.description;
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:description");
        meta.content = openGraph.description;
        document.head.appendChild(meta);
      }
    }

    if (openGraph.url) {
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.content = openGraph.url;
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:url");
        meta.content = openGraph.url;
        document.head.appendChild(meta);
      }
    }

    if (structuredData) {
      const existingScript = document.querySelector(
        `script[data-schema="${structuredData.type || "default"}"]`
      );
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", structuredData.type || "default");
      script.textContent = JSON.stringify(structuredData.data);
      document.head.appendChild(script);
    }
  }, [
    title,
    description,
    keywords,
    robots,
    canonical,
    openGraph,
    structuredData,
    noIndex,
  ]);

  return null;
}
