import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const contentTypes: Record<string, string> = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };

export async function GET(_request: Request, context: { params: Promise<{ path: string[] }> }) {
  const parts = await context.params;
  const filename = parts.path.join("/");
  if (filename.includes("..") || filename.includes("\\")) return NextResponse.json({ error: "Invalid path." }, { status: 400 });
  try {
    const file = await readFile(join(process.cwd(), /* turbopackIgnore: true */ process.env.UPLOAD_DIR ?? "uploads", filename));
    const extension = filename.split(".").pop()?.toLowerCase() ?? "";
    return new NextResponse(file, { headers: { "Content-Type": contentTypes[extension] ?? "application/octet-stream", "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch { return NextResponse.json({ error: "File not found." }, { status: 404 }); }
}