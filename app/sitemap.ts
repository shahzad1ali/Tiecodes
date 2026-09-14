import type { MetadataRoute } from "next";
import { solutions } from "@/lib/content";
import { insights } from "@/lib/insights";

const base = "https://tiecodes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/solutions",
    "/services",
    "/about",
    "/contact",
    "/insights",
    "/demo",
    "/engagement",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const solutionRoutes = solutions.map((s) => ({
    url: `${base}/solutions/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const insightRoutes = insights.map((p) => ({
    url: `${base}/insights/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...solutionRoutes, ...insightRoutes];
}
