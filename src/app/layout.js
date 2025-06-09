import { Navigation } from "@/components/navigaation/navigation";
import "./globals.css";
import ReduxWrapper from "@/components/wrapper/redux-wrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full bg-white text-[var(--text-color)] font-sans`}>
        <ReduxWrapper>
          <Navigation />
          {children}
        </ReduxWrapper>
      </body>
    </html>
  );
}
