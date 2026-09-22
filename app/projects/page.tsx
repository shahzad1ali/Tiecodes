import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { getProjects, type Project } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects", description: "Selected software projects built by TieCodes." };

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    projects = await getProjects();
  } catch {
    projects = [];
  }
  return <>
    <PageHero eyebrow="Portfolio" title="Software that moves operations forward" description="Selected platforms, dashboards, and mobile products built by TieCodes." />
    <section className="surface-mist py-16 md:py-20"><div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-2">
      {projects.map((project) => <Link key={project.id} href={`/projects/${project.slug}`} className="panel-glass group rounded-2xl p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">{project.industry ?? "Product engineering"}</p>
        <h2 className="mt-3 font-heading text-2xl font-semibold group-hover:text-primary">{project.title}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">{project.technologies?.map((technology) => <span key={technology} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">{technology}</span>)}</div>
      </Link>)}
    </div></section><CtaBand />
  </>;
}