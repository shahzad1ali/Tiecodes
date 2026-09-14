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
    <section className="surface-slate relative overflow-hidden py-20 text-navy-foreground md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow>Product platforms</SectionEyebrow>
          <SectionHeading className="text-navy-foreground">
            Logistics software we design and ship
          </SectionHeading>
          <SectionLead className="text-navy-foreground/65">
            Purpose-built platforms for fleets, drivers, brokers, and mobility —
            owned by you, engineered by us.
          </SectionLead>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {featured && (
            <Reveal className="lg:col-span-3">
              <HoverLift>
                <Link
                  href={`/solutions/${featured.slug}`}
                  className="group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-[#1f3b6d] via-[#2c5aa5] to-[#1e293b] p-8 sm:p-10"
                >
                  <div className="pointer-events-none absolute -right-10 top-0 size-64 rounded-full bg-primary/25 blur-3xl transition-opacity group-hover:opacity-100" />
                  <div className="pointer-events-none absolute bottom-0 left-0 size-40 rounded-full bg-accent/15 blur-3xl" />
                  <div className="relative">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/30">
                      <Icon name={featured.icon} className="size-6" />
                    </div>
                    <h3 className="mt-6 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                      {featured.title}
                    </h3>
                    <p className="mt-3 max-w-md text-navy-foreground/70">
                      {featured.summary}
                    </p>
                  </div>
                  <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
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
                    className="panel-glass-dark group flex h-full items-start gap-4 rounded-2xl p-5 transition-[border-color,background] hover:border-primary/45 hover:bg-[rgb(46_183_229_/_0.08)]"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25">
                      <Icon name={solution.icon} className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-base font-semibold text-navy-foreground group-hover:text-primary">
                        {solution.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-navy-foreground/60">
                        {solution.summary}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-navy-foreground/45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
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
            className="h-11 border-primary/35 bg-primary/10 px-5 text-primary hover:bg-primary/20 hover:text-primary"
          >
            View all solutions
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
