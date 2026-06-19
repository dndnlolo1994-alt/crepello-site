import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { DEFAULT_LOCALE, LOCALES } from "@/lib/config";
import type { Locale } from "@/lib/types";

function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

function getLocale(request: NextRequest): string {
  // Check NEXT_LOCALE cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    if (acceptLanguage.toLowerCase().startsWith("ar")) {
      return "ar";
    }
    if (acceptLanguage.toLowerCase().startsWith("en")) {
      return "en";
    }
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static files and internal Next.js requests bypass
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json"
  ) {
    return NextResponse.next();
  }

  // Redirect /menu to /menu/drinks
  if (pathname === "/menu" || pathname === "/en/menu" || pathname === "/ar/menu") {
    const locale = pathname.startsWith("/ar") ? "ar" : pathname.startsWith("/en") ? "en" : getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}/menu/drinks`, request.url), { status: 307 });
  }

  // Old route redirects (301 Permanent Redirect)
  const redirects: Record<string, string> = {
    "/aboutus": "/about",
    "/menu-drinks": "/menu/drinks",
    "/menu-drinks-1": "/menu/desserts",
    "/menu-drinks-1-1": "/menu/bakery",
    "/menu-drinks-1-1-1": "/menu/brunch",
    "/cart": "/order",
  };

  const oldPath = Object.keys(redirects).find(
    (key) => pathname === key || pathname.startsWith(key + "/")
  );

  if (oldPath) {
    const locale = getLocale(request);
    const suffix = pathname.slice(oldPath.length);
    const newPath = redirects[oldPath] + suffix;
    
    // Set 301 Permanent Redirect
    const url = new URL(`/${locale}${newPath}`, request.url);
    return NextResponse.redirect(url, { status: 301 });
  }

  // Check if pathname has a supported locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect if there is no locale in URL
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // Return redirect to localized URL
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    "/((?!_next|api|images|.*\\..*|favicon.ico|manifest.json).*)",
  ],
};
