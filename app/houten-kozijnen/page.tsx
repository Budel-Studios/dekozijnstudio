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

export const metadata = pageMetadata({
  title: "Houten kozijnen in Enschede en Twente",
  description:
    "Houten kozijnen voor jouw woning in Enschede en Twente. Bekijk keuzes in uitstraling, afwerking en glas en bespreek de mogelijkheden.",
  path: "/houten-kozijnen",
});

const link = "font-medium text-forest underline underline-offset-2";

const pastBij = [
  "Een oudere woning, bijvoorbeeld uit de jaren twintig of dertig, waar de kozijnen het karakter van de gevel bepalen",
  "Bestaande houten kozijnen die je in dezelfde stijl wilt laten terugkomen",
  "Een monument of een woning in een beschermd stads- of dorpsgezicht, waar het gevelbeeld gelijk moet blijven",
  "Wie de warmte en de uitstraling van natuurlijk materiaal belangrijk vindt",
];

const prijsfactoren = [
  "De houtsoort: hardhout is duurder dan naaldhout",
  "De profilering: roeden, neuten of een bijzondere vorm vragen meer werk",
  "De afwerking: dekkend of transparant, en de kleur",
  "Maat en indeling: draaiende delen kosten meer dan vast glas",
  "Het glas: HR++ of triple glas, en eventueel veiligheidsglas",
  "De montage en de afwerking binnen en buiten",
];

const vragen: FaqItem[] = [
  {
    question: "Zijn houten kozijnen duurder dan kunststof?",
    answer: (
      <>
        Vaak wel, maar het verschil hangt af van de houtsoort, de profilering en de afwerking. Neem bij het vergelijken
        ook het schilderwerk in de jaren daarna mee. Op de pagina{" "}
        <Link href="/kosten" className={link}>
          kosten
        </Link>{" "}
        lees je welke keuzes de prijs bepalen.
      </>
    ),
  },
  {
    question: "Hoe vaak moeten houten kozijnen geschilderd worden?",
    answer: (
      <>
        Dat hangt af van de verf, de kleur en de ligging. Een kozijn dat veel zon en regen krijgt, heeft eerder onderhoud
        nodig dan een kozijn aan een beschutte gevel. Loop je kozijnen elk jaar na op scheurtjes in de verf en de kit.{" "}
        <Link href="/kennis/kozijnen-onderhouden" className={link}>
          Lees hoe je kozijnen onderhoudt
        </Link>
        .
      </>
    ),
  },
  {
    question: "Kan er triple glas in een houten kozijn?",
    answer: (
      <>
        Dat kan, als het profiel daarop berekend is. Triple glas is dikker en zwaarder dan HR++, dus de glassponning en
        het hang- en sluitwerk moeten daarbij passen.{" "}
        <Link href="/kennis/hr-plus-plus-triple-glas" className={link}>
          Lees het verschil tussen HR++ en triple glas
        </Link>
        .
      </>
    ),
  },
  {
    question: "Kunnen mijn nieuwe kozijnen er hetzelfde uitzien als de oude?",
    answer:
      "Hout laat zich precies profileren. Daarom kan een nieuw kozijn vaak dicht bij het oude blijven, ook met roeden of een bijzondere vorm. Bij het inmeten kijken we naar de bestaande profielen en bespreken we wat mogelijk is.",
  },
  {
    question: "Heb ik een vergunning nodig voor nieuwe houten kozijnen?",
    answer: (
      <>
        Bij vervanging in dezelfde opening en met hetzelfde uiterlijk meestal niet. Bij een monument, een beschermd
        stadsgezicht of een andere opening kan het wel nodig zijn.{" "}
        <Link href="/kennis/kozijnen-en-vergunningen" className={link}>
          Lees wanneer je een vergunning nodig hebt
        </Link>
        .
      </>
    ),
  },
];

