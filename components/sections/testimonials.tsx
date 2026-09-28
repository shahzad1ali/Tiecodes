"use client";

import { Quote } from "lucide-react";
import { HoverLift } from "@/components/motion/hover-lift";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/sections/section-heading";
import { testimonials } from "@/lib/content";

export function TestimonialsSection() {
  return (
    <section data-section="testimonials" className="border-y border-[color:var(--card-border)] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow>Trust</SectionEyebrow>
          <SectionHeading>What operators say after go-live</SectionHeading>
          <SectionLead>
            Anonymized feedback from logistics and fleet teams we have helped
            digitize — people hire people, and results travel by word of mouth.
          </SectionLead>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem key={item.role + item.region}>
              <HoverLift>
                <figure className="card flex h-full flex-col p-6">
                  <Quote className="size-6 text-[color:var(--accent)]" aria-hidden />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[color:var(--text)]">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-[color:var(--card-border)] pt-4">
                    <p className="font-heading text-sm font-semibold">{item.role}</p>
                    <p className="text-muted text-xs">{item.region}</p>
                  </figcaption>
                </figure>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
