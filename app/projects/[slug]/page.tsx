import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { ButtonLink } from "@/components/ui/button-link";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const project = await getProject((await params).slug);
    return project ? { title: project.title, description: project.summary } : { title: "Project" };
  }
  catch { return { title: "Project" }; }
}

export default async function ProjectDetailPage({ params }: Props) {
  let project;
  try { project = await getProject((await params).slug); } catch { notFound(); }
  if (!project) notFound();
  return <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
    <Link href="/projects" className="text-sm text-primary">Back to projects</Link>
    <p className="mt-12 text-xs uppercase tracking-[0.18em] text-primary">{project.industry ?? "Product engineering"}</p>
    <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight md:text-6xl">{project.title}</h1>
    <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{project.summary}</p>
    <div className="mt-10 whitespace-pre-wrap text-base leading-8 text-foreground/80">{project.description}</div>
    {project.technologies?.length ? <div className="mt-10 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{technology}</span>)}</div> : null}
    {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="mt-10 inline-block text-sm font-medium text-primary">Visit project</a> : null}
    <div className="mt-12"><ButtonLink href="/contact" size="lg">Discuss a similar project</ButtonLink></div>
  </main>;
}