import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookie = req.cookies.get("token")?.value;
  // If no cookie, allow access to /login and /signup pages
  if (!cookie && (path === "/login" || path === "/signup")) {
    return NextResponse.next();
  }

  // If no cookie and not on /login or /signup, redirect to /login
  if (!cookie && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If cookie is present, redirect /login and /signup to /dashboard
  if (cookie && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/", "/signup"],
};
