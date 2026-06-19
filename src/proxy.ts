import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { DEFAULT_LOCALE, LOCALES } from "@/lib/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json"
  ) {
    return NextResponse.next();
  }

  if (pathname === "/menu" || pathname === "/en/menu" || pathname === "/ar/menu") {
    const locale = pathname.startsWith("/ar") ? "ar" : pathname.startsWith("/en") ? "en" : DEFAULT_LOCALE;
    return NextResponse.redirect(new URL(`/${locale}/menu/drinks`, request.url), { status: 307 });
  }

  const redirects: Record<string, string> = {
    "/aboutus": "/about",
    "/menu-drinks": "/menu/drinks",
    "/menu-drinks-1": "/menu/desserts",
    "/menu-drinks-1-1": "/menu/bakery",
    "/menu-drinks-1-1-1": "/menu/brunch",
    "/cart": "/order",
  };

  const oldPath = Object.keys(redirects).find(
    (key) => pathname === key || pathname.startsWith(`${key}/`)
  );

  if (oldPath) {
    const suffix = pathname.slice(oldPath.length);
    const newPath = redirects[oldPath] + suffix;
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${newPath}`, request.url), { status: 301 });
  }

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next|api|images|.*\\..*|favicon.ico|manifest.json).*)",
  ],
};
