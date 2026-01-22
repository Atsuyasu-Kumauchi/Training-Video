import { NextRequest, NextResponse } from "next/server";
import { decodeJwtEdge, deleteAuthToken } from "./tmsui";

// -----------------
const PUBLIC_ROUTES = [
  "/",
  "/admin/login",
  "/forgot-password",
  "/reset-password",
  "/totp-qr",
];

const ADMIN_ROUTES = [
  "/admin/dashboard",
  "/admin/users",
  "/admin/tags",
  "/admin/video-list",
  "/admin/training-list",
  "/admin/create-test",
  "/admin/assignment-list",
  "/admin/assignment-review",
  "/admin/departments",
  "/admin/roles",
  "/admin/change-password",
];

const STUDENT_ROUTES = [
  "/student/dashboard",
  "/student/my-trainings",
  "/student/training-videos",
  "/student/results",
  "/student/change-password",
];

const CHANGE_PASSWORD_ROUTES_ADMIN = "/admin/change-password";
const CHANGE_PASSWORD_ROUTES_STUDENT = "/student/change-password";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get("tms_token")?.value;
  const otpStep = request.cookies.get("tms_step")?.value === "2";
  const otpStep1 = request.cookies.get("tms_step")?.value === "1";
  const payload = token ? await decodeJwtEdge<{ isAdmin: boolean, resetPwd: boolean, exp: number }>(token) : null;
  const isAdmin = payload?.isAdmin === true;
  const isResetPwd = payload?.resetPwd === true;
  const isExpired = payload?.exp as number;
  if (isExpired < Date.now() / 1000) {
    await deleteAuthToken("tms_token");
    await deleteAuthToken("tms_step");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Route matching
  const isPublicRoute = PUBLIC_ROUTES.some((route) => {
    if (route === "/") return pathname === "/";
    return pathname === route || pathname.startsWith(route + "/");
  });

  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));
  const isStudentRoute = STUDENT_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));
  const isAdminChangePasswordRoute = pathname === CHANGE_PASSWORD_ROUTES_ADMIN || pathname.startsWith(CHANGE_PASSWORD_ROUTES_ADMIN + "/");
  const isStudentChangePasswordRoute = pathname === CHANGE_PASSWORD_ROUTES_STUDENT || pathname.startsWith(CHANGE_PASSWORD_ROUTES_STUDENT + "/");
  const isProtectedRoute = isAdminRoute || isStudentRoute || isAdminChangePasswordRoute || isStudentChangePasswordRoute;

  //  Protected route access
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!otpStep) {
      return NextResponse.redirect(new URL("/totp-qr", request.url));
    }

    // Role restriction for admin and student
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }

    if (isStudentRoute && isAdmin) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (isResetPwd) {
      if (isAdmin && !isAdminChangePasswordRoute) {
        return NextResponse.redirect(new URL(CHANGE_PASSWORD_ROUTES_ADMIN, request.url));
      }

      if (!isAdmin && !isStudentChangePasswordRoute) {
        return NextResponse.redirect(new URL(CHANGE_PASSWORD_ROUTES_STUDENT, request.url));
      }
    }

    return NextResponse.next();
  }

  // Public route restriction
  if (pathname === "/totp-qr" && !otpStep1) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPublicRoute && token && otpStep) {
    return NextResponse.redirect(new URL(isAdmin ? "/admin/dashboard" : "/student/dashboard", request.url));
  }

  return NextResponse.next();
}

// -----------------
export const config = {
  matcher: [
    "/",
    "/admin/login",
    "/admin/:path*",
    "/student/:path*",
    "/forgot-password",
    "/reset-password",
    "/totp-qr",
  ],
};
