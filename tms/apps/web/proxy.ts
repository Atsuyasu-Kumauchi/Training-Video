import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value;

  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, request.url));
  const rewriteTo = (path: string) =>  NextResponse.rewrite(new URL(path, request.url));

  const protect = (requiredRole: string, dashboardPath: string) => {
    if (!token) return redirectTo("/");

    if (role !== requiredRole) return redirectTo("/");

    return rewriteTo(dashboardPath);
  };

  if (pathname.startsWith("/admin")) {
    return protect("admin", "/admin/dashboard");
  }

  if (pathname.startsWith("/student")) {
    return protect("student", "/student/dashboard");
  }

  if (pathname === "/") {
    if (token) {
      if (role === "admin") return redirectTo("/admin/dashboard");
      if (role === "student") return redirectTo("/student/dashboard");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/"],
};
