import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./constants/routes";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === ROUTES.HOME) {
    const url = req.nextUrl.clone();
    url.pathname = ROUTES.APPOINTMENTS;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.ico$|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
    "/(vi|en)/:path*",
  ],
};