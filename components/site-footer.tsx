import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/logo";
import { footerGroups, legalLinks, werkgebiedLinks } from "@/lib/navigation";
import { company } from "@/data/company";
import { ContactLink } from "@/components/contact-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-mist bg-ink text-paper">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo inverse />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              Kozijnen met transparante prijzen, van inmeten tot montage.
            </p>
            <div className="mt-4 rounded-2xl border border-paper/15 bg-paper/5 p-4">
              <p className="text-sm text-paper/80">
                Onderdeel van{" "}
                <Link href="/mtb-bouw" className="font-semibold text-paper underline underline-offset-2 hover:text-lime">
                  MTB Bouw
                </Link>
              </p>
              <p className="mt-1 text-xs leading-relaxed text-paper/55">
                Uw bouwpartner voor renovatie, verbouw en aanbouw.{" "}
                <a
                  href="https://www.mtbbouw.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 underline underline-offset-2 hover:text-paper"
                >
                  mtbbouw.com
                </a>
              </p>
            </div>
            <address className="mt-5 space-y-1 text-sm not-italic text-paper/70">
              <p>
                <ContactLink kind="phone" className="hover:text-lime">{company.telefoon}</ContactLink>
              </p>
              <p>
                <a href={`mailto:${company.email}`} className="hover:text-lime">{company.email}</a>
              </p>
              <p className="text-paper/50">
                {company.adres}, {company.postcodePlaats} · bezoek op afspraak
              </p>
            </address>
            <nav aria-label="Werkgebied" className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-paper/40">
                Werkgebied
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                {werkgebiedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/70 transition-colors hover:text-lime"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Sitemap columns */}
          {footerGroups.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <p className="text-xs font-semibold uppercase tracking-widest text-paper/40">
                {group.label}
              </p>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/70 transition-colors hover:text-lime"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-paper/10 pt-6">
          <nav aria-label="Juridisch" className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-paper/55 transition-colors hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="mt-4 text-xs text-paper/40">
            © {new Date().getFullYear()} {company.naam} is een handelsnaam van {company.entiteit} · KvK {company.kvk}
          </p>
        </div>
      </Container>
    </footer>
  );
}
