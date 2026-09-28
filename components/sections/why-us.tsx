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
    <section data-section="engagement" className="relative overflow-hidden py-20 md:py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <Reveal>
            <div className="soft-card rounded-3xl p-8 sm:p-10">
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
                <div className="card rounded-xl p-4">
                  <dt className="accent text-xs font-semibold tracking-wide uppercase">
                    Repeat clients
                  </dt>
                  <dd className="accent mt-1 font-heading text-3xl font-semibold tracking-tight">
                    {company.repeatClients}
                  </dd>
                </div>
                <div className="card rounded-xl p-4">
                  <dt className="text-xs font-semibold tracking-wide text-[color:var(--heading)] uppercase">
                    Team
                  </dt>
                  <dd className="mt-1 font-heading text-3xl font-semibold tracking-tight">
                    {company.employees}
                  </dd>
                </div>
                <div className="card col-span-2 rounded-xl p-4">
                  <dt className="accent text-xs font-semibold tracking-wide uppercase">
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
                  <div className="card h-full p-6">
                    <div
                      className={`mb-4 h-1 w-10 rounded-full ${
                        i % 2 === 0
                          ? "bg-[color:var(--accent)]"
                          : "bg-[color:var(--btn-hover)]"
                      }`}
                    />
                    <h3 className="font-heading text-base font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted mt-2 text-sm leading-relaxed">
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
