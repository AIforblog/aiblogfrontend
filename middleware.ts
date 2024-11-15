import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authConfig } from "@/config/auth.config";
import { assertUserAuthenticated } from "@/lib/auth";

// Define public routes that don't require authentication
const publicRoutes = [
  authConfig.routes.signIn,
  authConfig.routes.signUp,
  "/auth/forgot-password",
  "/auth/update-password",
  "/auth/otp-verification",
  "/explore",
  "/explore/[id]/page.tsx",
  "/jobs",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  try {
    // Check if the user is authenticated
    await assertUserAuthenticated();

    // Authenticated user, allow access to all routes
    return NextResponse.next();
  } catch {
    // User is not authenticated
    const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

    if (path === "/") {
      return NextResponse.redirect(new URL("/explore", request.url));
    }

    // Allow access to public routes without authentication
    if (isPublicRoute) {
      // // If the path is the homepage ("/"), redirect to the "/explore" page
      // if (path === "/") {
      //   return NextResponse.redirect(new URL("/explore", request.url));
      // }
      return NextResponse.next();
    }

    // Redirect unauthenticated users to the sign-in page
    return NextResponse.redirect(
      new URL(authConfig.routes.signIn, request.url)
    );
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
};
