import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${company.name} in ${company.location} for custom software, fleet, GPS, and logistics platforms.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something that keeps your business ahead"
        description="Share your project details and we will follow up to discuss fleet, driver, tracking, or custom software needs."
      />

      <section className="surface-mist py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Reach us directly
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A software house in {company.location} — ready to talk products,
              timelines, and scope.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="panel-glass flex gap-3 rounded-xl p-4">
                <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {company.email}
                  </a>
                </div>
              </li>
              <li className="panel-glass flex gap-3 rounded-xl p-4">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  {company.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-muted-foreground hover:text-primary"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="panel-glass flex gap-3 rounded-xl p-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-muted-foreground">{company.location}</p>
                </div>
              </li>
            </ul>
            <a
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex text-sm font-medium text-primary hover:underline"
            >
              LinkedIn — TieCodes Pvt Ltd
            </a>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.08}>
            <div className="panel-glass rounded-2xl p-1">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
