import "./globals.css";
import ReduxWrapper from "@/components/wrapper/redux-wrapper";
import HomeNavbar from "@/components/HomeNavbar/HomeNavbar";
import FooterWrapper from "@/components/wrapper/footer-wrapper";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SEO_CONFIG } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },
  description: SEO_CONFIG.defaultDescription,
  keywords: SEO_CONFIG.defaultKeywords,
  authors: [{ name: "SmallBus Team" }],
  creator: SEO_CONFIG.siteName,
  publisher: SEO_CONFIG.siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    ...SEO_CONFIG.openGraph,
    url: SEO_CONFIG.siteUrl,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
  },
  twitter: {
    ...SEO_CONFIG.twitter,
    title: "SmallBus - Book Bus Tickets Online",
    description:
      "Book bus tickets online with SmallBus. Find the best deals on bus travel across India.",
  },
  icons: {
    icon: [
      { url: "/smallbus.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SEO_CONFIG.siteUrl,
  },
  other: {
    "google-site-verification": "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#004aad" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SEO_CONFIG.organization),
          }}
        />
      </head>
      <body>
        <ReduxWrapper>
          <HomeNavbar />
          <div className="overflow-hidden">{children}</div>
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
          <Toaster />
        </ReduxWrapper>
      </body>
    </html>
  );
}
