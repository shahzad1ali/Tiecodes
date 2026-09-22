"use client";

import Image from "next/image";
import { Icon } from "@/components/brand/icon";
import { AiCoreArt } from "@/components/brand/ai-core-art";
import { HoverLift } from "@/components/motion/hover-lift";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/sections/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { aiCapabilities } from "@/lib/content";

export function AiIntelligenceSection() {
  return (
    <section className="surface-ink relative overflow-hidden py-20 text-foreground md:py-24">
      <div
        className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-64 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionEyebrow>AI intelligence</SectionEyebrow>
            <SectionHeading className="text-foreground">
              Workflow intelligence for service teams, fleets, and platform ops
            </SectionHeading>
            <SectionLead className="text-muted-foreground">
              TieCodes layers practical AI into operational products: smarter
              assignment recommendations, agreement checks, completion tracking,
              and business signals that turn workflows into clear decisions.
            </SectionLead>

            <Stagger className="mt-8 grid gap-3 sm:grid-cols-2">
              {aiCapabilities.map((item) => (
                <StaggerItem key={item.title}>
                  <HoverLift>
                    <div className="panel-glass-dark h-full rounded-2xl p-4">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                        <Icon name={item.icon} className="size-4" />
                      </div>
                      <h3 className="mt-3 font-heading text-sm font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </HoverLift>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-8">
              <ButtonLink href="/contact" size="lg" className="h-11 px-5">
                Talk AI with TieCodes
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-5">
            <div className="overflow-hidden rounded-2xl border border-primary/20 bg-[#eaf4ff] p-1 shadow-[0_28px_60px_-36px_rgb(37_66_102_/_0.2)]">
              <Image
                src="/brand/ai-fleet-intelligence.png"
                alt="Abstract AI fleet intelligence network artwork"
                width={1280}
                height={720}
                className="h-auto w-full object-cover brightness-110 saturate-75"
                priority={false}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-primary/20 bg-[#0d2138] p-1">
                <Image
                  src="/brand/ai-ops-dashboard.png"
                  alt="Abstract AI operations dashboard artwork"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover brightness-110 saturate-75"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-primary/20">
                <AiCoreArt className="h-full w-full" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
