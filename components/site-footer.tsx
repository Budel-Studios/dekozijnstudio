import Link from "next/link";
import { Logo } from "@/components/logo";
import { ArrowUpRightIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { footerGroups, legalLinks, werkgebiedLinks, primaryCta } from "@/lib/navigation";
import { company } from "@/data/company";
import { ContactLink } from "@/components/contact-link";

/**
 * Footer — same structure as mtbbouw.com: a lime brand line on top, a large
 * closing question that opens the request panel, the sitemap columns with a
 * contact column, and a bottom bar with social buttons and the legal line.
 * Links to /offerte open the request panel (see aanvraag-drawer).
 */
export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div aria-hidden className="h-1 bg-lime" />
      {/* Same outer width as the header bar. */}
      <div className="mx-auto w-full max-w-[96rem] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* Closing CTA */}
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="label-mono text-paper/60">Een merk van MTB Bouw</p>
            <Link
              href={primaryCta.href}
              className="group mt-6 block font-display text-5xl font-semibold leading-[0.95] tracking-[-0.035em] md:text-7xl"
            >
              Klaar voor nieuwe kozijnen?{" "}
              <ArrowUpRightIcon className="inline-block size-10 align-baseline text-lime transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:size-14" />
            </Link>
          </div>
          <div className="md:col-span-4">
            <p className="max-w-sm text-base leading-relaxed text-paper/75">
              Vertel wat je wilt vervangen. Je krijgt een voorstel dat per onderdeel is uitgesplitst, met
              prijzen inclusief btw.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ContactLink
                kind="phone"
                location="footer"
                className="inline-flex items-center rounded-pill bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-lime"
              >
                {company.telefoon}
              </ContactLink>
              <Link
                href={primaryCta.href}
                className="inline-flex items-center rounded-pill border border-paper/40 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                {primaryCta.label}
              </Link>
            </div>
          </div>
        </div>

        {/* Columns: brand, sitemap, contact */}
        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-paper/15 pt-10 sm:grid-cols-3 lg:grid-cols-7">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 lg:pr-10">
            <Logo inverse />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/65">
              Kozijnen met transparante prijzen, van inmeten tot montage.
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/65">
              De Kozijnstudio is een merk van{" "}
              <Link href="/mtb-bouw" className="text-paper underline underline-offset-4 hover:text-lime">
                MTB Bouw
              </Link>
              , het bouwbedrijf uit Enschede voor renovatie, verbouw en aanbouw.
            </p>
            <a
              href="https://www.mtbbouw.com"
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono mt-4 inline-flex items-center gap-1.5 text-paper/75 transition-colors hover:text-lime"
            >
              mtbbouw.com
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <p className="label-mono text-paper/55">{group.label}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-paper/80 transition-colors hover:text-lime">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="label-mono text-paper/55">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              <li>
                <address className="not-italic leading-relaxed">
                  {company.entiteit}
                  <br />
                  {company.adres}
                  <br />
                  {company.postcodePlaats}
                  <br />
                  <span className="text-paper/55">
                    {company.openingstijden} · bezoek op afspraak
                  </span>
                </address>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-lime">
                  {company.email}
                </a>
              </li>
              <li>
                <ContactLink kind="phone" location="footer-contact" className="transition-colors hover:text-lime">
                  {company.telefoon}
                </ContactLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Werkgebied */}
        <nav aria-label="Werkgebied" className="mt-12 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <p className="label-mono text-paper/55">Werkgebied</p>
          {werkgebiedLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-paper/75 transition-colors hover:text-lime">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom bar: social + legal */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-paper/15 pt-8 lg:flex-row lg:items-center">
          <div className="flex gap-2">
            <ContactLink
              kind="whatsapp"
              location="footer"
              className="flex size-10 items-center justify-center border border-paper/25 text-paper/80 transition-colors hover:bg-paper hover:text-ink"
            >
              <WhatsAppIcon className="size-5" />
              <span className="sr-only">WhatsApp</span>
            </ContactLink>
            <a
              href={company.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram van MTB Bouw"
              className="flex size-10 items-center justify-center border border-paper/25 text-paper/80 transition-colors hover:bg-paper hover:text-ink"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
          <div className="flex flex-col items-start gap-x-5 gap-y-3 lg:flex-row lg:items-center">
            <nav aria-label="Juridisch" className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="label-mono text-paper/55 transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="label-mono text-paper/45">
              © {new Date().getFullYear()} {company.naam} · handelsnaam van {company.entiteit} · KvK {company.kvk}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
