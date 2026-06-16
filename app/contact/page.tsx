import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Callout } from "@/components/ui/callout";
import { Placeholder } from "@/components/ui/placeholder";

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
          {/* Contact form placeholder — interactief formulier volgt in fase 4 */}
          <div>
            <Eyebrow>Stuur een bericht</Eyebrow>
            <h2 className="mt-4 mb-6 text-2xl text-ink">Contactformulier</h2>
            <Callout variant="disclaimer">
              <p>
                Het contactformulier wordt actief in fase 4 (offerteflow +
                klantportaal). Gebruik in de tussentijd de onderstaande
                contactgegevens.
              </p>
            </Callout>
            <Placeholder label="Contactformulier — volgt in fase 4" className="mt-6 min-h-64" />
            <div className="mt-4">
              <Button href="/offerte-aanvragen">
                Offerte aanvragen →
              </Button>
            </div>
          </div>

          {/* Contactgegevens */}
          <div>
            <Eyebrow>Contactgegevens</Eyebrow>
            <h2 className="mt-4 mb-6 text-2xl text-ink">Bereikbaarheid</h2>
            <div className="space-y-5">
              <div className="rounded-card border border-mist bg-paper-soft p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">Telefoon</p>
                <p className="mt-1 font-medium text-ink">Placeholder — volgt</p>
                <p className="mt-1 text-sm text-ink/60">Bereikbaar op werkdagen 08:00–17:00</p>
              </div>
              <div className="rounded-card border border-mist bg-paper-soft p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">E-mail</p>
                <p className="mt-1 font-medium text-ink">Placeholder — volgt</p>
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
              Gevestigd in Twente
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              De Kozijnstudio opereert vanuit dezelfde locatie als MTB Bouw.
              Adresgegevens worden toegevoegd zodra de showroom geopend is.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
