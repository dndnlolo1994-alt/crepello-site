import type { Metadata, Viewport } from "next";
import {
  Amiri,
  Bodoni_Moda,
  Hanken_Grotesk,
  IBM_Plex_Sans_Arabic,
  Space_Mono,
} from "next/font/google";

import "../globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-amiri",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-arabic",
});

export const metadata: Metadata = {
  title: "Crepello Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${hanken.variable} ${bodoni.variable} ${spaceMono.variable} ${amiri.variable} ${ibmPlexArabic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
