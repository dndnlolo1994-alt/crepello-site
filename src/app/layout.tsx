import type { Metadata, Viewport } from "next";
import { Inter, Noto_Naskh_Arabic, Playfair_Display } from "next/font/google";

import { defaultSiteContent } from "@/lib/default-content";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: defaultSiteContent.seo.title,
  description: defaultSiteContent.seo.description.en,
  metadataBase: new URL(defaultSiteContent.seo.canonical),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Crepello",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultSiteContent.seo.title,
    description: defaultSiteContent.seo.description.en,
    url: defaultSiteContent.seo.canonical,
    siteName: defaultSiteContent.brand.name,
    type: "website",
    images: [
      {
        url: defaultSiteContent.brand.logo.src,
        alt: defaultSiteContent.brand.logo.alt.en,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: defaultSiteContent.seo.title,
    description: defaultSiteContent.seo.description.en,
    images: [defaultSiteContent.brand.logo.src],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${notoNaskhArabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
