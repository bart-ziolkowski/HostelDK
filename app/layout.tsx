import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";

import Footer from "@/components/layout/Footer";
import { GlobalProvider } from "./GlobalProvider";
import Head from "./head";
import Header from "@/components/layout/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HostelDK",
  description: "Cheap hostels in Denmark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <GlobalProvider>
          <Header />
          {children}
          <Footer />
        </GlobalProvider>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></Script>
        <Script src="https://kit.fontawesome.com/66b6e95902.js"></Script>
      </body>
    </html>
  );
}
