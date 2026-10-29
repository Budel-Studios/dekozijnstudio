import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { MODULES } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Kunststof kozijnen in Enschede",
  description:
    "Bekijk de keuzes voor kunststof kozijnen in Enschede en Twente. Van uitstraling en glas tot montage en afwerking. Vraag een voorstel aan.",
  path: "/kunststof-kozijnen",
});

const link = "font-medium text-forest underline underline-offset-2";

const toepassingen = [
  "Vervanging van houten of oude kunststof kozijnen in rijwoningen, twee-onder-een-kappers en vrijstaande woningen",
  "Draaikiepramen, vaste ramen, valramen en combinaties met bovenlichten",
  "Voordeuren, achterdeuren en openslaande tuindeuren",
  "Schuifpuien, als de maat en het gewicht passen bij een kunststof systeem",
];

const keuzes = [
  {
    titel: "Uitstraling en profilering",
    tekst:
      "Kunststof profielen verschillen in vorm: strak en vlak, licht afgerond, of verdiept met een klassieke uitstraling die dichter bij hout komt. Bij oudere woningen let je ook op de zichtbreedte en de verhouding tussen kozijn en glas.",
  },
  {
    titel: "Kleur en houtlook",
    tekst:
      "Naast wit en crème zijn veel kleuren leverbaar, ook met een houtnerfstructuur. Binnen en buiten kunnen een andere kleur hebben. Welke kleuren bij het gekozen profiel horen, laten we je zien bij het advies.",
  },
  {
    titel: "Glas",
    tekst:
      "Je kiest meestal tussen HR++- en triple glas. Triple glas isoleert beter, maar is zwaarder en duurder. Daarnaast zijn er opties voor geluidwerend glas, veiligheidsglas en glas met een andere uitstraling.",
  },
  {
    titel: "Onderhoud",
    tekst:
      "Kunststof hoeft niet geschilderd te worden. Wel vraagt het om af en toe schoonmaken, en hang- en sluitwerk en rubbers hebben periodiek een controle of een druppel smeermiddel nodig.",
  },
];

const prijsfactoren = [
  "De afmetingen en het aantal kozijnen",
  "De indeling: vast glas is goedkoper dan draaiende delen of deuren",
  "Het profiel en de kleur, zeker bij een andere kleur binnen en buiten",
  "Het glas: HR++ of triple, en eventuele extra eigenschappen",
  "Hang- en sluitwerk en extra's zoals ventilatieroosters of roeden",
  "Het werk in je woning: demontage, afwerking en eventueel bouwkundig werk",
];

const vragen: FaqItem[] = [
  {
    question: "Past kunststof met houtlook bij mijn gevel?",
    answer:
      "Vaak wel, maar het hangt af van de woning. Bij een karakteristieke gevel is de vorm van het profiel net zo belangrijk als de kleur. We bekijken samen of een verdiept profiel met houtnerf past, of dat hout de betere keuze is.",
  },
  {
    question: "Wat zit er in een voorstel voor kunststof kozijnen?",
    answer: (
      <>
        Het kozijn en het glas, de montage en de afwerking, en eventueel bouwkundig werk, elk apart en inclusief btw.
        Op de pagina{" "}
        <Link href="/kosten" className={link}>
          kosten
        </Link>{" "}
        lees je hoe je dat vergelijkt met andere offertes.
      </>
    ),
  },
  {
    question: "Hoe wordt de binnenkant afgewerkt?",
    answer: (
      <>
        Na het plaatsen worden de randen binnen netjes afgewerkt. Of er ook stucwerk of een nieuwe vensterbank nodig is,
        hangt af van wat er bij het verwijderen van je oude kozijn vrijkomt. Meer daarover lees je bij{" "}
        <Link href="/montage" className={link}>
          montage
        </Link>
        .
      </>
    ),
  },
  {
    question: "Kan ik kunststof kozijnen met triple glas krijgen?",
    answer: (
      <>
        Ja, kunststof kozijnen zijn te combineren met triple glas. Of het in jouw situatie loont, hangt af van je woning
        en je wensen. In het artikel over{" "}
        <Link href="/kennis/hr-plus-plus-triple-glas" className={link}>
          HR++ en triple glas
        </Link>{" "}
        zetten we de verschillen op een rij.
      </>
    ),
  },
  {
    question: "Wanneer wordt er ingemeten?",
    answer:
      "Na het eerste advies en voordat er iets besteld wordt. Bij het inmeten nemen we de exacte maten op en bekijken we de bestaande opening, zodat het nieuwe kozijn goed aansluit.",
  },
  {
    question: "Wat is de levertijd?",
    answer:
      "Dat verschilt per profiel, kleur en glas. De verwachte levertijd staat in je voorstel, zodat je weet waar je aan toe bent voordat je akkoord geeft.",
  },
];

