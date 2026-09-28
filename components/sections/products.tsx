"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/brand/icon";
import { HoverLift } from "@/components/motion/hover-lift";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/sections/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { solutions } from "@/lib/content";

export function ProductsSection() {
  const [featured, ...rest] = solutions;

  return (
    <section data-section="solutions" className="relative overflow-hidden py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--c-blue) 1px, transparent 1px), linear-gradient(to bottom, var(--c-blue) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow>Product platforms</SectionEyebrow>
          <SectionHeading>
            Custom web, mobile, and workflow software we design and ship
          </SectionHeading>
          <SectionLead>
            Purpose-built platforms for fleets, service businesses, booking flows,
            dashboards, and operational portals — owned by you, engineered by us.
          </SectionLead>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {featured && (
            <Reveal className="lg:col-span-3">
              <HoverLift>
                <Link
                  href={`/solutions/${featured.slug}`}
                  className="soft-card group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl p-8 sm:p-10"
                >
                  <div className="pointer-events-none absolute -right-10 top-0 size-64 rounded-full bg-[color:var(--c-cyan)]/25 blur-3xl transition-opacity group-hover:opacity-100" />
                  <div className="pointer-events-none absolute bottom-0 left-0 size-40 rounded-full bg-[color:var(--c-blue)]/15 blur-3xl" />
                  <div className="relative">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[color:var(--accent)]/15 text-[color:var(--accent)] ring-1 ring-[color:var(--accent)]/30">
                      <Icon name={featured.icon} className="size-6" />
                    </div>
                    <h3 className="mt-6 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                      {featured.title}
                    </h3>
                    <p className="text-muted mt-3 max-w-md">
                      {featured.summary}
                    </p>
                  </div>
                  <span className="accent relative mt-8 inline-flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-[color:var(--btn-hover)]">
                    Explore platform
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </HoverLift>
            </Reveal>
          )}

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {rest.map((solution) => (
              <StaggerItem key={solution.slug}>
                <HoverLift>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="panel-glass-dark group flex h-full items-start gap-4 rounded-2xl p-5 transition-[border-color,background] hover:border-[color:var(--btn-hover)]/45 hover:bg-[color:var(--c-cyan)]/8"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--accent)]/15 text-[color:var(--accent)] ring-1 ring-[color:var(--accent)]/25">
                      <Icon name={solution.icon} className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-base font-semibold transition-colors group-hover:text-[color:var(--btn-hover)]">
                        {solution.title}
                      </h3>
                      <p className="text-muted mt-1 line-clamp-2 text-sm">
                        {solution.summary}
                      </p>
                    </div>
                    <ArrowUpRight className="text-muted mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--btn-hover)]" />
                  </Link>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-10">
          <ButtonLink
            href="/solutions"
            variant="outline"
            size="lg"
            className="h-11 border-foreground/20 bg-transparent px-5 text-base text-foreground hover:bg-blue-500 hover:text-white"
          >
            View all solutions
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
