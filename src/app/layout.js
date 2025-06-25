import "./globals.css";
import ReduxWrapper from "@/components/wrapper/redux-wrapper";
import HomeNavbar from "@/components/HomeNavbar/HomeNavbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>
          <HomeNavbar />
          {children}
          <Footer />
        </ReduxWrapper>
      </body>
    </html>
  );
}
