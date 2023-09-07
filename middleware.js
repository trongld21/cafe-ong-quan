// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/admin", "/admin/nhap-thu-chi"];
  const adminPaths = ["/admin/thu-chi", "/admin/nhan-vien", 'admin/nhan-vien/tao-tai-khoan'];
  const isPathProtected = protectedPaths?.some((path) => pathname == path);
  const isAdminPath = adminPaths?.some((path) => pathname == path);
  const res = NextResponse.next();
  const token = await getToken({
    req: req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });
  if (isAdminPath) {
    if (!token) {
      const url = new URL(`/auth/sign-in`, req.url);
      return NextResponse.redirect(url);
    } else {
      if (token.user.role !== "Admin") {
        const url = new URL(`/`, req.url);
        return NextResponse.redirect(url);
      }
    }
  }
  if (isPathProtected) {
    if (!token) {
      const url = new URL(`/auth/sign-in`, req.url);
      return NextResponse.redirect(url);
    } else {
      if (token.user.role === "Thu Ngân" || token.user.role === "Admin") {
      } else {
        const url = new URL(`/`, req.url);
        return NextResponse.redirect(url);
      }
    }
  }
  return res;
}
