import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${company.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How ${company.name} handles information you share through this website.`}
      />
      <section className="surface-mist py-16 md:py-20">
        <div className="prose prose-neutral mx-auto max-w-3xl px-4 text-sm leading-relaxed text-muted-foreground sm:px-6">
          <p className="text-foreground">Last updated: September 2026</p>
          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">Overview</h2>
          <p className="mt-3">
            TieCodes (“we”) operates this marketing website. When you contact us,
            we collect the details you submit so we can respond to your inquiry.
          </p>
          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            What we collect
          </h2>
          <p className="mt-3">
            Contact form fields such as name, email, phone, and message. We do not
            sell personal data. Server logs may include IP address and basic
            request metadata for security and reliability.
          </p>
          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            How we use it
          </h2>
          <p className="mt-3">
            To reply to project inquiries, schedule calls, and improve our site.
            Emails may be processed by our email provider when configured.
          </p>
          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            Contact
          </h2>
          <p className="mt-3">
            Questions about privacy:{" "}
            <a className="text-primary hover:underline" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            . Location: {company.location}.
          </p>
        </div>
      </section>
    </>
  );
}
