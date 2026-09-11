"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/sections/section-heading";
import { techStack } from "@/lib/content";

export function TechStackSection() {
  return (
    <section className="surface-ink relative overflow-hidden py-20 text-navy-foreground md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #2eb7e5 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow>Engineering</SectionEyebrow>
          <SectionHeading className="text-navy-foreground">
            The stack behind reliable platforms
          </SectionHeading>
          <SectionLead className="text-navy-foreground/65">
            Modern web, mobile, and GPS tooling — chosen to ship fast and scale
            with your operations.
          </SectionLead>
        </Reveal>

        <Stagger className="mt-12 flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <StaggerItem key={tech}>
              <span className="chip-glow inline-flex rounded-full px-4 py-2.5 text-sm font-medium text-navy-foreground/95 transition-all hover:border-primary/60 hover:bg-primary/20 hover:text-primary">
                {tech}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
