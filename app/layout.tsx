/**
 * Root Layout — fonts, metadata, nav/footer wrapper.
 * Fonts per design.md §3: Playfair Display (display), Cormorant SC (kicker), Inter (body).
 * Meta per content.md §1 (Global).
 */

import type { Metadata } from "next";
import { Playfair_Display, Cormorant_SC, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display-var",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const cormorantSC = Cormorant_SC({
  variable: "--font-kicker-var",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-body-var",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASTITVA | GLBITM Fresher Community",
  description:
    "Astitva is GLBITM's fresher community — a space to discover who you are, connect with your people, and evolve together. Batch 2026.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "ASTITVA | GLBITM Fresher Community",
    description:
      "Astitva is GLBITM's fresher community — a space to discover who you are, connect with your people, and evolve together. Batch 2026.",
    type: "website",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${cormorantSC.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-black-950 text-white antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
