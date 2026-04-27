import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, type AppRole } from "@/lib/auth/constants";
import { readSessionToken } from "@/lib/auth/token";
import { canAccessPath } from "@/lib/rbac";

async function readRole(request: NextRequest): Promise<AppRole | null> {
  const raw = request.cookies.get(SESSION_COOKIE)?.value;
  if (!raw) {
    return null;
  }

  const session = await readSessionToken(raw);
  return session?.role ?? null;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtected = ["/patient", "/admin", "/doctor", "/reception", "/optical"].some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const role = await readRole(request);

  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!canAccessPath(role, pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/patient/:path*", "/admin/:path*", "/doctor/:path*", "/reception/:path*", "/optical/:path*"]
};
