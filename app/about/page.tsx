import type { Metadata } from "next";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { HoverLift } from "@/components/motion/hover-lift";
import { CtaBand } from "@/components/sections/cta-band";
import { FounderSpotlight } from "@/components/sections/founder-spotlight";
import { PageHero } from "@/components/sections/page-hero";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/sections/section-heading";
import { aboutValues, company, whyUs } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `About ${company.name} and founder Darab Khan — a software house for fleet, GPS, AI, and logistics in ${company.location}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About ${company.name}`}
        title={company.tagline}
        description={company.description}
      />

      <FounderSpotlight />

      <section className="surface-ice py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <SectionEyebrow>Our story</SectionEyebrow>
              <SectionHeading>Building success through technology</SectionHeading>
              <SectionLead>
                We believe in delivering quality results with creativity and
                adaptability, staying ahead of technology trends to solve complex
                challenges.
              </SectionLead>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                With over {company.repeatClients} of our business from repeat
                clients, we prioritize strong relationships — and software that
                fits how fleets and logistics teams actually operate.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-[#1e293b] via-[#233f69] to-[#1e293b] p-6 text-navy-foreground sm:p-8">
                <dl className="space-y-6">
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-primary uppercase">
                      Headquarters
                    </dt>
                    <dd className="mt-1 font-heading text-lg font-semibold">
                      {company.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-accent uppercase">
                      Team size
                    </dt>
                    <dd className="mt-1 font-heading text-lg font-semibold">
                      {company.employees} employees
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-primary uppercase">
                      Focus
                    </dt>
                    <dd className="mt-1 font-heading text-lg font-semibold">
                      Software house for fleet, GPS & AI
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-16">
            <SectionEyebrow>Values</SectionEyebrow>
            <SectionHeading>Why teams choose {company.name}</SectionHeading>
          </Reveal>

          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
            {aboutValues.map((value) => (
              <StaggerItem key={value.title}>
                <HoverLift>
                  <div className="panel-glass h-full rounded-2xl p-6">
                    <h3 className="font-heading text-lg font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
            {whyUs.map((item) => (
              <StaggerItem key={item.title}>
                <div className="panel-accent h-full rounded-2xl border-l-4 border-l-accent p-5">
                  <h3 className="font-heading text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
