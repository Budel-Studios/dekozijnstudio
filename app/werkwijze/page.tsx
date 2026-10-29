import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProcessSteps, type Step } from "@/components/ui/process-steps";
import { Callout } from "@/components/ui/callout";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { feit } from "@/data/feiten";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "Van eerste vraag tot nieuwe kozijnen",
  description:
    "Van eerste foto's en wensen tot inmeten, een voorstel en uitvoering. Ontdek hoe een kozijntraject bij De Kozijnstudio wordt voorbereid.",
  path: "/werkwijze",
});

const link = "font-medium text-forest underline underline-offset-2";

function stappen(inmeetKosten: string | null): Step[] {
  return [
    {
      title: "Eerste informatie",
      description: (
        <>
          Je vertelt wat je wilt: welke kozijnen, welke wensen, en eventueel foto&apos;s van de huidige situatie. Dat kan via
          het{" "}
          <Link href="/offerte" className={link}>
            aanvraagformulier
          </Link>
          , per telefoon of via WhatsApp.
        </>
      ),
    },
    {
      title: "Advies",
      description:
        "We bespreken de mogelijkheden: materiaal, profiel, glas, kleur en indeling. We leggen uit wat elke keuze betekent voor uitstraling, onderhoud en prijs.",
    },
    {
      title: "Inmeten",
      description: inmeetKosten
        ? `We meten bij je thuis in en bekijken de bestaande opening en de afwerking binnen. ${inmeetKosten}.`
        : "We meten bij je thuis in en bekijken de bestaande opening en de afwerking binnen. Wat het inmeten kost, hoor je vooraf.",
    },
    {
      title: "Voorstel met specificatie",
      description: (
        <>
          Je krijgt een voorstel met per onderdeel wat er geleverd en gedaan wordt: kozijn, glas, montage, afwerking en
          eventueel bouwkundig werk, inclusief btw. Zie ook{" "}
          <Link href="/kosten" className={link}>
            hoe een prijs is opgebouwd
          </Link>
          .
        </>
      ),
    },
    {
      title: "Akkoord",
      description:
        "Klopt alles, dan geef je akkoord. Loop de specificatie goed na: maten, draairichtingen, kleur en glas. Bij maatwerk vragen we een aanbetaling voor de productie.",
    },
    {
      title: "Bestelling en productie",
      description:
        "Na je akkoord bestellen we de kozijnen op maat. Omdat ze speciaal voor jouw woning gemaakt worden, kan er na de bestelling meestal weinig meer aan veranderen.",
    },
    {
      title: "Planning",
      description:
        "We spreken een montagedatum met je af en vertellen wat je vooraf kunt voorbereiden. De verwachte levertijd staat in je voorstel.",
    },
    {
      title: "Montage",
      description: (
        <>
          De oude kozijnen gaan eruit, de nieuwe worden geplaatst, aangesloten en afgewerkt. Wat daar allemaal bij komt
          kijken, lees je op de pagina{" "}
          <Link href="/montage" className={link}>
            montage
          </Link>
          .
        </>
      ),
    },
    {
      title: "Oplevering",
      description:
        "We lopen het werk samen met je na en ruimen op. Het restant van de rekening betaal je na de montage.",
    },
    {
      title: "Nazorg",
      description: (
        <>
          Heb je na de oplevering een vraag of een punt, dan houd je hetzelfde aanspreekpunt.{" "}
          <Link href="/kennis/kozijnen-onderhouden" className={link}>
            Zo onderhoud je je nieuwe kozijnen
          </Link>
          .
        </>
      ),
    },
  ];
}

const vragen: FaqItem[] = [
  {
    question: "Zit ik ergens aan vast als ik een voorstel aanvraag?",
    answer:
      "Nee. Een aanvraag en een voorstel zijn vrijblijvend. Pas als je akkoord geeft op het voorstel, bestellen we.",
  },
  {
    question: "Kan ik na mijn akkoord nog iets wijzigen?",
    answer:
      "Tot de bestelling vaak wel. Daarna worden de kozijnen op maat gemaakt en is wijzigen meestal niet meer mogelijk. Daarom nemen we de specificatie vóór je akkoord samen door.",
  },
  {
    question: "Wie is mijn aanspreekpunt?",
    answer:
      "Je hebt één aanspreekpunt voor het hele traject, ook als er bouwkundig werk door MTB Bouw bij komt.",
  },
];

export default function WerkwijzePage() {
  const inmeetKosten = feit("inmeetservice");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Werkwijze", href: "/werkwijze" }])),
        }}
      />
      <PageHero
        eyebrow="Werkwijze"
        title="Zo werken we aan jouw nieuwe kozijnen"
        lead="Van je eerste vraag tot de nazorg: zo verloopt een kozijntraject, en op welke momenten jij beslist."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Werkwijze" }]}
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/montage" variant="secondary">
              Wat bij montage hoort
            </Button>
          </>
        }
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Eyebrow>Het traject</Eyebrow>
            <h2 className="mb-10 mt-4 text-2xl text-ink sm:text-3xl">Tien stappen, drie beslismomenten</h2>
            <ProcessSteps steps={stappen(inmeetKosten)} />
          </div>
          <div className="space-y-4 lg:sticky lg:top-32 lg:self-start">
            <Callout variant="info" title="Jij beslist op drie momenten">
              <ul className="list-disc space-y-1 pl-5">
                <li>Of je een afspraak voor inmeten wilt</li>
                <li>Of je akkoord gaat met het voorstel</li>
                <li>Of je extra werk wilt als er onderweg iets blijkt</li>
              </ul>
            </Callout>
            <Callout variant="disclaimer">
              <p>
                Gaat het om een grotere opening of andere bouwkundige aanpassingen? Dan komt{" "}
                <Link href="/bouwkundige-aanpassingen" className={link}>
                  MTB Bouw
                </Link>{" "}
                erbij, in dezelfde planning.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Vragen</Eyebrow>
          <h2 className="mb-8 mt-4 text-2xl text-ink sm:text-3xl">Vragen over de werkwijze</h2>
          <FAQ items={vragen} />
        </Container>
      </Section>

      <CtaBlok
        titel="Klaar voor de eerste stap?"
        lead="Vertel ons wat je wilt veranderen aan je kozijnen. Foto's helpen, maar zijn niet nodig."
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/contact" variant="light">
              Neem contact op
            </Button>
          </>
        }
      />
    </>
  );
}
