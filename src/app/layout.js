import "./globals.css";
import ReduxWrapper from "@/components/wrapper/redux-wrapper";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>
          <Navbar />
          {children}
        </ReduxWrapper>
      </body>
    </html>
  );
}
