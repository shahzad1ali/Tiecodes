import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { adminCookie, adminCookieOptions, createAdminToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`login:${address}`, 10, 15 * 60 * 1000)) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  const body = await request.json().catch(() => null) as { email?: string; password?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  if (!email || !body?.password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  const user = await db.adminUser.findUnique({ where: { email } });
  if (!user || !user.isActive || !(await bcrypt.compare(body.password, user.passwordHash))) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  const response = NextResponse.json({ user: { id: user.id, email: user.email } });
  response.cookies.set(adminCookie, createAdminToken(user.id, user.email), adminCookieOptions);
  return response;
}
