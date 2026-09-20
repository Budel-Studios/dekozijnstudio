import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { Placeholder } from "@/components/ui/placeholder";
import { serviceSchema, jsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Aluminium kozijnen",
  description:
    "Aluminium kozijnen op maat — slanke profielen, maximaal glas en minimaal onderhoud. Schüco, Aluprof en Reynaers. Transparante prijzen incl. btw. Twente & Oost-Nederland.",
  alternates: { canonical: "/aluminium-kozijnen" },
  openGraph: {
    title: "Aluminium kozijnen — De Kozijnstudio",
    description: "Slanke profielen, maximaal glas, minimaal onderhoud. Schüco, Aluprof en Reynaers op maat.",
  },
};

const voordelen = [
  "Slanke profielen — maximaal zichtglas per kozijn",
  "Extreem duurzaam: nauwelijks vervorming of corrosie",
  "Minimaal onderhoud — aluminium roest niet",
  "Moderne, strakke esthetiek voor hedendaagse architectuur",
  "Leverbaar in elke RAL-kleur en Qualicoat-afwerking",
  "Thermisch onderbroken profielen voor uitstekende isolatie",
];

const profielen = [
  {
    eyebrow: "Premium profiel",
    title: "Schüco",
    body: "Internationaal toonaangevend merk. Thermisch onderbroken aluminium systemen met premium isolatiewaarden, leverbaar in alle kleuren.",
  },
  {
    eyebrow: "Prijs-kwaliteit",
    title: "Aluprof",
    body: "Pools A-merk met een uitstekende prijs-kwaliteitverhouding. Breed assortiment voor ramen, deuren en schuifpuien.",
  },
  {
    eyebrow: "Specialistisch",
    title: "Reynaers",
    body: "Belgisch aluminium systemen-merk met focus op architecturale projecten. Herkenbaar door strakke lijnen en hoge maatvoeringsnauwkeurigheid.",
  },
];

export default function AluminiumKozijnenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            serviceSchema({
              name: "Aluminium kozijnen",
              description: "Aluminium kozijnen en schuifpuien met slanke profielen van Schüco, Aluprof en Reynaers, inclusief montage.",
              path: "/aluminium-kozijnen",
              serviceType: "Aluminium kozijnen op maat",
            }),
          ),
        }}
      />

      <PageHero
        eyebrow="Aluminium kozijnen"
        title="Slanke profielen, maximaal glas."
        lead="Aluminium kozijnen zijn de keuze voor wie maximale architecturale vrijheid wil: slanke profielen, grote glasvlakken en een onderhoudsvrije gevel voor decennia."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kozijnen" }, { label: "Aluminium kozijnen" }]}
        actions={
          <>
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button href="/prijzen" variant="secondary">Bekijk montagekosten</Button>
          </>
        }
        media={<Placeholder label="Aluminium kozijnen — sfeerfoto" className="min-h-72 lg:min-h-80" />}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Voordelen</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Architecturale vrijheid met aluminium
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Aluminium is het sterkste kozijnmateriaal en maakt de slankste
              profielen mogelijk. Dat betekent meer glas per kozijn, meer
              lichtinval en een moderne uitstraling. Door de thermische
              onderbreking in het profiel presteert modern aluminium uitstekend
              op het gebied van isolatie.
            </p>
            <FeatureList items={voordelen} className="mt-6" />
          </div>
          <Placeholder label="Detail aluminium profiel" className="min-h-64" />
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <Eyebrow>Profielen</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
            Drie toonaangevende aluminium merken
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {profielen.map((p) => (
              <Card key={p.title}>
                <Placeholder label={`Logo ${p.title}`} className="mb-4 min-h-12" />
                <CardEyebrow>{p.eyebrow}</CardEyebrow>
                <CardTitle>{p.title}</CardTitle>
                <CardBody>{p.body}</CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container className="text-center">
          <h2 className="text-2xl text-paper sm:text-3xl">
            Aluminium kozijnen laten plaatsen?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            We komen graag langs voor de inmeetservice (€ 49, verrekend bij
            doorgang) en bespreken welk systeem het best past bij uw bouwproject.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button href="/bouwkundige-aanpassingen" variant="secondary">Bouwkundige aanpassingen</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
