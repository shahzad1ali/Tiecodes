import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { HoverLift } from "@/components/motion/hover-lift";
import { CtaBand } from "@/components/sections/cta-band";
import { company } from "@/lib/content";
import { insights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description: `Logistics tech insights from ${company.name} — GPS, load boards, and practical AI.`,
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes from building logistics software"
        description="Short articles on fleet tracking, load boards, and AI that operators can use."
      />
      <section className="surface-mist py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Stagger className="grid gap-5 md:grid-cols-3">
            {insights.map((post) => (
              <StaggerItem key={post.slug}>
                <HoverLift>
                  <Link
                    href={`/insights/${post.slug}`}
                    className="panel-glass group flex h-full flex-col rounded-2xl p-6"
                  >
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                    <h2 className="mt-3 font-heading text-xl font-semibold tracking-tight group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
