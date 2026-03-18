import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "de", "es"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function getLocaleFromPathname(pathname: string): SupportedLocale | null {
  const seg = pathname.split("/")[1];
  if (seg && (SUPPORTED_LOCALES as readonly string[]).includes(seg)) {
    return seg as SupportedLocale;
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const locale = getLocaleFromPathname(pathname);
  if (!locale || locale === "en") return NextResponse.next();

  const strippedPathname = pathname.replace(`/${locale}`, "") || "/";
  const url = request.nextUrl.clone();
  url.pathname = strippedPathname;
  url.search = search;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

