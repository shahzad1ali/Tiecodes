import type { Prisma } from "@prisma/client";

export type ProjectInput = {
  title: string; slug: string; summary: string; description: string;
  clientName?: string; industry?: string; technologies?: string[];
  liveUrl?: string; sourceUrl?: string; status?: "DRAFT" | "PUBLISHED";
  featured?: boolean; sortOrder?: number;
};

export function validateProjectInput(value: unknown, partial = false): { data?: ProjectInput; error?: string } {
  if (!value || typeof value !== "object") return { error: "A JSON object is required." };
  const input = value as Record<string, unknown>;
  if (!partial && ["title", "slug", "summary", "description"].some((key) => typeof input[key] !== "string" || !(input[key] as string).trim())) return { error: "Title, slug, summary, and description are required." };
  for (const key of ["title", "slug", "summary", "description", "clientName", "industry"]) if (input[key] !== undefined && typeof input[key] !== "string") return { error: `${key} must be text.` };
  if (input.technologies !== undefined && (!Array.isArray(input.technologies) || input.technologies.some((item) => typeof item !== "string"))) return { error: "Technologies must be an array of text values." };
  if (input.status !== undefined && input.status !== "DRAFT" && input.status !== "PUBLISHED") return { error: "Status must be DRAFT or PUBLISHED." };
  if (input.featured !== undefined && typeof input.featured !== "boolean") return { error: "Featured must be boolean." };
  if (input.sortOrder !== undefined && (!Number.isInteger(input.sortOrder) || (input.sortOrder as number) < 0)) return { error: "Sort order must be a non-negative integer." };
  return { data: input as ProjectInput };
}

export function projectData(data: ProjectInput): Prisma.ProjectUncheckedCreateInput {
  const { technologies, ...rest } = data;
  return { ...rest, ...(technologies === undefined ? {} : { technologies }) } as Prisma.ProjectUncheckedCreateInput;
}
