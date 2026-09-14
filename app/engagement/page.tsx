import type { Metadata } from "next";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { HoverLift } from "@/components/motion/hover-lift";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/sections/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { company, engagementModels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Engagement",
  description: `How ${company.name} engages — fixed price, time & materials, or dedicated team. NDA on request.`,
};

export default function EngagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagement"
        title="Clear models. Less friction before we talk."
        description="A rough guide to how we structure projects — so you know what to expect before “Talk to us.”"
      />

      <section className="surface-mist py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionEyebrow>Models</SectionEyebrow>
            <SectionHeading>Pick the shape that fits your stage</SectionHeading>
            <SectionLead>
              Exact cost depends on scope. These patterns cover most fleet, GPS,
              and logistics builds we ship.
            </SectionLead>
          </Reveal>

          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {engagementModels.map((model) => (
              <StaggerItem key={model.title}>
                <HoverLift>
                  <div className="panel-glass flex h-full flex-col rounded-2xl p-6">
                    <h2 className="font-heading text-xl font-semibold">{model.title}</h2>
                    <p className="mt-3 text-sm text-muted-foreground">{model.summary}</p>
                    <p className="mt-4 text-sm">
                      <span className="font-medium text-primary">Best for: </span>
                      {model.bestFor}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{model.timeline}</p>
                  </div>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-12 panel-accent rounded-2xl p-6 sm:p-8">
            <h3 className="font-heading text-lg font-semibold">Typical ranges</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Focused MVP (driver app + admin): often weeks, not months of silence.</li>
              <li>Full fleet platform (web + mobile + GPS): multi-month phased delivery.</li>
              <li>AI overlays and integrations: scoped after data and workflows are clear.</li>
            </ul>
            <p className="mt-4 text-sm font-medium text-foreground">
              NDA on request — we are happy to sign before sensitive scope discussions.
            </p>
            <ButtonLink href="/contact" className="mt-6 h-11 px-5" size="lg">
              Start a scoped conversation
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
