"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/sections/section-heading";
import { processSteps } from "@/lib/content";

export function ProcessSection() {
  return (
    <section className="surface-dawn relative overflow-hidden py-20 md:py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow>How we deliver</SectionEyebrow>
          <SectionHeading>From idea to production software</SectionHeading>
          <SectionLead>
            A clear engagement model used by software houses that ship — not
            endless workshops without a release.
          </SectionLead>
        </Reveal>

        <Stagger className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="pointer-events-none absolute top-6 right-4 left-4 hidden h-0.5 rounded-full bg-gradient-to-r from-accent/20 via-primary/50 to-primary/20 lg:block"
            aria-hidden
          />
          {processSteps.map((step, index) => (
            <StaggerItem key={step.step}>
              <div className="panel-accent relative h-full rounded-2xl p-5">
                <span
                  className={`relative z-10 inline-flex size-12 items-center justify-center rounded-full font-heading text-sm font-bold shadow-[0_0_0_6px_rgb(248_250_252)] ${
                    index === 0
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary/10 text-primary ring-1 ring-primary/20"
                  }`}
                >
                  {step.step}
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
