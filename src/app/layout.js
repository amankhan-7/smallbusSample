import "./globals.css";
import ReduxWrapper from "@/components/wrapper/redux-wrapper";
import HomeNavbar from "@/components/HomeNavbar/HomeNavbar";
import FooterWrapper from "@/components/wrapper/footer-wrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>
          <HomeNavbar />
          {children}
          <FooterWrapper />
        </ReduxWrapper>
      </body>
    </html>
  );
}
