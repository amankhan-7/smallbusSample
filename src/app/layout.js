import "./globals.css";
import ReduxWrapper from "@/components/wrapper/redux-wrapper";
import HomeNavbar from "@/components/HomeNavbar/HomeNavbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>
          <HomeNavbar />
          {children}
        </ReduxWrapper>
      </body>
    </html>
  );
}
