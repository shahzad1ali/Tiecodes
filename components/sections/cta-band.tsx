"use client";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { benefits, company } from "@/lib/content";

export function CtaBand() {
  return (
    <section
      data-section="cta"
      className="relative overflow-hidden border-y border-[color:var(--card-border)] py-20 md:py-24"
    >
      <div
        className="pointer-events-none absolute -right-20 top-0 size-72 rounded-full bg-[color:var(--c-cyan)]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 size-64 rounded-full bg-[color:var(--c-amber)]/20 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="card rounded-3xl bg-[color:var(--c-white)] p-8 text-[color:var(--c-ink)] sm:p-12">
            <p className="text-sm font-semibold tracking-[0.14em] text-[color:var(--c-amber)] uppercase">
              Start a project
            </p>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-[color:var(--c-navy)] sm:text-4xl">
              Ready to build with a software house that understands logistics?
            </h2>
            <p className="mt-4 max-w-xl text-[color:var(--c-slate)]">
              Tell us about your drivers, vehicles, and workflows. We will help you
              ship a custom platform — not generic software.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {benefits.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-[color:var(--c-border)] bg-[color:var(--c-sky)] px-3 py-1 text-xs font-medium text-[color:var(--c-navy)]"
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href="/contact"
                size="lg"
                className="h-11 border-0 bg-[color:var(--c-navy)] px-5 text-[color:var(--c-white)] hover:bg-[color:var(--c-blue)] hover:text-[color:var(--c-white)]"
              >
                Contact {company.name}
              </ButtonLink>
              <ButtonLink
                href={company.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="outline"
                className="h-11 border-[color:var(--c-border)] bg-transparent px-5 text-[color:var(--c-navy)] hover:bg-[color:var(--c-sky)] hover:text-[color:var(--c-navy)]"
              >
                Follow on LinkedIn
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
