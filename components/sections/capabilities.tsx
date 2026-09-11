"use client";

import { Icon } from "@/components/brand/icon";
import { HoverLift } from "@/components/motion/hover-lift";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/sections/section-heading";
import { capabilities } from "@/lib/content";

export function CapabilitiesSection() {
  return (
    <section className="surface-mist relative overflow-hidden py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow>Software house</SectionEyebrow>
          <SectionHeading>
            Engineering products that keep businesses moving
          </SectionHeading>
          <SectionLead>
            TieCodes is a software development company specializing in custom
            platforms for fleet, logistics, and operations — from discovery to
            launch.
          </SectionLead>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {capabilities.map((item) => (
            <StaggerItem key={item.title}>
              <HoverLift>
                <div className="panel-glass group relative h-full overflow-hidden rounded-2xl p-6 transition-[border-color,box-shadow] hover:border-primary/45 hover:shadow-[0_22px_50px_-30px_rgb(46_183_229_/_0.55)]">
                  <div className="absolute -right-8 -top-8 size-24 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="icon-well relative flex size-12 items-center justify-center rounded-xl">
                    <Icon name={item.icon} className="size-5" />
                  </div>
                  <h3 className="relative mt-5 font-heading text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
