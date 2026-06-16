import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { Placeholder } from "@/components/ui/placeholder";

export const metadata: Metadata = {
  title: "Kunststof kozijnen",
  description:
    "Onderhoudsvriendelijke kunststof kozijnen op maat. Profielen van Schüco en Gealan, HR++ en triple glas, transparante prijzen incl. btw. Twente & Oost-Nederland.",
  alternates: { canonical: "/kunststof-kozijnen" },
  openGraph: {
    title: "Kunststof kozijnen — De Kozijnstudio",
    description: "Op maat, energiezuinig en onderhoudsvriendelijk. Schüco en Gealan profielen, transparante prijzen incl. btw.",
  },
};

const voordelen = [
  "Geen schilderwerk of onderhoud nodig",
  "Uitstekende isolatiewaarden (HR++ of triple glas)",
  "Leverbaar in elke kleur en houtstructuur",
  "Lange levensduur — tot 50 jaar of meer",
  "Draaikiepramen, vaste ramen, schuifpuien op maat",
  "Profielen van Schüco en Gealan",
];

const profielen = [
  {
    eyebrow: "Primair profiel",
    title: "Schüco",
    body: "Duits topkwaliteitsprofiel met een bewezen track record in de bouw. Leverbaar in een breed kleurenpallet en meerdere profielbreedte-series.",
  },
  {
    eyebrow: "Alternatief profiel",
    title: "Gealan",
    body: "Hoogwaardig PVC-profiel met uitstekende thermische eigenschappen. Populaire keuze voor woningen waar prijs-kwaliteitverhouding centraal staat.",
  },
];

export default function KunststofKozijnenPage() {
  return (
    <>
      <PageHero
        eyebrow="Kunststof kozijnen"
        title="Onderhoudsvriendelijk, energiezuinig en op maat."
        lead="Kunststof kozijnen zijn de meest gekozen optie voor Nederlandse woningen. Geen schilderwerk, uitstekende isolatie en een lange levensduur — tegen een transparante prijs incl. btw."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kozijnen" }, { label: "Kunststof kozijnen" }]}
        actions={
          <>
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button href="/prijzen" variant="secondary">Bekijk prijzen</Button>
          </>
        }
        media={<Placeholder label="Kunststof kozijnen — sfeerfoto" className="min-h-72 lg:min-h-80" />}
      />

      {/* Voordelen */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Voordelen</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Waarom kiezen voor kunststof?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              PVC-kozijnen hebben in de afgelopen decennia bewezen te presteren.
              Ze zijn weerbestendig, kleurvast en vereisen nauwelijks onderhoud.
              Combineer ze met HR++- of triple glas voor optimale
              energieprestaties en mogelijk ISDE-subsidie.
            </p>
            <FeatureList items={voordelen} className="mt-6" />
          </div>
          <Placeholder label="Detail kozijn — kunststof profiel" className="min-h-64" />
        </Container>
      </Section>

      {/* Profielen */}
      <Section tone="soft">
        <Container>
          <Eyebrow>Profielen</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
            Schüco en Gealan — beide toptitels
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {profielen.map((p) => (
              <Card key={p.title}>
                <Placeholder label={`Logo ${p.title}`} className="mb-4 min-h-16" />
                <CardEyebrow>{p.eyebrow}</CardEyebrow>
                <CardTitle>{p.title}</CardTitle>
                <CardBody>{p.body}</CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Beglazing */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Placeholder label="HR++ glas detail" className="min-h-64" />
          <div>
            <Eyebrow>Beglazing</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              HR++ of triple glas — wat past bij u?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              HR++-glas biedt uitstekende isolatie voor de meeste woningen.
              Triple glas gaat een stap verder en is interessant voor passief
              bouwen, hogere geluidsisolatie of wanneer u maximaal wilt
              profiteren van ISDE-subsidie.
            </p>
            <p className="mt-4 leading-relaxed text-ink/65">
              Beide opties komen in aanmerking voor de ISDE-subsidie bij
              vervanging van enkel- of dubbelglas. Wij adviseren u welke keuze
              het best aansluit bij uw woning en budget.
            </p>
            <div className="mt-6">
              <Button href="/isde-subsidie" variant="secondary">
                Meer over ISDE-subsidie
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ink">
        <Container className="text-center">
          <h2 className="text-2xl text-paper sm:text-3xl">
            Benieuwd wat kunststof kozijnen kosten?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            Na de inmeetservice (€ 49, verrekend bij doorgang) ontvangt u een
            volledig gespecificeerde offerte — materiaal, montage en eventuele
            bouwkundige aanpassingen apart vermeld.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button href="/montage" variant="secondary">Over de montage</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
