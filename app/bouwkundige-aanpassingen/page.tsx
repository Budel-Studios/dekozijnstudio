import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { ProcessSteps, type Step } from "@/components/ui/process-steps";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import { MtbBouwBand } from "@/components/mtb-bouw-band";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { MODULES } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Opening vergroten, latei en metselwerk bij kozijnen",
  description:
    "Opening vergroten, latei vervangen of metselwerk herstellen bij nieuwe kozijnen? Lees wanneer bouwkundig werk nodig is en hoe MTB Bouw dat voor je uitvoert.",
  path: "/bouwkundige-aanpassingen",
});

const link = "font-medium text-forest underline underline-offset-2";

/** Situations in which extra building work is often (not always) needed. */
const wanneerNodig = [
  "Je wilt een grotere opening, bijvoorbeeld voor een schuifpui of openslaande tuindeuren",
  "Een raam wordt een deur, of er komt een nieuwe opening in de gevel",
  "De latei boven het kozijn is aangetast, bijvoorbeeld door roest bij een stalen latei",
  "Er zitten scheuren in het metselwerk rond of boven het kozijn",
  "Het nieuwe kozijn heeft een andere maat of diepte dan het oude, waardoor de aansluiting binnen of buiten verandert",
];

const werkzaamheden = [
  {
    eyebrow: "Opening",
    title: "Opening vergroten of verkleinen",
    body: "Voor meer licht of een ruimere doorgang wordt de muuropening aangepast. Bij een grotere opening hoort bijna altijd een nieuwe of zwaardere latei, zodat de muur erboven goed gedragen wordt.",
  },
  {
    eyebrow: "Constructie",
    title: "Latei plaatsen of vervangen",
    body: "De latei draagt het metselwerk boven het kozijn. Is die aangetast of komt er een bredere opening, dan wordt de latei vervangen. Bij grotere overspanningen kan een constructieve berekening nodig zijn.",
  },
  {
    eyebrow: "Gevel",
    title: "Metselwerk aanpassen en herstellen",
    body: "Na het aanpassen van een opening wordt het metselwerk aangevuld of hersteld, zodat de gevel weer dicht en netjes aansluit op het nieuwe kozijn.",
  },
  {
    eyebrow: "Binnen",
    title: "Afwerking rond het kozijn",
    body: "Verandert de opening, dan verandert ook de binnenkant: stucwerk, vensterbanken en aftimmering. Wat daarvan in je project zit, staat per onderdeel in je voorstel.",
  },
];

const stappen: Step[] = [
  {
    title: "Inmeten en beoordelen",
    description:
      "Voordat er iets besteld wordt, meten we bij je thuis in. We kijken dan ook naar de opening, de latei en het metselwerk eromheen. Zo weet je vooraf of er bouwkundig werk nodig is.",
  },
  {
    title: "Constructie en regels",
    description: (
      <>
        Bij een grotere opening kan een constructieve berekening nodig zijn. Verandert de gevel, dan kan ook een
        omgevingsvergunning nodig zijn. Lees{" "}
        <Link href="/kennis/kozijnen-en-vergunningen" className={link}>
          wanneer je een vergunning nodig hebt
        </Link>
        .
      </>
    ),
  },
  {
    title: "Voorstel per onderdeel",
    description:
      "Het bouwkundige werk staat apart in je voorstel, naast de kozijnen en de montage. Zo zie je wat erbij komt en kun je per onderdeel kiezen.",
  },
  {
    title: "Uitvoering",
    description:
      "MTB Bouw voert het bouwkundige werk uit. We stemmen dat af op het plaatsen van de kozijnen, zodat je niet zelf een aannemer hoeft te zoeken en te plannen.",
  },
  {
    title: "Als er iets onverwachts blijkt",
    description:
      "Soms zie je pas bij het verwijderen van een oud kozijn hoe de latei of het metselwerk erbij staat. Dan leggen we eerst uit wat we zien en wat de opties zijn. Extra werk gebeurt pas nadat je daarmee akkoord bent.",
  },
];

