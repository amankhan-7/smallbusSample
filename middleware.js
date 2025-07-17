import { NextResponse } from "next/server";

// Define protected routes that require authentication
const protectedRoutes = [
  "/account",
  "/payment",
];

export function middleware(request) {
  const { nextUrl, cookies } = request;
  const accessToken = cookies.get("accessToken")?.value;
  const refreshToken = cookies.get("refreshToken")?.value;

  const isAuthenticated = !!(accessToken || refreshToken);
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = nextUrl.pathname.startsWith("/login");

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
