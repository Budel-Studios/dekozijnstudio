import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { ProcessSteps } from "@/components/ui/process-steps";
import { Callout } from "@/components/ui/callout";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "Kozijnen vervangen in Enschede",
  description:
    "Kozijnen vervangen in Enschede of Twente? Lees hoe inmeten, verwijderen, plaatsen en afwerken worden voorbereid voor jouw woning.",
  path: "/kozijnen-vervangen",
});

const link = "font-medium text-forest underline underline-offset-2";

const redenen = [
  "Het kozijn tocht, klemt of sluit niet meer goed",
  "Houtrot, scheuren of loszittende delen",
  "Enkel glas of oud dubbel glas dat beslaat of lekt",
  "Je wilt minder warmteverlies en meer comfort bij het raam",
  "Je wilt minder onderhoud, of een andere uitstraling van je gevel",
  "Je verbouwt en de indeling of de opening verandert",
];

const stappen = [
  {
    title: "Je situatie bekijken",
    description:
      "We beginnen met je wensen en de staat van je huidige kozijnen. Foto's helpen al veel. Zo zien we of vervangen nodig is, of dat bijvoorbeeld ander glas of herstel ook kan.",
  },
  {
    title: "Inmeten",
    description:
      "Bij je thuis nemen we de exacte maten op en bekijken we de opening: het metselwerk, de latei, de vensterbank en de aansluiting binnen. Pas daarna kan er besteld worden.",
  },
  {
    title: "Voorstel en keuzes",
    description: (
      <>
        Je krijgt een voorstel met kozijn, glas, montage en eventueel bouwkundig werk apart. Wat de prijs bepaalt, lees
        je op de pagina{" "}
        <Link href="/kosten" className={link}>
          kosten
        </Link>
        .
      </>
    ),
  },
  {
    title: "Oude kozijnen verwijderen",
    description:
      "Op de montagedag wordt eerst afgedekt en beschermd. Daarna gaat het oude kozijn eruit, zo voorzichtig mogelijk voor het metselwerk en het stucwerk eromheen.",
  },
  {
    title: "Plaatsen",
    description:
      "Het nieuwe kozijn wordt waterpas en haaks gesteld en verankerd. Daarna gaat het glas erin, als dat niet al in het kozijn zit.",
  },
  {
    title: "Aansluiten en afwerken",
    description:
      "De naad tussen kozijn en muur wordt geïsoleerd en afgedicht. Binnen en buiten worden de randen afgewerkt.",
  },
  {
    title: "Controle en oplevering",
    description:
      "We controleren of alles goed sluit, draait en kiept, ruimen op en lopen het werk samen met je na. Blijft er een punt open, dan spreken we af wie het oplost en wanneer.",
  },
];

const vragen: FaqItem[] = [
  {
    question: "Kan ik thuisblijven tijdens het vervangen?",
    answer:
      "Ja, meestal wel. Er is wel een tijd een opening in de gevel en er komt stof vrij. Per ruimte stemmen we af wat er gebeurt, zodat je weet welke kamers op welk moment niet bruikbaar zijn.",
  },
  {
    question: "Wie haalt de oude kozijnen eruit?",
    answer: (
      <>
        Het verwijderen van de oude kozijnen en het afvoeren van het materiaal hoort bij de montage. Op de pagina{" "}
        <Link href="/montage" className={link}>
          montage
        </Link>{" "}
        zie je welke onderdelen bij het werk komen kijken.
      </>
    ),
  },
  {
    question: "Blijft mijn vensterbank liggen?",
    answer:
      "Vaak wel. Past de bestaande vensterbank niet meer bij de nieuwe kozijnen, of raakt hij beschadigd bij het verwijderen, dan bespreken we een nieuwe. Dat zie je terug in je voorstel.",
  },
  {
    question: "Wat gebeurt er met het stucwerk rond het kozijn?",
    answer:
      "Bij het verwijderen kan het stucwerk rond het oude kozijn beschadigen. Hoeveel, zie je pas bij het inmeten of tijdens de demontage. Of herstel en schilderwerk in je voorstel zitten, staat er per regel in.",
  },
  {
    question: "Wat moet ik zelf vrijmaken?",
    answer:
      "Haal gordijnen, rails, jaloezieën en spullen op de vensterbank weg, en maak ongeveer een meter ruimte voor het raam vrij. Zo kan er veilig en schoon gewerkt worden.",
  },
  {
    question: "Wie is mijn aanspreekpunt als er na de oplevering iets is?",
    answer: (
      <>
        Je houdt één aanspreekpunt, ook voor bouwkundig werk door MTB Bouw. Heb je een vraag of een restpunt,{" "}
        <Link href="/contact" className={link}>
          neem dan contact op
        </Link>
        .
      </>
    ),
  },
];