const vragen: FaqItem[] = [
  {
    question: "Is bij nieuwe kozijnen altijd bouwkundig werk nodig?",
    answer:
      "Nee. Komt het nieuwe kozijn in dezelfde opening en is de latei in goede staat, dan blijft het meestal bij verwijderen, plaatsen en afwerken. Bouwkundig werk komt pas aan de orde als de opening verandert of als de latei of het metselwerk aandacht nodig heeft.",
  },
  {
    question: "Hoe weet ik of mijn latei vervangen moet worden?",
    answer:
      "Scheuren in het metselwerk boven een kozijn, roestsporen of een doorgezakte strek kunnen erop wijzen dat de latei aandacht nodig heeft. Of dat echt zo is, beoordelen we bij het inmeten. Soms wordt het pas duidelijk bij het verwijderen van het oude kozijn.",
  },
  {
    question: "Moet ik zelf een aannemer zoeken voor het bouwkundige werk?",
    answer:
      "Nee. De Kozijnstudio is een handelsnaam van MTB Bouw B.V., een bouwbedrijf. MTB Bouw voert het bouwkundige werk uit, zodat je voor de kozijnen en de verbouwing één aanspreekpunt hebt.",
  },
  {
    question: "Wat kost een opening vergroten?",
    answer: (
      <>
        Dat hangt af van de breedte van de nieuwe opening, de latei die nodig is, het metselwerk en de afwerking binnen.
        In je voorstel staat het bouwkundige werk apart, per onderdeel. Op de pagina{" "}
        <Link href="/kosten" className={link}>
          kosten
        </Link>{" "}
        lees je hoe een prijs voor kozijnen is opgebouwd.
      </>
    ),
  },
  {
    question: "Heb ik een vergunning nodig voor een grotere opening?",
    answer: (
      <>
        Dat kan. Een gewijzigde gevelopening is vaak vergunningplichtig, zeker aan de voorkant of bij een monument of
        beschermd stadsgezicht. Doe de vergunningcheck voor je adres via het Omgevingsloket. Meer uitleg vind je in{" "}
        <Link href="/kennis/kozijnen-en-vergunningen" className={link}>
          heb ik een vergunning nodig voor nieuwe kozijnen?
        </Link>
      </>
    ),
  },
];

export default function BouwkundigeAanpassingenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { label: "Home", href: "/" },
              { label: "Bouwkundige aanpassingen", href: "/bouwkundige-aanpassingen" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Bouwkundige aanpassingen"
        title="Bouwkundige aanpassingen bij nieuwe kozijnen"
        lead="Past een nieuw kozijn niet zomaar in de bestaande opening, of wil je een grotere opening? Dan is bouwkundig werk nodig, zoals een opening vergroten, een latei plaatsen of metselwerk aanpassen. Dat werk doet MTB Bouw. Of het in jouw situatie nodig is, zien we bij het inmeten."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Bouwkundige aanpassingen" }]}
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/montage" variant="secondary">
              Bekijk de montage
            </Button>
          </>
        }
      />

      {/* Wanneer nodig */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Wanneer nodig</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Wanneer komt er bouwkundig werk bij?</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Bij veel projecten komt het nieuwe kozijn in dezelfde opening en is er geen bouwkundig werk nodig. In deze
              situaties is de kans groter dat het wel nodig is:
            </p>
            <FeatureList items={wanneerNodig} className="mt-6" />
          </div>
          <div className="rounded-card border border-mist bg-paper-soft p-7">
            <h2 className="text-xl text-ink">De situatie bepaalt het werk</h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              Twee woningen met dezelfde ramen kunnen een heel ander project zijn. Hoe de opening, de latei en het
              metselwerk erbij staan, zie je pas goed bij het inmeten, en soms pas bij het verwijderen van het oude
              kozijn. Daarom noemen we bouwkundig werk niet vooraf als vaste post, maar beoordelen we het per woning.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Wil je weten wat er gebeurt als je kozijnen in dezelfde opening vervangt? Lees{" "}
              <Link href="/kozijnen-vervangen" className={link}>
                hoe kozijnen vervangen in zijn werk gaat
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* Werkzaamheden */}
      <Section tone="soft">
        <Container>
          <Eyebrow>Werkzaamheden</Eyebrow>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Wat MTB Bouw kan uitvoeren</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink/70">
            De Kozijnstudio is een handelsnaam van MTB Bouw B.V. Het bouwkundige werk rond je kozijnen doet MTB Bouw.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {werkzaamheden.map((a) => (
              <Card key={a.title}>
                <CardEyebrow>{a.eyebrow}</CardEyebrow>
                <CardTitle>{a.title}</CardTitle>
                <CardBody>{a.body}</CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Zo gaat het */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Zo gaat het</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Van beoordeling tot uitvoering</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Het bouwkundige werk hoort bij je kozijnproject en staat in hetzelfde voorstel.
              {MODULES.configurator && (
                <>
                  {" "}
                  Plaats je een schuifpui in een grotere opening? Bekijk dan ook de{" "}
                  <Link href="/producten/schuifpuien" className={link}>
                    schuifpuien en vouwwanden
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
          <ProcessSteps steps={stappen} />
        </Container>
      </Section>

      <MtbBouwBand tone="soft" />

      {/* Vragen */}
      <Section>
        <Container width="narrow">
          <Eyebrow>Vragen</Eyebrow>
          <h2 className="mb-8 mt-4 text-2xl text-ink sm:text-3xl">Vragen over bouwkundige aanpassingen</h2>
          <FAQ items={vragen} />
        </Container>
      </Section>

      <CtaBlok
        titel="Een grotere opening of twijfel over de latei?"
        lead="Vertel ons wat je wilt veranderen. Je krijgt een voorstel waarin de kozijnen, de montage en het bouwkundige werk apart staan."
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
