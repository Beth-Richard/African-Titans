import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy — enforces authentication on protected routes
 * and role-based access control on admin API endpoints.
 
 * NOTE: proxy runs on the Edge runtime and cannot access the DB
 * directly. Admin role verification is done in the API route handlers
 * themselves (see lib/auth.ts helper). This proxy provides an
 * initial gate by checking for a valid session cookie.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionUserId = request.cookies.get("session_user_id")?.value;

  // Block unauthenticated access to protected API routes
  if (
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/saved-jobs") ||
    pathname.startsWith("/api/profile")
  ) {
    if (!sessionUserId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/api/saved-jobs/:path*",
    "/api/profile/:path*",
  ],
};
