import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { saveUpload } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!await getAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) return NextResponse.json({ error: "An image file is required." }, { status: 400 });
  const max = Number(process.env.MAX_UPLOAD_BYTES ?? 5242880);
  if (file.size > max) return NextResponse.json({ error: "Image is too large." }, { status: 413 });
  const projectId = (await context.params).id;
  if (!await db.project.findUnique({ where: { id: projectId } })) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  const saved = await saveUpload(file);
  return NextResponse.json(await db.projectImage.create({ data: { projectId, ...saved, alt: file.name } }), { status: 201 });
}
