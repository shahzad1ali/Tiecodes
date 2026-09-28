import type { Prisma } from "@prisma/client";

export type ProjectInput = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  clientName?: string;
  industry?: string;
  technologies?: string[];
  liveUrl?: string;
  sourceUrl?: string;
  status?: "DRAFT" | "PUBLISHED";
  featured?: boolean;
  sortOrder?: number;
};

export const REQUIRED_PROJECT_FIELDS = [
  "title",
  "slug",
  "summary",
  "description",
  "liveUrl",
] as const;

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateProjectInput(
  value: unknown,
  partial = false
): { data?: ProjectInput; error?: string; fieldErrors?: Record<string, string> } {
  if (!value || typeof value !== "object") {
    return { error: "A JSON object is required." };
  }

  const input = value as Record<string, unknown>;
  const fieldErrors: Record<string, string> = {};

  if (!partial) {
    for (const key of REQUIRED_PROJECT_FIELDS) {
      if (!isNonEmptyString(input[key])) {
        fieldErrors[key] = "This field is required.";
      }
    }
  } else {
    for (const key of REQUIRED_PROJECT_FIELDS) {
      if (input[key] !== undefined && !isNonEmptyString(input[key])) {
        fieldErrors[key] = "This field is required.";
      }
    }
  }

  for (const key of ["title", "slug", "summary", "description", "clientName", "industry", "liveUrl", "sourceUrl"]) {
    if (input[key] !== undefined && typeof input[key] !== "string") {
      fieldErrors[key] = `${key} must be text.`;
    }
  }

  if (isNonEmptyString(input.liveUrl) && !isValidUrl((input.liveUrl as string).trim())) {
    fieldErrors.liveUrl = "Enter a valid URL starting with http:// or https://";
  }

  if (
    input.technologies !== undefined &&
    (!Array.isArray(input.technologies) ||
      input.technologies.some((item) => typeof item !== "string"))
  ) {
    return { error: "Technologies must be an array of text values.", fieldErrors };
  }

  if (input.status !== undefined && input.status !== "DRAFT" && input.status !== "PUBLISHED") {
    fieldErrors.status = "Status must be DRAFT or PUBLISHED.";
  }

  if (input.featured !== undefined && typeof input.featured !== "boolean") {
    fieldErrors.featured = "Featured must be boolean.";
  }

  if (
    input.sortOrder !== undefined &&
    (!Number.isInteger(input.sortOrder) || (input.sortOrder as number) < 0)
  ) {
    fieldErrors.sortOrder = "Sort order must be a non-negative integer.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      error: "Please fill all required fields correctly.",
      fieldErrors,
    };
  }

  const data: ProjectInput = {
    ...(input as ProjectInput),
  };

  if (typeof data.title === "string") data.title = data.title.trim();
  if (typeof data.slug === "string") data.slug = data.slug.trim();
  if (typeof data.summary === "string") data.summary = data.summary.trim();
  if (typeof data.description === "string") data.description = data.description.trim();
  if (typeof data.liveUrl === "string") data.liveUrl = data.liveUrl.trim();
  if (typeof data.clientName === "string") data.clientName = data.clientName.trim();
  if (typeof data.industry === "string") data.industry = data.industry.trim();

  return { data };
}

export function projectData(data: ProjectInput): Prisma.ProjectUncheckedCreateInput {
  const { technologies, ...rest } = data;
  return {
    ...rest,
    ...(technologies === undefined ? {} : { technologies }),
  } as Prisma.ProjectUncheckedCreateInput;
}
