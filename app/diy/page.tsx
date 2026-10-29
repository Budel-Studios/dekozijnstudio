import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MODULES } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { Callout } from "@/components/ui/callout";
import { Placeholder } from "@/components/ui/placeholder";

export const metadata: Metadata = {
  title: "Zelf plaatsen (DIY)",
  description:
    "Kozijnen zelf plaatsen? Wij leveren maatwerk kozijnen aan huis met montage-instructies en telefonische begeleiding. Transparante prijzen incl. btw.",
  alternates: { canonical: "/diy" },
};

const inbegrepen = [
  "Kozijnen op maat geproduceerd op basis van uw eigen maten",
  "Gedetailleerde montage-instructieset bij de levering",
  "Telefonische technische ondersteuning tijdens de montage",
  "Afdichtingsmateriaal en bevestigingsmiddelen standaard meegeleverd",
];

const wasmogelijk = [
  "U heeft ervaring met timmerwerk of bent handig met gereedschap",
  "De muuropeningen zijn al de juiste maat (geen bouwkundige aanpassingen nodig)",
  "Standaard kozijnposities zonder constructieve complicaties",
];

export default function DiyPage() {
  if (!MODULES.diy) notFound();
  return (
    <>
      <PageHero
        eyebrow="Zelf plaatsen (DIY)"
        title="Kozijnen leveren — plaatsen doet u zelf."
        lead="Handig en wil je kosten besparen? Wij leveren kozijnen op maat aan huis, inclusief montage-instructies en telefonische begeleiding. U plaatst ze zelf."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Zelf plaatsen (DIY)" }]}
        actions={
          <>
            <Button href="/offerte">Vraag levering aan</Button>
            <Button href="/montage" variant="secondary">Liever montage?</Button>
          </>
        }
        media={<Placeholder label="DIY montage — sfeerfoto" className="min-h-72 lg:min-h-80" />}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Wat u krijgt</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Levering inclusief begeleiding
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Maatwerk kozijnen leveren we niet zomaar voor de deur. Bij elke
              DIY-levering zit een complete instructieset en kunt u tijdens de
              montage bellen met onze technische medewerkers.
            </p>
            <FeatureList items={inbegrepen} className="mt-6" />
          </div>
          <Placeholder label="Leveringsbox kozijn" className="min-h-56" />
        </Container>
      </Section>

      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Is DIY iets voor u?</Eyebrow>
          <h2 className="mt-4 mb-6 text-2xl text-ink sm:text-3xl">
            Eerlijk advies over wanneer het werkt
          </h2>
          <p className="leading-relaxed text-ink/65">
            Zelf plaatsen werkt goed in de volgende situaties:
          </p>
          <FeatureList items={wasmogelijk} className="mt-5" />
          <Callout variant="info" className="mt-8" title="Wanneer toch montage kiezen?">
            <p>
              Zijn er bouwkundige aanpassingen nodig (opening vergroten, latei,
              metselwerk)? Dan adviseren we een combinatie van onze montagedienst
              met de diensten van MTB Bouw. Neem gerust contact op voor advies.
            </p>
          </Callout>
        </Container>
      </Section>

      <Section tone="ink">
        <Container className="text-center">
          <h2 className="text-2xl text-paper sm:text-3xl">
            Kozijnen laten leveren?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            Geef uw maten door en ontvang een offerte voor levering aan huis.
            Geen inmeetservice nodig bij DIY — u bent zelf verantwoordelijk voor
            de maatvoering.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/offerte">Offerte aanvragen</Button>
            <Button href="/contact" variant="secondary">Vraag advies</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
