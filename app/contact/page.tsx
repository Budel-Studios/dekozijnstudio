import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ContactLink } from "@/components/contact-link";
import { company } from "@/data/company";
import { feit } from "@/data/feiten";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { MODULES } from "@/lib/site";

export const metadata = pageMetadata({
  absoluteTitle: "Contact met De Kozijnstudio in Enschede",
  description:
    "Een vraag over kozijnen in Enschede of Twente? Neem contact op met De Kozijnstudio of stuur informatie over jouw woning en wensen.",
  path: "/contact",
});

const link = "font-medium text-forest underline underline-offset-2 hover:no-underline";

export default function ContactPage() {
  const reactietermijn = feit("reactietermijn");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }])),
        }}
      />
      <PageHero
        eyebrow="Contact"
        title="Neem contact op met De Kozijnstudio"
        lead={`Een vraag over kozijnen, materialen, subsidie of ons werkgebied? Bel, mail of app ons.${reactietermijn ? ` ${reactietermijn}.` : ""}`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Direct contact</Eyebrow>
            <h2 className="mb-6 mt-4 text-2xl text-ink">Bellen, mailen of appen</h2>
            <div className="space-y-4">
              <div className="rounded-card border border-mist bg-paper-soft p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">Telefoon</p>
                <p className="mt-1 font-medium text-ink">
                  <ContactLink kind="phone" location="contact" className="hover:text-forest">
                    {company.telefoon}
                  </ContactLink>
                </p>
                <p className="mt-1 text-sm text-ink/65">Bereikbaar {company.openingstijden}</p>
              </div>
              <div className="rounded-card border border-mist bg-paper-soft p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">WhatsApp</p>
                <p className="mt-1 font-medium text-ink">
                  <ContactLink kind="whatsapp" location="contact" className="hover:text-forest">
                    {company.whatsapp}
                  </ContactLink>
                </p>
                <p className="mt-1 text-sm text-ink/65">Handig om foto&apos;s van je huidige kozijnen te sturen</p>
              </div>
              <div className="rounded-card border border-mist bg-paper-soft p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">E-mail</p>
                <p className="mt-1 font-medium text-ink">
                  <a href={`mailto:${company.email}`} className="hover:text-forest">
                    {company.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div>
            <Eyebrow>Een voorstel?</Eyebrow>
            <h2 className="mb-6 mt-4 text-2xl text-ink">Stuur je wensen in één keer</h2>
            <p className="leading-relaxed text-ink/70">
              Wil je een voorstel voor nieuwe kozijnen? Via het aanvraagformulier geef je in drie korte stappen je wensen,
              je situatie en je contactgegevens door. Foto&apos;s kun je meesturen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/offerte">Vraag een voorstel</Button>
              {MODULES.configurator && (
                <Button href="/configurator" variant="secondary">
                  Naar de configurator
                </Button>
              )}
            </div>

            <div className="mt-10 rounded-card border border-mist bg-paper p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">Adres</p>
              <p className="mt-2 font-medium text-ink">
                {company.naam}
                <br />
                {company.adres}
                <br />
                {company.postcodePlaats}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Bezoek op afspraak, zodat er iemand met tijd voor je project klaarzit. We werken op hetzelfde adres als MTB
                Bouw.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {company.naam} is een handelsnaam van {company.entiteit} · KvK {company.kvk}
              </p>
            </div>

            <p className="mt-6 text-sm text-ink/70">
              Werk je buiten Enschede? Bekijk ons{" "}
              <Link href="/werkgebied" className={link}>
                werkgebied in Twente
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