export default function HoutenKozijnenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { label: "Home", href: "/" },
              { label: "Kozijnen", href: "/kozijnen" },
              { label: "Houten kozijnen", href: "/houten-kozijnen" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Houten kozijnen"
        title="Houten kozijnen die passen bij jouw woning"
        lead="Hout kies je om de uitstraling: warm, natuurlijk en precies te profileren, zodat het kozijn past bij de gevel. Daar staat tegenover dat hout periodiek schilderwerk nodig heeft. Op deze pagina lees je waar je op let bij houtsoort, profilering, afwerking en glas."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Kozijnen", href: "/kozijnen" },
          { label: "Houten kozijnen" },
        ]}
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/kosten" variant="secondary">
              Bekijk de prijsopbouw
            </Button>
          </>
        }
      />

      {/* Wanneer past hout */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Toepassing</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Wanneer past hout bij je woning?</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Hout is het traditionele kozijnmateriaal in Nederland. Bij veel oudere woningen in Enschede en Twente horen
              houten kozijnen bij het karakter van de gevel. Hout past vooral bij:
            </p>
            <FeatureList items={pastBij} className="mt-6" />
          </div>
          <div className="rounded-card border border-mist bg-paper-soft p-7">
            <h2 className="text-xl text-ink">Wanneer een ander materiaal logischer is</h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              Wil je zo weinig mogelijk onderhoud, maar wel een houtachtige uitstraling? Dan is kunststof met een
              houtnerffolie een alternatief. Zoek je zo slank mogelijke profielen met veel glas, bijvoorbeeld voor een
              grote pui, dan kom je eerder bij aluminium uit.
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/kunststof-kozijnen" className={link}>
                  Kunststof kozijnen
                </Link>
              </li>
              <li>
                <Link href="/aluminium-kozijnen" className={link}>
                  Aluminium kozijnen
                </Link>
              </li>
              <li>
                <Link href="/kozijnen" className={link}>
                  Hout, kunststof en aluminium naast elkaar
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* Houtsoort en profilering */}
      <Section tone="soft">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Houtsoort</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Hardhout of naaldhout</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              De houtsoort bepaalt mee hoe een kozijn eruitziet en hoe het zich door de jaren houdt. Hardhout, zoals
              mahonie, is dicht en blijft goed op maat. Het laat zich glad afwerken. Naaldhout is lichter en zachter. Het
              is goed bruikbaar voor kozijnen, maar vraagt een zorgvuldige afwerking en goed onderhoud.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Meer over het houten profiel, met de maten, lees je in de{" "}
              <Link href="/kozijnen#profielen" className={link}>
                kozijnengids
              </Link>
              .
            </p>
          </div>
          <div>
            <Eyebrow>Profilering</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Precies passend bij de gevel</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Het grote voordeel van hout is dat het zich precies laat profileren. Rechte of afgeronde kanten, een
              bepaalde glaslat, roeden of een boogvorm: in hout kan een nieuw kozijn dicht bij het oude blijven. Dat is
              belangrijk bij woningen waar de kozijnen het gezicht van de gevel bepalen.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Bij het inmeten kijken we naar de bestaande kozijnen: de maten van stijlen en dorpels, de profilering en
              de indeling. Zo bespreken we wat je terug wilt laten komen en wat je wilt veranderen.
            </p>
          </div>
        </Container>
      </Section>

      {/* Afwerking en onderhoud */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Afwerking</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Dekkend of transparant</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Een houten kozijn wordt dekkend geschilderd of transparant afgewerkt. Dekkende verf kan in vrijwel elke
              kleur en beschermt het hout het beste. Een transparante afwerking laat de nerf zien, maar vraagt vaker
              onderhoud.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Let ook op de kleur. Een donker kozijn wordt in de zon warmer dan een licht kozijn. Daardoor werkt het hout
              meer en vraagt de verflaag eerder aandacht.
            </p>
          </div>
          <div>
            <Eyebrow>Onderhoud</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Eerlijk over het onderhoud</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Houten kozijnen vragen meer onderhoud dan kunststof of aluminium. Periodiek schilderwerk houdt het hout
              gezond. Hoe vaak, hangt af van de verf, de kleur en hoeveel zon en regen de gevel krijgt. Loop je kozijnen
              elk jaar na: scheurtjes in de verf, de kitvoegen en de onderdorpel. Kleine schade op tijd herstellen
              voorkomt groter werk.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Neem dit onderhoud mee als je materialen vergelijkt.{" "}
              <Link href="/kennis/kozijnen-onderhouden" className={link}>
                Lees hoe je kozijnen onderhoudt
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* Glas */}
      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Glas</Eyebrow>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Glas in een houten kozijn</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            In een houten kozijn kan HR++ of triple glas. Triple glas isoleert beter, maar is dikker en zwaarder. Het
            profiel, de glaslatten en het hang- en sluitwerk moeten daarop berekend zijn. Bij een oud kozijn met smalle
            profielen is dat een reden om het hele kozijn te vervangen en niet alleen het glas. Welk glas je krijgt en
            welke isolatiewaarde daarbij hoort, staat in de specificatie van je voorstel.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            Vervang je bestaand glas door isolatieglas, dan kom je misschien in aanmerking voor subsidie.{" "}
            <Link href="/subsidie" className={link}>
              Lees waar je op let bij subsidie
            </Link>{" "}
            of{" "}
            <Link href="/kennis/hr-plus-plus-triple-glas" className={link}>
              vergelijk HR++ en triple glas
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Prijs en montage */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Prijs</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Wat de prijs van een houten kozijn bepaalt</h2>
            <FeatureList items={prijsfactoren} className="mt-6" />
            <p className="mt-6 leading-relaxed text-ink/70">
              <Link href="/kosten" className={link}>
                Bekijk hoe een prijs voor kozijnen is opgebouwd
              </Link>
            </p>
          </div>
          <div>
            <Eyebrow>Montage</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Plaatsen en afwerken</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Voordat er iets besteld wordt, meten we bij je thuis in. Daarna regelen we de montage: het oude kozijn
              eruit, het nieuwe kozijn erin, en de aansluitingen binnen en buiten dicht. In je voorstel staat per
              onderdeel wat er gebeurt.
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/montage" className={link}>
                  Wat er bij de montage hoort
                </Link>
              </li>
              <li>
                <Link href="/kozijnen-vervangen" className={link}>
                  Hoe kozijnen vervangen in zijn werk gaat
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* Vragen */}
      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Vragen</Eyebrow>
          <h2 className="mb-8 mt-4 text-2xl text-ink sm:text-3xl">Vragen over houten kozijnen</h2>
          <FAQ items={vragen} />
        </Container>
      </Section>

      <CtaBlok
        titel="Houten kozijnen voor jouw woning?"
        lead="Vertel ons wat je zoekt en stuur gerust foto's van je huidige kozijnen mee. Je krijgt een voorstel met houtsoort, afwerking, glas en montage per onderdeel."
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/kozijnen" variant="light">
              Vergelijk de materialen
            </Button>
          </>
        }
      />
    </>
  );
}
