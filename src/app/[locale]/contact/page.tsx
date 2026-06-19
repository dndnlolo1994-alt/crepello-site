import { PublicPage } from "@/components/public-page";
import { getSiteContent } from "@/lib/content-store";
import type { Locale } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getSiteContent();

  return <PublicPage content={content} view="contact" locale={locale as Locale} />;
}
