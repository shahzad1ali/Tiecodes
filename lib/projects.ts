import { ProjectStatus } from "@prisma/client";
import { db } from "@/lib/db";

export type ProjectImage = { id: string; url: string; alt: string | null; width: number | null; height: number | null };
export type Project = {
  id: string; slug: string; title: string; summary: string; description: string;
  clientName: string | null; industry: string | null; technologies: string[] | null;
  liveUrl: string | null; sourceUrl: string | null; featured: boolean; images: ProjectImage[];
};

const include = { images: { orderBy: { sortOrder: "asc" as const } } };

function normalize<T extends { technologies: unknown }>(project: T): Omit<T, "technologies"> & { technologies: string[] | null } {
  return { ...project, technologies: Array.isArray(project.technologies) ? project.technologies.filter((item): item is string => typeof item === "string") : null };
}

export async function getProjects(publicOnly = true) {
  const projects = await db.project.findMany({ where: publicOnly ? { status: ProjectStatus.PUBLISHED } : undefined, orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }], include });
  return projects.map(normalize);
}

export async function getProject(slug: string, publicOnly = true) {
  const project = await db.project.findFirst({ where: { slug, ...(publicOnly ? { status: ProjectStatus.PUBLISHED } : {}) }, include });
  return project ? normalize(project) : null;
}
