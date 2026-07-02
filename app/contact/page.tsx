import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Placeholder } from "@/components/ui/placeholder";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met De Kozijnstudio voor vragen, advies of een offerte. Werkgebied: Twente & Oost-Nederland.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We beantwoorden uw vraag binnen één werkdag."
        lead="Heeft u een vraag over kozijnen, materialen, de ISDE-subsidie of ons werkgebied? Of wilt u meteen een offerte aanvragen? We staan voor u klaar."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          {/* Direct contact — bellen, WhatsApp of mail; offerte via de wizard */}
          <div>
            <Eyebrow>Stuur een bericht</Eyebrow>
            <h2 className="mt-4 mb-6 text-2xl text-ink">Direct contact</h2>
            <p className="leading-relaxed text-ink/65">
              Mail of bel ons gerust — we reageren doorgaans binnen één werkdag.
              Liever appen? Dat kan ook: stuur uw vraag (met eventueel een foto
              van de situatie) via WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`mailto:${company.email}`}>Stuur een e-mail</Button>
              <Button
                href={`https://wa.me/${company.whatsappHref}`}
                variant="secondary"
              >
                WhatsApp ons
              </Button>
            </div>
            <div className="mt-10 rounded-card border border-mist bg-paper-soft p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">
                Offerte of prijsindicatie?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                Gebruik dan het offerteformulier of stel uw kozijn samen in de
                configurator — dan hebben we alle gegevens direct compleet.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/offerte-aanvragen" size="sm">
                  Offerte aanvragen →
                </Button>
                <Button href="/configurator" variant="secondary" size="sm">
                  Naar de configurator
                </Button>
              </div>
            </div>
          </div>

          {/* Contactgegevens */}
          <div>
            <Eyebrow>Contactgegevens</Eyebrow>
            <h2 className="mt-4 mb-6 text-2xl text-ink">Bereikbaarheid</h2>
            <div className="space-y-5">
              <div className="rounded-card border border-mist bg-paper-soft p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">Telefoon</p>
                <p className="mt-1 font-medium text-ink">
                  <a href={`tel:${company.telefoon.replace(/\s/g, "")}`} className="hover:text-forest">{company.telefoon}</a>
                </p>
                <p className="mt-1 text-sm text-ink/60">Bereikbaar {company.openingstijden}</p>
              </div>
              <div className="rounded-card border border-mist bg-paper-soft p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">WhatsApp</p>
                <p className="mt-1 font-medium text-ink">
                  <a href={`https://wa.me/${company.whatsappHref}`} className="hover:text-forest">{company.whatsapp}</a>
                </p>
                <p className="mt-1 text-sm text-ink/60">Handig voor foto&rsquo;s van uw huidige kozijnen</p>
              </div>
              <div className="rounded-card border border-mist bg-paper-soft p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">E-mail</p>
                <p className="mt-1 font-medium text-ink">
                  <a href={`mailto:${company.email}`} className="hover:text-forest">{company.email}</a>
                </p>
                <p className="mt-1 text-sm text-ink/60">We reageren doorgaans binnen één werkdag</p>
              </div>
              <div className="rounded-card border border-mist bg-paper-soft p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">Werkgebied</p>
                <p className="mt-1 font-medium text-ink">Twente & Oost-Nederland</p>
                <p className="mt-1 text-sm text-ink/60">
                  Twijfelt u of uw adres in ons werkgebied valt? Neem contact op.
                </p>
              </div>
              <div className="rounded-card border border-mist bg-paper-soft p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">Onderdeel van</p>
                <p className="mt-1 font-medium text-ink">MTB Bouw</p>
                <p className="mt-1 text-sm text-ink/60">
                  <a href="https://www.mtbbouw.com" className="text-forest underline underline-offset-2 hover:no-underline">
                    www.mtbbouw.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Placeholder label="Kaart / locatie" className="min-h-56" />
          <div>
            <Eyebrow>Locatie</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink">
              Gevestigd in Enschede
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              De Kozijnstudio opereert vanuit dezelfde locatie als MTB Bouw:
            </p>
            <p className="mt-4 font-medium text-ink">
              {company.adres}
              <br />
              {company.postcodePlaats}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/60">
              Bezoek op afspraak — zo weet u zeker dat er iemand met verstand
              van uw project voor u klaarzit.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
