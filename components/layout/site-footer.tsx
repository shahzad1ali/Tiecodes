import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { company, footerExtraLinks, navLinks, solutions } from "@/lib/content";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="surface-ink border-t border-primary/15 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo href="/" size="md" showTagline />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Custom software for fleet, GPS, drivers, and logistics — built in{" "}
            {company.location}.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold tracking-wide text-primary">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold tracking-wide text-primary">
            Solutions
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link href={`/solutions/${s.slug}`} className="hover:text-primary">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold tracking-wide text-primary">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-primary">
                {company.email}
              </a>
            </li>
            {company.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-primary">
                  {phone}
                </a>
              </li>
            ))}
            {footerExtraLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={company.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator className="bg-border" />
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
        <p>{company.tagline}</p>
      </div>
    </footer>
  );
}
