import { PublicPage } from "@/components/public-page";
import { getSiteContent } from "@/lib/content-store";
import type { Locale } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getSiteContent();

  return <PublicPage content={content} view="order" locale={locale as Locale} />;
}
