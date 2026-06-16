import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { FeatureList } from "@/components/ui/feature-list";
import { Placeholder } from "@/components/ui/placeholder";
import { ArrowUpRightIcon } from "@/components/icons";
import {
  MTB_URL,
  mtbFeaturedServices,
  mtbAllServices,
  mtbVoordelen,
} from "@/data/mtb-bouw";

export const metadata: Metadata = {
  title: "MTB Bouw — ons moederbedrijf en bouwpartner",
  description:
    "De Kozijnstudio is onderdeel van MTB Bouw, een ervaren bouwbedrijf. Voor renovaties, verbouwingen en aanbouw heeft u één betrouwbare partner met één planning.",
  alternates: { canonical: "/mtb-bouw" },
  openGraph: {
    title: "MTB Bouw — moederbedrijf van De Kozijnstudio",
    description:
      "Eén partner voor kozijnen én bouwkundig werk: renovatie, verbouw en aanbouw via MTB Bouw.",
  },
};

export default function MtbBouwPage() {
  return (
    <>
      <PageHero
        eyebrow="Onderdeel van MTB Bouw"
        title="Een kozijnleverancier mét een bouwbedrijf erachter."
        lead="De Kozijnstudio is opgericht vanuit MTB Bouw. Daardoor kunnen we verder gaan dan kozijnen alleen: van bouwkundige aanpassingen tot complete renovaties — één partner, één planning, één verantwoordelijkheid."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "MTB Bouw" }]}
        actions={
          <>
            <Button href={MTB_URL}>
              <span>Bezoek mtbbouw.com</span>
              <ArrowUpRightIcon className="size-3.5" />
            </Button>
            <Button href="/offerte-aanvragen" variant="secondary">Offerte aanvragen</Button>
          </>
        }
        media={<Placeholder label="MTB Bouw — beeld / logo" className="min-h-72 lg:min-h-80" />}
      />

      {/* Partnerschap */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Het partnerschap</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              De kracht van een volwaardig bouwbedrijf
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              MTB Bouw is een ervaren bouwbedrijf uit de regio met een brede
              expertise: van verbouw en renovatie tot aanbouw en nieuwbouw. De
              Kozijnstudio is hieruit ontstaan om de kozijnenmarkt transparanter
              te maken — met dezelfde mensen, dezelfde kwaliteit en dezelfde
              eerlijke werkwijze achter zich.
            </p>
            <p className="mt-4 leading-relaxed text-ink/65">
              Voor u betekent dat: als uw kozijnproject meer vraagt dan alleen
              plaatsing, hoeft u geen aparte aannemer te zoeken. We regelen het
              bouwkundige werk zelf en stemmen alles op elkaar af.
            </p>
          </div>
          <Placeholder label="Sfeerbeeld — MTB Bouw in uitvoering" className="min-h-64" />
        </Container>
      </Section>

      {/* Uitgelichte diensten */}
      <Section tone="soft">
        <Container>
          <Eyebrow>Bouwdiensten</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
            Waarvoor u bij MTB Bouw terechtkunt
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {mtbFeaturedServices.map((service) => (
              <Card key={service.title}>
                <CardEyebrow>Uitgelicht</CardEyebrow>
                <CardTitle>{service.title}</CardTitle>
                <CardBody>{service.description}</CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-card border border-mist bg-paper p-6">
            <p className="text-sm font-medium text-ink">
              MTB Bouw verzorgt daarnaast onder meer:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {mtbAllServices.map((service) => (
                <span
                  key={service}
                  className="rounded-pill border border-mist bg-paper-soft px-3 py-1.5 text-xs font-medium text-ink/70"
                >
                  {service}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink/55">
              Bekijk het volledige aanbod op{" "}
              <a
                href={MTB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-forest underline underline-offset-2 hover:no-underline"
              >
                mtbbouw.com
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* Voordeel voor de klant */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Placeholder label="Eén team — kozijnen + bouw" className="min-h-64" />
          <div>
            <Eyebrow>Uw voordeel</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Eén partner voor het hele project
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Doordat De Kozijnstudio en MTB Bouw samenwerken, loopt uw project
              soepel — zonder coördinatieproblemen tussen losse partijen.
            </p>
            <FeatureList items={mtbVoordelen} className="mt-6" />
            <div className="mt-7">
              <Button href="/bouwkundige-aanpassingen" variant="secondary">
                Over bouwkundige aanpassingen
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ink">
        <Container className="text-center">
          <h2 className="text-2xl text-paper sm:text-3xl">
            Kozijnen, renovatie of beide?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            Vertel ons over uw project. We denken met u mee over de kozijnen én
            het bouwkundige werk — in één heldere offerte.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button
              href={MTB_URL}
              variant="secondary"
              className="border-paper/25 bg-transparent text-paper hover:bg-paper/10"
            >
              <span>Naar mtbbouw.com</span>
              <ArrowUpRightIcon className="size-3.5" />
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
