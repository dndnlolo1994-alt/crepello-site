import { notFound } from "next/navigation";

import { PublicPage } from "@/components/public-page";
import { getSiteContent } from "@/lib/content-store";
import type { Locale } from "@/lib/types";

export const dynamic = "force-dynamic";

const categoryMap: Record<string, string> = {
  drinks: "drinks",
  desserts: "dessert",
  bakery: "bakery",
  brunch: "brunch",
};

export async function generateStaticParams() {
  const categories = ["drinks", "desserts", "bakery", "brunch"];
  const locales = ["en", "ar"];
  const params: { locale: string; category: string }[] = [];
  
  for (const locale of locales) {
    for (const category of categories) {
      params.push({ locale, category });
    }
  }
  return params;
}

export default async function MenuCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  const menuId = categoryMap[category];

  if (!menuId) {
    notFound();
  }

  const content = await getSiteContent();

  return (
    <PublicPage
      content={content}
      menuId={menuId}
      view="menu"
      locale={locale as Locale}
    />
  );
}
