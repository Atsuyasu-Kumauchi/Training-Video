import { NextRequest, NextResponse } from "next/server";

export function isAuthenticated(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return true;
}

export function isRole(request: NextRequest) {
    const role = request.cookies.get("role")?.value;
    if (!role) {
        return false
    }
    return true;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value;

  const redirectTo = (path: string) =>
    NextResponse.redirect(new URL(path, request.url));

  const rewriteTo = (path: string) =>
    NextResponse.rewrite(new URL(path, request.url));

  // ---- 🔒 Route Protection Helper ----
  const protect = (requiredRole: string, dashboardPath: string) => {
    if (!token) return redirectTo("/");

    if (role !== requiredRole) return redirectTo("/");

    return rewriteTo(dashboardPath);
  };

  // ---- 🔒 Admin Area ----
  if (pathname.startsWith("/admin")) {
    return protect("admin", "/admin/dashboard");
  }

  // ---- 🔒 Student Area ----
  if (pathname.startsWith("/student")) {
    return protect("student", "/student/dashboard");
  }

  // ---- 🔒 Root '/' page redirects (if logged in) ----
  if (pathname === "/") {
    if (token) {
      if (role === "admin") return redirectTo("/admin/dashboard");
      if (role === "student") return redirectTo("/student/dashboard");
    }
  }

  // No changes → continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/"],
};