export default function KozijnenVervangenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { label: "Home", href: "/" },
              { label: "Kozijnen vervangen", href: "/kozijnen-vervangen" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="Kozijnen vervangen"
        title="Kozijnen vervangen met overzicht van begin tot eind"
        lead="Nieuwe kozijnen betekenen werk aan je woning. Hier lees je wat er gebeurt, van het eerste kijken tot de oplevering, en welke dingen van jouw situatie afhangen."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kozijnen vervangen" }]}
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
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Waarom vervangen</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Redenen om je kozijnen te vervangen</h2>
            <FeatureList className="mt-6" items={redenen} />
          </div>
          <div className="rounded-card border border-mist bg-paper-soft p-7">
            <h2 className="text-xl text-ink">Is vervangen altijd nodig?</h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              Nee. Zijn de kozijnen zelf nog goed en gaat het vooral om warmteverlies, dan kan ander glas soms genoeg zijn.
              Is er plaatselijk houtrot, dan is herstel soms mogelijk. We bekijken eerst wat er echt nodig is.
            </p>
            <p className="mt-4 text-sm text-ink/70">
              <Link href="/kennis/levensduur-kozijnen" className={link}>
                Hoe lang gaan kozijnen mee?
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Zo gaat het</Eyebrow>
          <h2 className="mb-10 mt-4 text-2xl text-ink sm:text-3xl">Van bestaande situatie tot oplevering</h2>
          <ProcessSteps steps={stappen} />
          <Callout variant="info" title="Je situatie bepaalt het werk">
            <p>
              Of er extra herstel of bouwkundig werk nodig is, hangt af van wat je woning laat zien bij het inmeten en
              het verwijderen. Een grotere opening of een nieuwe latei is bouwkundig werk; dat doet{" "}
              <Link href="/bouwkundige-aanpassingen" className={link}>
                MTB Bouw
              </Link>
              .
            </p>
          </Callout>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Planning</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Planning en overlast</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Hoe lang het werk duurt, hangt af van het aantal kozijnen, de bereikbaarheid en eventueel bouwkundig werk.
              Kozijnen op de verdieping kunnen een steiger of hoogwerker vragen. De planning stemmen we vooraf met je af,
              en de verwachte levertijd staat in je voorstel.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              We houden de overlast zo beperkt mogelijk en spreken vooraf af welke ruimtes wanneer aan de beurt zijn,
              zodat je weet waar je aan toe bent.
            </p>
          </div>
          <div>
            <Eyebrow>Verder lezen</Eyebrow>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/montage" className={link}>
                  Wat er bij het monteren komt kijken
                </Link>
              </li>
              <li>
                <Link href="/kosten" className={link}>
                  Wat kosten nieuwe kozijnen inclusief montage?
                </Link>
              </li>
              <li>
                <Link href="/kennis/hr-plus-plus-triple-glas" className={link}>
                  HR++ of triple glas kiezen
                </Link>
              </li>
              <li>
                <Link href="/kennis/kozijnen-en-vergunningen" className={link}>
                  Heb je een vergunning nodig?
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Vragen</Eyebrow>
          <h2 className="mb-8 mt-4 text-2xl text-ink sm:text-3xl">Vragen over kozijnen vervangen</h2>
          <FAQ items={vragen} />
        </Container>
      </Section>

      <CtaBlok
        titel="Je kozijnen laten vervangen?"
        lead="Stuur ons een paar foto's en vertel wat je wilt. Dan kijken we wat er in jouw woning nodig is."
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
