import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PriceTable } from "@/components/ui/price-table";
import { Callout } from "@/components/ui/callout";
import { FeatureList } from "@/components/ui/feature-list";
import { montageCategories, investmentExample, inmeetservice } from "@/data/prices";

export const metadata: Metadata = {
  title: "Prijzen",
  description:
    "Transparante kozijnprijzen incl. btw — montage, levering en bouwkundige aanpassingen apart vermeld. Geen verborgen kosten. Twente & Oost-Nederland.",
  alternates: { canonical: "/prijzen" },
  openGraph: {
    title: "Prijzen — De Kozijnstudio",
    description: "Alle kosten transparant: kozijnen, montage en bouwkundige aanpassingen incl. btw, geen verborgen marges.",
  },
};

const filosofie = [
  "Alle bedragen zijn consumentenprijzen incl. 21% btw",
  "Montage, levering en bouwkundig werk worden apart gespecificeerd",
  "Uw offerte bevat géén 'pm'-posten of open eindjes",
  "Meerwerk wordt altijd vooraf besproken en schriftelijk vastgelegd",
  "Betaling: kleine aanbetaling bij maatwerk, montage achteraf",
];

export default function PrijzenPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparante prijzen"
        title="Wat kosten nieuwe kozijnen? Wij zijn eerlijk."
        lead="De kozijnenmarkt staat bekend om onduidelijke offertes. Wij doen het anders: alle kosten transparant, gespecificeerd per onderdeel, altijd incl. btw."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Prijzen" }]}
        actions={
          <>
            <Button href="/offerte-aanvragen">Offerte op maat</Button>
            <Button href="/isde-subsidie" variant="secondary">ISDE-subsidie</Button>
          </>
        }
      />

      {/* Filosofie */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Onze prijsfilosofie</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Geen verborgen kosten. Nooit.
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Wij geloven dat een eerlijke prijs begint bij volledige
              transparantie. U ontvangt een offerte met elke kostenpost
              apart — materiaal, montage, bouwkundig werk en eventuele
              subsidie. Zo maakt u een weloverwogen beslissing.
            </p>
            <FeatureList items={filosofie} className="mt-6" />
          </div>
          <div className="space-y-4">
            <Callout variant="info" title={`Inmeetservice — ${inmeetservice.price}`}>
              <p>{inmeetservice.note}</p>
            </Callout>
            <Callout variant="disclaimer">
              <p>
                Onderstaande tarieven zijn indicatief en worden bepaald op basis
                van de specifieke situatie tijdens de inmeetservice. Exacte
                kosten staan altijd vermeld in uw persoonlijke offerte.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      {/* Tarieven */}
      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Tarieven</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
            Indicatieve tarieven (incl. btw)
          </h2>
          <div className="space-y-6">
            {montageCategories.map((cat) => (
              <PriceTable
                key={cat.id}
                caption={cat.title}
                rows={cat.rows.map((r) => ({
                  label: r.label,
                  price: r.price,
                  from: r.from,
                  note: r.note,
                }))}
                footnote={cat.footnote}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Investeringsoverzicht */}
      <Section>
        <Container width="narrow">
          <Eyebrow>Voorbeeld</Eyebrow>
          <h2 className="mt-4 mb-6 text-2xl text-ink sm:text-3xl">
            Zo ziet een investeringsoverzicht eruit
          </h2>
          <p className="mb-6 leading-relaxed text-ink/65">
            In uw persoonlijke offerte ziet u precies dit format — elk
            onderdeel apart, inclusief eventuele ISDE-subsidie als aftrekpost.
          </p>
          <PriceTable
            caption="Voorbeeld investeringsoverzicht"
            rows={investmentExample.map((r) => ({
              label: r.label,
              price: r.price,
              from: r.from,
              note: r.note,
            }))}
            footnote="Indicatief voorbeeld. Exacte bedragen worden vastgesteld na de inmeetservice."
          />
          <div className="mt-8">
            <Button href="/offerte-aanvragen">Vraag uw persoonlijke offerte aan</Button>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ink">
        <Container className="text-center">
          <h2 className="text-2xl text-paper sm:text-3xl">
            Weet exact wat u gaat betalen
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            Vraag een vrijblijvende offerte aan. Na de inmeetservice (
            {inmeetservice.price}, verrekend bij doorgang) ontvangt u een
            volledig gespecificeerde offerte — geen verrassingen achteraf.
          </p>
          <div className="mt-8">
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
