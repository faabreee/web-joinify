import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ignore files
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value;
  const isLoginPage = pathname === "/authentication/login";

  // force login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  if (token) {
    try {
      const payload: any = jwtDecode(token);
      const expired = payload.exp * 1000 < Date.now();

      if (expired) {
        const response = NextResponse.redirect(
          new URL("/authentication/login", request.url)
        );
        response.cookies.delete("access_token");
        return response;
      }

      // if is logged in, no can open login
      if (isLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
      }

    } catch {
      return NextResponse.redirect(new URL("/authentication/login", request.url));
    }
  }

  return NextResponse.next();
}
