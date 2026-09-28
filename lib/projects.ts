import { ProjectStatus, Prisma } from "@prisma/client";
import { db } from "@/lib/db";

export type ProjectImage = {
  id: string;
  url: string;
  alt: string | null;
  width: number | null;
  height: number | null;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  clientName: string | null;
  industry: string | null;
  technologies: string[] | null;
  liveUrl: string | null;
  sourceUrl: string | null;
  status: ProjectStatus;
  featured: boolean;
  sortOrder: number;
  images: ProjectImage[];
};

const include = { images: { orderBy: { sortOrder: "asc" as const } } };

function normalize<T extends { technologies: unknown }>(
  project: T
): Omit<T, "technologies"> & { technologies: string[] | null } {
  return {
    ...project,
    technologies: Array.isArray(project.technologies)
      ? project.technologies.filter((item): item is string => typeof item === "string")
      : null,
  };
}

export async function getProjects(publicOnly = true) {
  const projects = await db.project.findMany({
    where: publicOnly ? { status: ProjectStatus.PUBLISHED } : undefined,
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    include,
  });
  return projects.map(normalize);
}

export async function getProject(slug: string, publicOnly = true) {
  const project = await db.project.findFirst({
    where: {
      slug,
      ...(publicOnly ? { status: ProjectStatus.PUBLISHED } : {}),
    },
    include,
  });
  return project ? normalize(project) : null;
}

export async function getProjectById(id: string) {
  const project = await db.project.findUnique({ where: { id }, include });
  return project ? normalize(project) : null;
}

export type AdminProjectsQuery = {
  q?: string;
  page?: number;
  pageSize?: number;
};

export async function getAdminProjects(query: AdminProjectsQuery = {}) {
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.min(50, Math.max(1, query.pageSize ?? 10));
  const q = query.q?.trim() ?? "";

  const where: Prisma.ProjectWhereInput = q
    ? {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
          { summary: { contains: q } },
          { slug: { contains: q } },
        ],
      }
    : {};

  const [total, rows] = await Promise.all([
    db.project.count({ where }),
    db.project.findMany({
      where,
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
      include,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return {
    items: rows.map(normalize),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
