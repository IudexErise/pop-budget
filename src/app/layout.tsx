import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Budget App",
  description: "Budget app with currency rates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
