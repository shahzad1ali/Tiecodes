import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export const adminCookie = "tiecodes_admin";

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value && process.env.NODE_ENV === "production") throw new Error("AUTH_SECRET is required in production.");
  return value ?? "development-only-secret";
}

function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }

export function createAdminToken(id: string, email: string) {
  const payload = Buffer.from(JSON.stringify({ sub: id, email, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export async function getAdmin() {
  const token = (await cookies()).get(adminCookie)?.value;
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = Buffer.from(sign(payload), "base64url");
  const received = Buffer.from(signature, "base64url");
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { sub: string; exp: number };
    if (data.exp < Date.now()) return null;
    return db.adminUser.findFirst({ where: { id: data.sub, isActive: true } });
  } catch { return null; }
}

export async function requireAdmin() {
  const user = await getAdmin();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export const adminCookieOptions = { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 8 * 60 * 60 };