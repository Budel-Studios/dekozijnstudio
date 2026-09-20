import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PriceTable } from "@/components/ui/price-table";
import { Callout } from "@/components/ui/callout";
import { FeatureList } from "@/components/ui/feature-list";
import { MateriaalVergelijking } from "@/components/prijzen/materiaal-vergelijking";
import { MontageTarieven } from "@/components/prijzen/montage-tarieven";
import { montageCategories, investmentExample, inmeetservice } from "@/data/prices";
import { SHOW_PRODUCT_PRICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Montage & kosten",
  description:
    "Montagetarieven en bouwkundige kosten incl. btw, apart gespecificeerd. Uw kozijnprijs stellen we op maat vast. Twente & Oost-Nederland.",
  alternates: { canonical: "/prijzen" },
  openGraph: {
    title: "Montage & kosten — De Kozijnstudio",
    description: "Montage en bouwkundig werk transparant gespecificeerd incl. btw, geen verborgen marges.",
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
        eyebrow="Montage & kosten"
        title="Wat kost het plaatsen van kozijnen?"
        lead="De montage- en bouwkundige kosten ziet u hier open en bloot, altijd incl. btw. Uw kozijnprijs stellen we op maat vast — elk huis en elke situatie is anders."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Montage & kosten" }]}
        actions={
          <>
            <Button href="/offerte-aanvragen">Prijs op maat aanvragen</Button>
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
            {!SHOW_PRODUCT_PRICES && (
              <p className="mt-4 leading-relaxed text-ink/65">
                Kozijnprijzen tonen we bewust nog niet online: een kozijn is
                maatwerk, en een bedrag zonder uw situatie erbij zegt weinig.
                De montage- en bouwkundige tarieven hieronder gelden wél voor
                iedereen.
              </p>
            )}
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
          <Eyebrow>Montagetarieven</Eyebrow>
          <h2 className="mt-4 mb-3 text-2xl text-ink sm:text-3xl">
            Wat montage kost, incl. btw
          </h2>
          <p className="mb-8 leading-relaxed text-ink/65">
            Dit zijn onze werkelijke tarieven per werkzaamheid. Welke regels
            voor uw project gelden, hangt af van de situatie — dat rekenen we
            samen met u door.
          </p>
          <MontageTarieven />

          <h3 className="mt-14 mb-6 text-xl text-ink">
            Bouwkundige aanpassingen
          </h3>
          <div className="space-y-6">
            {montageCategories
              .filter((cat) => cat.id !== "montage-basis")
              .map((cat) => (
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

      {/* Materiaalvergelijking — alleen met zichtbare productprijzen */}
      {SHOW_PRODUCT_PRICES && (
        <Section>
          <Container>
            <Eyebrow>Vergelijk materialen</Eyebrow>
            <h2 className="mt-4 mb-3 text-2xl text-ink sm:text-3xl">
              Kunststof, hout of aluminium — wat kost het?
            </h2>
            <p className="mb-8 max-w-2xl leading-relaxed text-ink/65">
              Zo ziet u in één oogopslag het prijsverschil tussen de materialen
              voor dezelfde voorbeeldconfiguraties.
            </p>
            <MateriaalVergelijking />
          </Container>
        </Section>
      )}

      {/* Investeringsoverzicht */}
      <Section tone="soft">
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
