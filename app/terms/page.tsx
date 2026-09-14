import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for the ${company.name} website.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="Simple terms for using this marketing website."
      />
      <section className="surface-mist py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-sm leading-relaxed text-muted-foreground sm:px-6">
          <p className="text-foreground">Last updated: September 2026</p>
          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            Website use
          </h2>
          <p className="mt-3">
            Content on this site is for general information about {company.name}{" "}
            services. It does not create a binding project agreement until a
            separate contract is signed.
          </p>
          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            Demo & examples
          </h2>
          <p className="mt-3">
            Interactive demos and sample dashboards are illustrative only and may
            use simulated data. They are not production systems or live tracking
            of real vehicles.
          </p>
          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            Intellectual property
          </h2>
          <p className="mt-3">
            Branding, copy, and custom artwork on this site belong to{" "}
            {company.name} unless otherwise noted.
          </p>
          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            Contact
          </h2>
          <p className="mt-3">
            <a className="text-primary hover:underline" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
