"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { HoverLift } from "@/components/motion/hover-lift";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/sections/section-heading";
import { company, whyUs } from "@/lib/content";

export function WhyUsSection() {
  return (
    <section className="surface-ice relative overflow-hidden py-20 md:py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <Reveal>
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-white via-[#f7fbff] to-[#e8f2ff] p-8 shadow-[0_24px_60px_-36px_rgb(37_66_102_/_0.2)] sm:p-10">
              <SectionEyebrow>Why {company.name}</SectionEyebrow>
              <SectionHeading>
                A partner that builds software you can grow on
              </SectionHeading>
              <SectionLead>
                We combine product craft with logistics domain knowledge — so your
                platform fits how teams actually work on the road and in the
                office.
              </SectionLead>

              <dl className="mt-10 grid grid-cols-2 gap-6">
                <div className="rounded-xl border border-primary/15 bg-white/70 p-4">
                  <dt className="text-xs font-semibold tracking-wide text-primary uppercase">
                    Repeat clients
                  </dt>
                  <dd className="mt-1 font-heading text-3xl font-semibold tracking-tight text-primary">
                    {company.repeatClients}
                  </dd>
                </div>
                <div className="rounded-xl border border-primary/15 bg-white/70 p-4">
                  <dt className="text-xs font-semibold tracking-wide text-accent uppercase">
                    Team
                  </dt>
                  <dd className="mt-1 font-heading text-3xl font-semibold tracking-tight">
                    {company.employees}
                  </dd>
                </div>
                <div className="col-span-2 rounded-xl border border-primary/15 bg-white/70 p-4">
                  <dt className="text-xs font-semibold tracking-wide text-primary uppercase">
                    Headquarters
                  </dt>
                  <dd className="mt-1 font-heading text-xl font-semibold tracking-tight">
                    {company.location}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((item, i) => (
              <StaggerItem key={item.title}>
                <HoverLift>
                  <div
                    className={`h-full rounded-2xl p-6 ${
                      i % 2 === 0
                        ? "panel-glass"
                        : "border border-primary/20 bg-gradient-to-br from-white to-[#e8f2ff]"
                    }`}
                  >
                    <div
                      className={`mb-4 h-1 w-10 rounded-full ${
                        i % 2 === 0 ? "bg-primary" : "bg-accent"
                      }`}
                    />
                    <h3 className="font-heading text-base font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
