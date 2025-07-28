import { NextResponse } from "next/server";

const protectedRoutes = ["/account", "/payment", "/seat"];
const authRoutes = ["/login"];

export function middleware(request) {
  const { nextUrl, cookies } = request;

  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");


  const isAuthenticated = !!(accessToken?.value || refreshToken?.value);

  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

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
    // Only match a minimal set to reduce overhead
    "/((?!_next/static|_next/image|smallbus.ico|favicon.ico).*)",
  ],
};
