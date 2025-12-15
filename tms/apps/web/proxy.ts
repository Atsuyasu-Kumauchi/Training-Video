import { NextRequest, NextResponse } from "next/server";

export function parseJwt(token: string) {
  const payload = token?.split(".")[1];
  const decoded = atob(payload);
  return JSON.parse(decoded);
}

export function proxy(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // const token = request.cookies.get("tms_token")?.value;
  // const isAdmin: boolean | null = token ? parseJwt(token)?.isAdmin : null;
  // const redirectTo = (path: string) => NextResponse.redirect(new URL(path, request.url));

  // const protect = (requiredRole: boolean) => {
  //   if (!token) return redirectTo("/");
  //   if (isAdmin === requiredRole) return NextResponse.next();
  //   if (isAdmin === true) return redirectTo("/admin/dashboard");
  //   if (isAdmin === false) return redirectTo("/student/dashboard");
  // };

  // if (pathname.startsWith("/admin")) {
  //   return protect(true); // allow only admin
  // }

  // if (pathname.startsWith("/student")) {
  //   return protect(false); // allow only student
  // }

  // if (pathname === "/") {
  //   if (token) {
  //     if (isAdmin) return redirectTo("/admin/dashboard");
  //     if (isAdmin === false) return redirectTo("/student/dashboard");
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/"],
};
