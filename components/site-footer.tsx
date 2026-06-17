import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PlaceholderTag } from "@/components/ui/placeholder";
import { footerGroups, legalLinks } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-mist bg-ink text-paper">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <p className="flex items-baseline gap-1.5 font-display text-lg font-semibold">
              De Kozijnstudio
              <span aria-hidden className="size-1.5 rounded-full bg-lime" />
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">
              De meest transparante kozijnleverancier van Nederland.{" "}
              <span className="text-paper/40">(placeholder-claim)</span>
            </p>
            <div className="mt-4 rounded-xl border border-paper/15 bg-paper/5 p-4">
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
            <div className="mt-4">
              <PlaceholderTag>Werkgebied · contact volgt</PlaceholderTag>
            </div>
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
                      className="text-sm text-paper/70 transition-colors hover:text-paper"
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
            © {new Date().getFullYear()} De Kozijnstudio — onderdeel van MTB Bouw.
          </p>
        </div>
      </Container>
    </footer>
  );
}
