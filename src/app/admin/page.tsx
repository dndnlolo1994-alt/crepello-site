import { AdminDashboard } from "@/components/admin-dashboard";
import { AdminLogin } from "@/components/admin-login";
import { hasAdminSession } from "@/lib/auth";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [content, signedIn] = await Promise.all([getSiteContent(), hasAdminSession()]);

  if (!signedIn) {
    return <AdminLogin content={content} />;
  }

  return <AdminDashboard initialContent={content} />;
}
