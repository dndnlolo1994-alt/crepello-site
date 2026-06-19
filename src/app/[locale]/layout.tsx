import type { Metadata, Viewport } from "next";
import {
  Amiri,
  Bodoni_Moda,
  Hanken_Grotesk,
  IBM_Plex_Sans_Arabic,
  Space_Mono,
} from "next/font/google";

import { getSiteContent } from "@/lib/content-store";
import { LOCALES } from "@/lib/config";
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

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getSiteContent();
  const desc = locale === "ar" ? content.seo.description.ar : content.seo.description.en;

  return {
    title: {
      template: `%s | ${content.brand.name}`,
      default: content.brand.name,
    },
    description: desc,
    metadataBase: new URL(content.seo.canonical),
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "Crepello",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      title: content.brand.name,
      description: desc,
      url: `${content.seo.canonical}/${locale}`,
      siteName: content.brand.name,
      type: "website",
      images: [
        {
          url: content.brand.logo.src,
          alt: locale === "ar" ? content.brand.logo.alt.ar : content.brand.logo.alt.en,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: content.brand.name,
      description: desc,
      images: [content.brand.logo.src],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${hanken.variable} ${bodoni.variable} ${spaceMono.variable} ${amiri.variable} ${ibmPlexArabic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
