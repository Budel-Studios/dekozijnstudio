import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { ProcessSteps } from "@/components/ui/process-steps";
import { Placeholder } from "@/components/ui/placeholder";
import { MtbBouwBand } from "@/components/mtb-bouw-band";
import { inmeetservice } from "@/data/prices";
import { serviceSchema, jsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Montage",
  description:
    "Vakkundige montage van kozijnen door eigen monteurs. Van inmeten tot sleutelklaar, inclusief bouwkundige aanpassingen via MTB Bouw. Twente & Oost-Nederland.",
  alternates: { canonical: "/montage" },
};

const inbegrepen = [
  "Verwijdering van de oude kozijnen (indien gewenst)",
  "Plaatsing van de nieuwe kozijnen inclusief kit- en isolatiewerk",
  "Controle op waterpas, lood en klemvrijheid",
  "Aansluitingen conform bouwtechnische normen",
  "Afvoer van oud materiaal en eindreiniging van het werkgebied",
];

const montageSteps = [
  {
    title: "Inmeetservice",
    description: `Wij komen langs om de exacte maten op te nemen en uw situatie te beoordelen. Kosten: ${inmeetservice.price}. ${inmeetservice.note}`,
  },
  {
    title: "Offerte",
    description:
      "U ontvangt een gespecificeerde offerte met materiaal, montagekosten en eventuele bouwkundige meerwerken — alles incl. btw, geen verborgen kosten.",
  },
  {
    title: "Productie & levering",
    description:
      "Na akkoord gaan de kozijnen in productie. Levertijd is doorgaans ± 8 weken. U wordt tijdig geïnformeerd over de exacte montagedatum.",
  },
  {
    title: "Montagdag(en)",
    description:
      "Onze monteurs plaatsen zoveel mogelijk kozijnen per dag om de overlast te beperken. De montage verloopt doorgaans binnen één week.",
  },
  {
    title: "Oplevering",
    description:
      "We lopen samen de oplevering door. Uw woning is na afloop wind- en waterdicht. Montage wordt achteraf gefactureerd.",
  },
];

export default function MontagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            serviceSchema({
              name: "Kozijnmontage",
              description: "Professionele montage van kunststof, houten en aluminium kozijnen, inclusief afwerking en afvoer van het oude kozijn.",
              path: "/montage",
              serviceType: "Kozijnen plaatsen",
            }),
          ),
        }}
      />

      <PageHero
        eyebrow="Montage"
        title="Van kozijn tot sleutelklaar — wij regelen het."
        lead={`Onze eigen monteurs plaatsen uw nieuwe kozijnen vakkundig en netjes. Van de inmeetservice (${inmeetservice.price}) tot de oplevering: u heeft één aanspreekpunt.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Montage" }]}
        actions={
          <>
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button href="/bouwkundige-aanpassingen" variant="secondary">Bouwkundige aanpassingen</Button>
          </>
        }
        media={<Placeholder label="Montage in uitvoering" className="min-h-72 lg:min-h-80" />}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Inbegrepen</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Wat zit er standaard in de montage?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Onze montageprijzen zijn allesomvattend. Hieronder ziet u wat
              standaard is inbegrepen. Meerwerken (zoals het vergroten van een
              muuropening) worden altijd apart en vooraf gecommuniceerd.
            </p>
            <FeatureList items={inbegrepen} className="mt-6" />
          </div>
          <Placeholder label="Montage detail — kitten/isoleren" className="min-h-56" />
        </Container>
      </Section>

      <Section tone="soft">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Het proces</Eyebrow>
            <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
              Stap voor stap naar nieuwe kozijnen
            </h2>
            <ProcessSteps steps={montageSteps} />
          </div>
          <div className="lg:mt-16">
            <Placeholder label="Tijdlijn illustratie" className="min-h-64 lg:sticky lg:top-32" />
          </div>
        </Container>
      </Section>

      <MtbBouwBand tone="paper" />

      <Section tone="ink">
        <Container className="text-center">
          <h2 className="text-2xl text-paper sm:text-3xl">
            Montage laten uitvoeren?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            Plan de inmeetservice in. {inmeetservice.price} — volledig verrekend
            bij doorgang. Daarna ontvangt u een transparante offerte.
          </p>
          <div className="mt-8">
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
