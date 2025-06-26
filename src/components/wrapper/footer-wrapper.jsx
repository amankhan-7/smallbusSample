"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  const hideFooterPaths = ["/login"];

  if (hideFooterPaths.includes(pathname)) {
    return null;
  }

  return <Footer />;
}
