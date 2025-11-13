import type { Metadata } from "next";
import "./globals.scss";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "My Budget App",
  description: "Budget app with currency rates",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