export default function KunststofKozijnenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { label: "Home", href: "/" },
              { label: "Kunststof kozijnen", href: "/kunststof-kozijnen" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="Kunststof kozijnen"
        title="Kunststof kozijnen voor jouw woning in Twente"
        lead="Kunststof wordt veel gekozen bij het vervangen van kozijnen: weinig onderhoud, veel kleuren en goed te combineren met isolerend glas. Hieronder lees je welke keuzes je maakt en waar je op let."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kunststof kozijnen" }]}
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/kosten" variant="secondary">
              Bekijk de prijsopbouw
            </Button>
          </>
        }
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Toepassingen</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Waar kunststof goed past</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Kunststof kozijnen passen bij de meeste woningen van na de oorlog en bij veel oudere woningen, als het
              profiel goed gekozen is. Ze zijn er voor bijna elk soort raam en deur.
            </p>
            <FeatureList className="mt-6" items={toepassingen} />
          </div>
          <div className="rounded-card border border-mist bg-paper-soft p-7">
            <h2 className="text-xl text-ink">Wanneer een ander materiaal logischer is</h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              Bij monumenten en beschermde gevels stelt de gemeente vaak eisen aan materiaal en detaillering; dan is hout
              meestal de route. Wil je heel slanke profielen of een grote schuifpui, dan kijk je eerder naar{" "}
              <Link href="/aluminium-kozijnen" className={link}>
                aluminium
              </Link>
              . En wil je juist de warmte en herstelbaarheid van hout, lees dan meer over{" "}
              <Link href="/houten-kozijnen" className={link}>
                houten kozijnen
              </Link>
              .
            </p>
            <p className="mt-4 text-sm text-ink/70">
              <Link href="/kennis/pvc-hout-aluminium" className={link}>
                Kunststof, hout of aluminium: de verschillen op een rij
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <Eyebrow>Keuzes</Eyebrow>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Wat je kiest bij kunststof kozijnen</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {keuzes.map((k) => (
              <article key={k.titel} className="rounded-card border border-mist bg-paper p-7">
                <h3 className="text-lg text-ink">{k.titel}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{k.tekst}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink/70">
            Twijfel je over het glas?{" "}
            <Link href="/kennis/hr-plus-plus-triple-glas" className={link}>
              Lees het verschil tussen HR++ en triple glas
            </Link>{" "}
            of bekijk{" "}
            <Link href="/subsidie" className={link}>
              waar je op let bij subsidie
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Prijs</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Wat de prijs van kunststof kozijnen bepaalt</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Een prijs per kozijn zegt weinig zonder de uitgangspunten erbij. Dit zijn de keuzes die het verschil maken.
            </p>
            <FeatureList className="mt-6" items={prijsfactoren} />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/kosten" variant="secondary">
                Zo vergelijk je offertes
              </Button>
              {MODULES.configurator && (
                <Button href="/configurator" variant="ghost">
                  Stel je kozijn samen
                </Button>
              )}
            </div>
          </div>
          <div>
            <Eyebrow>Montage</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Plaatsen en afwerken</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Een goed kozijn kan nog steeds tochten als de aansluiting op de muur niet klopt. Daarom hoort bij het
              plaatsen ook het isoleren en afdichten van de naad tussen kozijn en muur, en het afwerken binnen en buiten.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Moet de opening groter, of is er een nieuwe latei nodig? Dat bouwkundige werk doet MTB Bouw, in dezelfde
              planning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/montage" variant="secondary">
                Bekijk wat bij montage hoort
              </Button>
              <Button href="/kozijnen-vervangen" variant="ghost">
                Kozijnen vervangen
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Vragen</Eyebrow>
          <h2 className="mb-8 mt-4 text-2xl text-ink sm:text-3xl">Vragen over kunststof kozijnen</h2>
          <FAQ items={vragen} />
        </Container>
      </Section>

      <CtaBlok
        titel="Kunststof kozijnen voor jouw woning?"
        lead="Vertel ons welke kozijnen je wilt vervangen. Met een paar foto's kunnen we je al gericht adviseren."
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
