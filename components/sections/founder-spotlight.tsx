import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/sections/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { company, founder } from "@/lib/content";

export function FounderSpotlight() {
  return (
    <section className="surface-mist border-y border-primary/10 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow>Leadership</SectionEyebrow>
          <SectionHeading>People hire people</SectionHeading>
          <SectionLead>
            Meet the founder leading TieCodes as a software house for fleet,
            GPS, and AI-assisted logistics platforms.
          </SectionLead>
        </Reveal>

        <Reveal className="mt-10" delay={0.08}>
          <div className="panel-glass grid gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-start">
            <div className="mx-auto lg:mx-0">
              <div className="relative size-44 overflow-hidden rounded-full ring-4 ring-primary/30 sm:size-52">
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  className="object-cover object-top"
                  sizes="208px"
                  priority
                />
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {founder.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {founder.role} · {company.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{founder.location}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                {founder.bio}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                    Education
                  </p>
                  <ul className="mt-2 space-y-3">
                    {founder.education.map((ed) => (
                      <li key={ed.school} className="text-sm">
                        <span className="font-medium">{ed.detail}</span>
                        <span className="block text-muted-foreground">{ed.school}</span>
                        <span className="block text-xs text-muted-foreground">{ed.years}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                    Experience
                  </p>
                  <ul className="mt-2 space-y-3">
                    {founder.experience.map((ex) => (
                      <li key={`${ex.org}-${ex.title}`} className="text-sm">
                        <span className="font-medium">{ex.title}</span>
                        <span className="block text-muted-foreground">{ex.org}</span>
                        <span className="block text-xs text-muted-foreground">{ex.years}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="h-10 px-4"
                >
                  LinkedIn profile
                </ButtonLink>
                <ButtonLink href="/engagement" variant="outline" size="lg" className="h-10 px-4">
                  How we engage
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { label: "Founded", value: company.founded },
              { label: "Team", value: company.employees },
              { label: "HQ", value: "Lahore" },
              { label: "Focus", value: "Fleet · GPS · AI" },
            ].map((item) => (
              <div key={item.label} className="panel-accent rounded-2xl p-4 text-center sm:text-left">
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {item.label}
                </p>
                <p className="mt-1 font-heading text-lg font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground sm:text-left">
            Prefer paperwork first?{" "}
            <Link href="/engagement" className="font-medium text-primary hover:underline">
              NDA available on request
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
