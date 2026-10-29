import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Callout } from "@/components/ui/callout";
import { FeatureList } from "@/components/ui/feature-list";
import { ProcessSteps, type Step } from "@/components/ui/process-steps";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { MODULES } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Aanbrengbonus: beveel ons aan",
  description:
    "Ben je klant en ken je iemand die ook nieuwe kozijnen wil? Draag diegene aan en ontvang een bonus als die persoon klant wordt. Zo werkt de aanbrengbonus.",
  path: "/aanbrengbonus",
});

const link = "font-medium text-forest underline underline-offset-2 hover:no-underline";

const stappen: Step[] = [
  {
    title: "Je wordt klant",
    description:
      "Je gaat akkoord met het voorstel voor je eigen kozijnen. Vanaf dat moment loopt je aanbrengjaar: de periode waarin je anderen kunt aandragen.",
  },
  {
    title: "Je krijgt een aanbrengcode",
    description: "Na je akkoord krijg je van ons een persoonlijke aanbrengcode.",
  },
  {
    title: "Je beveelt ons aan",
    description:
      "Ken je iemand die ook nieuwe kozijnen wil, zoals een buur, vriend of familielid? Geef je aanbrengcode aan diegene door.",
  },
  {
    title: "Die persoon wordt klant",
    description:
      "De persoon die je aandraagt noemt jouw code bij de aanvraag en geeft daarna zelf opdracht aan De Kozijnstudio.",
  },
  {
    title: "Je ontvangt je bonus",
    description: (
      <>
        Is het project van die persoon opgeleverd en betaald, dan ontvang je je bonus. Hoe hoog de bonus is en hoe we
        hem uitkeren, staat in de{" "}
        <Link href="/aanbrengbonus-voorwaarden" className={link}>
          voorwaarden
        </Link>
        .
      </>
    ),
  },
];

const goedOmTeWeten = [
  "Je hebt zelf een opdracht gegeven aan De Kozijnstudio",
  "Je draagt iemand aan binnen je aanbrengjaar",
  "De persoon die je aandraagt, had nog geen aanvraag of opdracht bij ons lopen",
  "Je krijgt de bonus nadat het aangedragen project is opgeleverd en betaald",
  "De aanbrengbonus is persoonlijk en niet overdraagbaar",
];

export default function AanbrengbonusPage() {
  if (!MODULES.aanbrengbonus) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { label: "Home", href: "/" },
              { label: "Aanbrengbonus", href: "/aanbrengbonus" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Aanbrengbonus"
        title="Beveel ons aan en ontvang een bonus"
        lead="Ben je klant bij De Kozijnstudio en ken je iemand die ook nieuwe kozijnen wil? Draag diegene aan. Wordt die persoon klant, dan ontvang je een bonus."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Aanbrengbonus" }]}
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/aanbrengbonus-voorwaarden" variant="secondary">
              Lees de voorwaarden
            </Button>
          </>
        }
      />

      <Section>
        <Container width="narrow">
          <Eyebrow>Waarom we dit doen</Eyebrow>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Aanbevelingen in plaats van reclame</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            De meeste mensen vinden een kozijnleverancier via iemand die ze kennen. Liever dan geld uit te geven aan
            reclame, belonen we klanten die ons aanbevelen bij familie, vrienden of buren.
          </p>
        </Container>
      </Section>

      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Zo werkt het</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">Van aanbevelen tot bonus</h2>
          <ProcessSteps steps={stappen} />
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Eyebrow>Goed om te weten</Eyebrow>
          <h2 className="mt-4 mb-6 text-2xl text-ink sm:text-3xl">Wanneer je de bonus krijgt</h2>
          <FeatureList items={goedOmTeWeten} />
          <p className="mt-6 leading-relaxed text-ink/70">
            Hoe hoog de bonus is, wat het maximum is, hoe lang je aanbrengjaar duurt en hoe we de bonus uitkeren, lees
            je in de{" "}
            <Link href="/aanbrengbonus-voorwaarden" className={link}>
              voorwaarden van de aanbrengbonus
            </Link>
            .
          </p>

          <Callout variant="info" title="Los van reviews" className="mt-8">
            <p>
              De aanbrengbonus staat helemaal los van reviews. Je krijgt de bonus nooit voor het schrijven van een
              review, en we belonen geen reviews, ook niet met korting of een cadeau. Schrijf je een review, dan
              waarderen we vooral een eerlijke ervaring.
            </p>
          </Callout>
        </Container>
      </Section>

      <CtaBlok
        titel="Nog geen klant?"
        lead="Vraag een voorstel aan voor je eigen kozijnen. Na je akkoord krijg je je persoonlijke aanbrengcode."
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/contact" variant="light">
              Stel een vraag
            </Button>
          </>
        }
      />
    </>
  );
}
