import { Navigation } from "@/components/navigaation/navigation";
import "./globals.css";
import ReduxWrapper from "@/components/wrapper/redux-wrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>
          <Navigation />
          {children}
        </ReduxWrapper>
      </body>
    </html>
  );
}
