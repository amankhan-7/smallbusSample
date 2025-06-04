import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`h-full bg-white text-[var(--text-color)] font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
