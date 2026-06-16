import { PublicPage } from "@/components/public-page";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function BrunchPage() {
  const content = await getSiteContent();

  return <PublicPage content={content} menuId="brunch" view="menu" />;
}
