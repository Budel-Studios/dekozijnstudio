import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { Callout } from "@/components/ui/callout";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { ArrowUpRightIcon } from "@/components/icons";
import { isdeAanvraag, isdeInfo } from "@/data/subsidie";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "Subsidie voor isolatieglas en kozijnen",
  description:
    "Bekijk waar je op moet letten bij subsidie voor isolatieglas en kozijnen. Met een link naar de actuele voorwaarden van RVO.",
  path: "/subsidie",
});

const link = "font-medium text-forest underline underline-offset-2";

const vragen: FaqItem[] = [
  {
    question: "Krijg ik met nieuwe kozijnen altijd subsidie?",
    answer:
      "Nee. De ISDE stelt eisen aan je woning, het glas, het oppervlak en de uitvoering. Een nieuw kozijn geeft dus niet automatisch recht op subsidie. Controleer de actuele voorwaarden op rvo.nl voordat je ervan uitgaat.",
  },
  {
    question: "Kan ik subsidie krijgen als ik de kozijnen zelf plaats?",
    answer:
      "Volgens de voorwaarden van RVO moet een bouwbedrijf het werk uitvoeren; zelf isoleren telt niet. Materiaal zelf kopen is iets anders dan zelf plaatsen. Controleer bij twijfel de actuele voorwaarden bij RVO.",
  },
  {
    question: "Hoeveel subsidie krijg ik?",
    answer: (
      <>
        Dat hangt af van het glastype, of er nieuwe kozijnen bij horen, en het oppervlak. De actuele bedragen staan op{" "}
        <a href={isdeInfo.rvoUrl} target="_blank" rel="noopener noreferrer" className={link}>
          rvo.nl
        </a>
        . We noemen hier bewust geen bedragen, omdat ze regelmatig veranderen.
      </>
    ),
  },
  {
    question: "Trekken jullie de subsidie af van de prijs?",
    answer:
      "Nee. Je vraagt de ISDE zelf aan bij RVO en krijgt het geld, als je aanvraag wordt goedgekeurd, van RVO. In je voorstel staat de prijs die je aan ons betaalt.",
  },
  {
    question: "Telt glas in een nieuwe aanbouw of dakkapel mee?",
    answer:
      "Nee, volgens RVO gaat het om bestaand glasoppervlak. Glas in een nieuwe aanbouw, dakkapel of garage telt niet mee.",
  },
];

export default function SubsidiePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Subsidie", href: "/subsidie" }])),
        }}
      />
      <PageHero
        eyebrow="Subsidie"
        title="Subsidie bij het vervangen van glas en kozijnen"
        lead="Met HR++- of triple glas kom je mogelijk in aanmerking voor de ISDE-subsidie. Of dat zo is, hangt af van je woning, het glas en wie het werk uitvoert. Hier lees je waar je op let."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Subsidie" }]}
        actions={
          <>
            <Button href={isdeInfo.rvoUrl}>
              Actuele voorwaarden bij RVO <ArrowUpRightIcon />
            </Button>
            <Button href="/offerte" variant="secondary">
              Vraag een voorstel
            </Button>
          </>
        }
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Eyebrow>Voorwaarden</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Waar de ISDE voor glas om vraagt</h2>
            <p className="mt-4 leading-relaxed text-ink/70">{isdeInfo.mechanismDescription}</p>
            <FeatureList className="mt-6" items={[...isdeInfo.voorwaarden]} />
            <p className="mt-6 text-sm leading-relaxed text-ink/70">{isdeInfo.uitzondering}</p>
          </div>
          <div className="space-y-4 lg:sticky lg:top-32 lg:self-start">
            <Callout variant="warning" title={`Gecontroleerd op ${isdeInfo.gecontroleerd}`}>
              <p>
                {isdeInfo.disclaimer}{" "}
                <a href={isdeInfo.rvoUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  {isdeInfo.rvoLabel}
                </a>
              </p>
            </Callout>
            <Callout variant="disclaimer" title="Geen bedragen op deze pagina">
              <p>
                De subsidiebedragen verschillen per glastype en situatie en veranderen regelmatig. Je vindt ze altijd actueel
                bij RVO.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Wat wij aanleveren</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Gegevens voor je aanvraag</h2>
            <FeatureList className="mt-6" items={[...isdeAanvraag.watWijDoen]} />
          </div>
          <div>
            <Eyebrow>Wat jij doet</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Zelf regelen</h2>
            <FeatureList className="mt-6" items={[...isdeAanvraag.watJijDoet]} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Eyebrow>Checklist</Eyebrow>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Documenten die je nodig hebt</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {isdeAanvraag.benodigdheden.map((b) => (
              <li key={b} className="rounded-xl border border-mist bg-paper-soft px-5 py-4 text-sm font-medium text-ink">
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-ink/70">{isdeAanvraag.termijn}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            Twijfel je tussen HR++ en triple glas?{" "}
            <Link href="/kennis/hr-plus-plus-triple-glas" className={link}>
              Lees de verschillen
            </Link>{" "}
            of bekijk{" "}
            <Link href="/kozijnen-vervangen" className={link}>
              hoe het vervangen van kozijnen verloopt
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Vragen</Eyebrow>
          <h2 className="mb-8 mt-4 text-2xl text-ink sm:text-3xl">Vragen over subsidie</h2>
          <FAQ items={vragen} />
        </Container>
      </Section>

      <CtaBlok
        titel="Nieuwe kozijnen met isolatieglas?"
        lead="We vermelden glastype, oppervlak en uitvoeringsdatum op de factuur, zodat je de gegevens voor je aanvraag bij elkaar hebt."
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href={isdeInfo.rvoUrl} variant="light">
              Naar rvo.nl
            </Button>
          </>
        }
      />
    </>
  );
}
