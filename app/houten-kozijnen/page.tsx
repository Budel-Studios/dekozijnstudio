import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { Placeholder } from "@/components/ui/placeholder";

export const metadata: Metadata = {
  title: "Houten kozijnen",
  description:
    "Houten kozijnen op maat — tijdloze uitstraling, uitstekende isolatiewaarden en duurzaam materiaal. Meranti en andere houtsoorten. Twente & Oost-Nederland.",
  alternates: { canonical: "/houten-kozijnen" },
  openGraph: {
    title: "Houten kozijnen — De Kozijnstudio",
    description: "Tijdloos, warm en duurzaam. Meranti kozijnen op maat met transparante prijzen incl. btw.",
  },
};

const voordelen = [
  "Tijdloze, warme uitstraling die past bij klassieke en moderne architectuur",
  "Uitstekende thermische isolatie bij goede afwerking",
  "Duurzame houtsoorten — Meranti als standaard keuze",
  "Goed te schilderen of te lazuren in elke gewenste kleur",
  "Combineerbaar met HR++- en triple glas",
  "Hogere milieuscore dan PVC bij gebruik van FSC-gecertificeerd hout",
];

const onderhoud = [
  "Schilder of lazuur elke 5–8 jaar om het hout te beschermen",
  "Controleer jaarlijks de kitvoegen rondom het kozijn",
  "Verwijder bladeren en vuil uit drainagegaten in de onderdorpel",
  "Bij kleine beschadigingen: schuur, grond en herschilder tijdig",
];

export default function HoutenKozijnenPage() {
  return (
    <>
      <PageHero
        eyebrow="Houten kozijnen"
        title="Tijdloze uitstraling, duurzaam materiaal."
        lead="Hout is een van de oudste en meest gewaardeerde materialen voor kozijnen. Met de juiste afwerking en regelmatig onderhoud gaan houten kozijnen generaties mee."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kozijnen" }, { label: "Houten kozijnen" }]}
        actions={
          <>
            <Button href="/offerte">Offerte aanvragen</Button>
            <Button href="/kosten" variant="secondary">Bekijk montagekosten</Button>
          </>
        }
        media={<Placeholder label="Houten kozijnen — sfeerfoto" className="min-h-72 lg:min-h-80" />}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Voordelen</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Waarom kiezen voor hout?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Houten kozijnen zijn de klassieke keuze voor wie waarde hecht aan
              natuurlijk materiaal en een warme uitstraling. Ze zijn goed te
              bewerken, veelzijdig in afwerking en combineren prachtig met zowel
              historische als eigentijdse architectuur.
            </p>
            <FeatureList items={voordelen} className="mt-6" />
          </div>
          <Placeholder label="Detail houten kozijn — houtstructuur" className="min-h-64" />
        </Container>
      </Section>

      <Section tone="soft">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Placeholder label="Onderhoud houten kozijn" className="min-h-64" />
          <div>
            <Eyebrow>Onderhoud</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Onderhoud: eerlijk over de investering
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              We zijn transparant: houten kozijnen vragen meer onderhoud dan
              kunststof. Regelmatig schilderen of lazuren houdt het kozijn in
              optimale staat en voorkomt houtrot. Plan dit in als terugkerende
              kostenpost.
            </p>
            <FeatureList items={onderhoud} className="mt-6" />
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container className="text-center">
          <h2 className="text-2xl text-paper sm:text-3xl">
            Interesse in houten kozijnen?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            Wij adviseren u welke houtsoort en afwerking het best past bij uw
            woning en budget. Na de inmeetservice ontvangt u een complete
            offerte incl. montage.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/offerte">Offerte aanvragen</Button>
            <Button href="/kunststof-kozijnen" variant="secondary">Vergelijk met kunststof</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
