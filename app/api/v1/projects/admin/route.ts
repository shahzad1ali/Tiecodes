import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth";
import { getProjects } from "@/lib/projects";

export const runtime = "nodejs";

export async function GET() {
  if (!await getAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getProjects(false));
}
