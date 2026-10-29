import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import { MtbBouwBand } from "@/components/mtb-bouw-band";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { ScopeTabel } from "@/components/montage/scope-tabel";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "Kozijnen laten monteren in Twente",
  description:
    "Wat hoort bij kozijnen monteren? Bekijk de aandachtspunten voor demontage, aansluitingen, afwerking en oplevering in jouw woning.",
  path: "/montage",
});

const link = "font-medium text-forest underline underline-offset-2";

const voorbereiding = [
  "Haal gordijnen, rails en jaloezieën weg bij de ramen die vervangen worden",
  "Maak de vensterbanken leeg en zorg voor ongeveer een meter vrije ruimte voor het raam",
  "Zorg dat de plek voor de gevel bereikbaar is, ook voor een eventuele steiger of hoogwerker",
  "Laat weten als er alarmsensoren, zonwering of horren aan de kozijnen vastzitten",
];

const vragen: FaqItem[] = [
  {
    question: "Hoe weet ik wat er in mijn montage zit?",
    answer:
      "In je voorstel staat de montage per onderdeel uitgesplitst: verwijderen, plaatsen, afwerken en eventueel extra werk. Wat niet in het voorstel staat, wordt pas uitgevoerd nadat we het met je hebben besproken.",
  },
  {
    question: "Wat als er bij het verwijderen iets onverwachts tevoorschijn komt?",
    answer:
      "Soms blijkt pas bij het verwijderen dat bijvoorbeeld een latei of het metselwerk eromheen slecht is. Dan leggen we je uit wat we zien en wat de opties zijn, voordat er extra werk wordt gedaan.",
  },
  {
    question: "Kunnen jullie ook de opening groter maken?",
    answer: (
      <>
        Ja. Een opening vergroten, een nieuwe latei plaatsen of metselwerk aanpassen is bouwkundig werk. Dat doet MTB Bouw,
        in dezelfde planning. Lees meer over{" "}
        <Link href="/bouwkundige-aanpassingen" className={link}>
          bouwkundige aanpassingen
        </Link>
        .
      </>
    ),
  },
  {
    question: "Wat kost montage?",
    answer: (
      <>
        Dat hangt af van het aantal en de grootte van de kozijnen, de bereikbaarheid en de afwerking. Op de pagina{" "}
        <Link href="/kosten" className={link}>
          kosten
        </Link>{" "}
        lees je hoe de prijs is opgebouwd.
      </>
    ),
  },
];

export default function MontagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Montage", href: "/montage" }])),
        }}
      />
      <PageHero
        eyebrow="Montage"
        title="Wat komt er kijken bij kozijnen monteren?"
        lead="Een nieuw kozijn is zo goed als de manier waarop het geplaatst en aangesloten wordt. Hier zie je welke onderdelen bij het werk horen, waar je op let, en wat jij zelf kunt voorbereiden."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Montage" }]}
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/werkwijze" variant="secondary">
              Bekijk onze werkwijze
            </Button>
          </>
        }
      />

      <Section>
        <Container>
          <Eyebrow>Onderdelen</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-2xl text-ink sm:text-3xl">Wat er bij het monteren gebeurt</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink/70">
            Van inmeten tot oplevering. In je voorstel zie je per onderdeel terug wat er voor jouw woning gedaan wordt.
          </p>
          <div className="mt-8">
            <ScopeTabel />
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Aansluitingen</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Waarom de aansluiting zo belangrijk is</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Tussen het kozijn en de muur zit een naad. Die naad wordt geïsoleerd en aan de binnen- en buitenkant
              afgedicht. Gaat dat mis, dan kan een nieuw kozijn alsnog tochten, of kan er vocht in de muur komen. Daarom
              besteden we evenveel aandacht aan de aansluiting als aan het kozijn zelf.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Last van beslagen ramen?{" "}
              <Link href="/kennis/condens-op-ramen" className={link}>
                Lees wat condens op ramen betekent
              </Link>
              .
            </p>
          </div>
          <div>
            <Eyebrow>Voorbereiding</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Wat je zelf kunt voorbereiden</h2>
            <FeatureList className="mt-6" items={voorbereiding} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Oplevering</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Samen nalopen</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Na het werk lopen we samen de kozijnen na: sluiten, draaien en kiepen, de afwerking binnen en buiten. Je krijgt
              uitleg over het onderhoud van het hang- en sluitwerk en de rubbers. Blijft er een punt open, dan spreken we af
              wie het oplost en wanneer.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              <Link href="/kennis/kozijnen-onderhouden" className={link}>
                Zo houd je je kozijnen mooi en soepel
              </Link>
            </p>
          </div>
          <div className="rounded-card border border-mist bg-paper-soft p-7">
            <h2 className="text-xl text-ink">Meer weten over het hele traject?</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/kozijnen-vervangen" className={link}>
                  Kozijnen vervangen: van bestaande situatie tot oplevering
                </Link>
              </li>
              <li>
                <Link href="/werkwijze" className={link}>
                  Onze werkwijze, van eerste vraag tot nazorg
                </Link>
              </li>
              <li>
                <Link href="/kosten" className={link}>
                  Wat montage en kozijnen kosten
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      <MtbBouwBand tone="paper" />

      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Vragen</Eyebrow>
          <h2 className="mb-8 mt-4 text-2xl text-ink sm:text-3xl">Vragen over montage</h2>
          <FAQ items={vragen} />
        </Container>
      </Section>

      <CtaBlok
        titel="Je kozijnen laten monteren?"
        lead="Vertel ons wat je wilt. Je krijgt een voorstel waarin de montage per onderdeel staat."
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/kosten" variant="light">
              Bekijk de prijsopbouw
            </Button>
          </>
        }
      />
    </>
  );
}
