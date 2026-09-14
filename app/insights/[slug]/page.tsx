import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { getInsight, insights } from "@/lib/insights";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow="Insights" title={post.title} description={post.excerpt} />
      <article className="surface-mist py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <p className="text-sm text-muted-foreground">
              {post.date} · {post.tags.join(" · ")}
            </p>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              {post.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="lg" className="h-11 px-5">
                Discuss a project
              </ButtonLink>
              <Link href="/insights" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                ← All insights
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
