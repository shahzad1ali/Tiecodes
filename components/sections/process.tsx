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
    <section data-section="process" className="relative overflow-hidden py-20 md:py-24">
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
            className="pointer-events-none absolute top-6 right-4 left-4 hidden h-0.5 rounded-full bg-gradient-to-r from-[color:var(--accent)]/20 via-[color:var(--primary)]/50 to-[color:var(--primary)]/20 lg:block"
            aria-hidden
          />
          {processSteps.map((step, index) => (
            <StaggerItem key={step.step}>
              <div className="card relative h-full p-5">
                <span
                  className={`relative z-10 inline-flex size-12 items-center justify-center rounded-full font-heading text-sm font-bold shadow-[0_0_0_6px_color-mix(in_srgb,var(--c-blue-dark)_85%,transparent)] ${
                    index === 0
                      ? "bg-[color:var(--accent)] text-[color:var(--btn-fg)]"
                      : "bg-[color:var(--primary)]/15 text-[color:var(--primary)] ring-1 ring-[color:var(--primary)]/30"
                  }`}
                >
                  {step.step}
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">
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
