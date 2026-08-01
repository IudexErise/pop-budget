import type { Metadata } from "next";
import "./globals.scss";
import { Inter } from "next/font/google";
import Header from "@components/header/header";
import Footer from "@components/footer/footer";
import GoogleScript from "@functions/googleScript";

export const metadata: Metadata = {
  title: "Pop Budget",
  description: "Multicurrency budget app",
  icons: {
    icon: "/appicon.png",
  },
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
        <Header />
        <main>{children}</main>
        <Footer />
        <GoogleScript />
      </body>
    </html>
  );
}
