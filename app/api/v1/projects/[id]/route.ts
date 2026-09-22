import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { getProject } from "@/lib/projects";
import { projectData, validateProjectInput } from "@/lib/project-validation";

export const runtime = "nodejs";
type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const project = await getProject((await context.params).id, true);
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(request: Request, context: Context) {
  if (!await getAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const validation = validateProjectInput(await request.json().catch(() => null), true);
  if (validation.error || !validation.data) return NextResponse.json({ error: validation.error }, { status: 400 });
  try { return NextResponse.json(await db.project.update({ where: { id: (await context.params).id }, data: projectData(validation.data) })); }
  catch { return NextResponse.json({ error: "Project not found or slug already exists." }, { status: 404 }); }
}

export async function DELETE(_request: Request, context: Context) {
  if (!await getAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { await db.project.delete({ where: { id: (await context.params).id } }); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Project not found." }, { status: 404 }); }
}
