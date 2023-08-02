import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
var jwt = require("jsonwebtoken");

export default async function middleware(req) {
  if (req.nextUrl.pathname === "/") {
    const accesstoken = req.cookies.get("accesstoken");
    // console.log(accesstoken.value);
    try {
      const payload = await jwtVerify(
        accesstoken.value,
        new TextEncoder().encode(process.env.ACCESS_SECRET)
      );
      const username = payload.payload.username;
      if (username) {
        // req.nextUrl.pathname = "/chat";
        // return NextResponse.redirect(req.nextUrl);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
