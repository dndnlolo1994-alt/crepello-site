import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

const cookieName = "crepello_admin_session";
const sessionTtlMs = 1000 * 60 * 60 * 8;

export function getAdminPassword(): string {
  return process.env.CREPELLO_ADMIN_PASSWORD ?? "crepello-admin";
}

export function getAdminUsername(): string {
  return process.env.CREPELLO_ADMIN_USERNAME ?? "admin";
}

function getSessionSecret(): string {
  return process.env.CREPELLO_SESSION_SECRET ?? "local-crepello-session-secret";
}

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + sessionTtlMs;
  const payload = String(expiresAt);

  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return false;
  }

  const expiresAt = Number(payload);

  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return false;
  }

  const expected = sign(payload);
  const actualBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();

  return verifySessionToken(cookieStore.get(cookieName)?.value);
}

export const adminCookie = {
  name: cookieName,
  maxAge: sessionTtlMs / 1000,
};
