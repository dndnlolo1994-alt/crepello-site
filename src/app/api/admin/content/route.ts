import { NextResponse } from "next/server";

import { hasAdminSession } from "@/lib/auth";
import { getSiteContent, isSiteContent, saveSiteContent } from "@/lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, content: await getSiteContent() });
}

export async function PUT(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const payload: unknown = await request.json().catch(() => null);

  if (!isSiteContent(payload)) {
    return NextResponse.json({ ok: false, message: "Invalid content shape" }, { status: 400 });
  }

  await saveSiteContent(payload);

  return NextResponse.json({ ok: true, content: payload });
}
