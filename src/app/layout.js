import "./globals.css";
import ReduxWrapper from "@/components/wrapper/redux-wrapper";
import HomeNavbar from "@/components/HomeNavbar/HomeNavbar";
import FooterWrapper from "@/components/wrapper/footer-wrapper";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>
          <HomeNavbar />
          {children}
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </ReduxWrapper>
      </body>
    </html>
  );
}
