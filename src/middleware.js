import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
var jwt = require("jsonwebtoken");
export default async function middleware(req) {
  if (req.nextUrl.pathname === "/chat") {
    const response = NextResponse.next();
    response.cookies.set("vercel", "fast");
    response.cookies.set({
      name: "vercel",
      value: "fast",
      path: "/",
    });
    console.log(response.cookies.get("accesstoken"));
    return response;
  }
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
        console.log(username);
        req.nextUrl.pathname = "/chat";
        return NextResponse.redirect(req.nextUrl);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
