import { NextResponse } from "next/server";

import { adminCookie, createSessionToken, getAdminPassword } from "@/lib/auth";

type LoginPayload = {
  password?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as LoginPayload;

  if (payload.password !== getAdminPassword()) {
    return NextResponse.json({ ok: false, message: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie.name, createSessionToken(), {
    httpOnly: true,
    maxAge: adminCookie.maxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
