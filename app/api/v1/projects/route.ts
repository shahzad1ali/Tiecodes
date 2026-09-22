import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { getProjects } from "@/lib/projects";
import { projectData, validateProjectInput } from "@/lib/project-validation";

export const runtime = "nodejs";

export async function GET() { return NextResponse.json(await getProjects(true)); }

export async function POST(request: Request) {
  if (!await getAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const validation = validateProjectInput(await request.json().catch(() => null));
  if (validation.error || !validation.data) return NextResponse.json({ error: validation.error }, { status: 400 });
  try { return NextResponse.json(await db.project.create({ data: projectData(validation.data) }), { status: 201 }); }
  catch { return NextResponse.json({ error: "Could not create project. Slug may already exist." }, { status: 409 }); }
}
