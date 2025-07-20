import "./globals.css";
import ReduxWrapper from "@/components/wrapper/redux-wrapper";
import HomeNavbar from "@/components/HomeNavbar/HomeNavbar";
import FooterWrapper from "@/components/wrapper/footer-wrapper";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
