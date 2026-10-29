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
  title: "Aluminium kozijnen in Twente",
  description:
    "Aluminium kozijnen voor een woning in Twente? Bekijk materiaalkeuzes, glas, profilering en aandachtspunten voor plaatsing.",
  path: "/aluminium-kozijnen",
});

const link = "font-medium text-forest underline underline-offset-2";

const pastBij = [
  "Een moderne woning of verbouwing met een strakke gevel",
  "Grote glasvlakken, zoals een pui, een schuifpui of een hoekraam",
  "Een aanbouw of uitbouw waar je zoveel mogelijk licht wilt",
  "Wie een donkere of uitgesproken kleur zoekt in een egale afwerking",
];

const prijsfactoren = [
  "Het systeem: een slank profiel of een zwaarder, beter geïsoleerd profiel",
  "Maat en indeling: grote vlakken en draaiende delen vragen meer materiaal en beslag",
  "De afwerking: kleur, structuur en een andere kleur binnen dan buiten",
  "Het glas: HR++ of triple glas, en veiligheidsglas bij grote vlakken",
  "Bereikbaarheid: grote, zware elementen kunnen hulpmiddelen bij de montage vragen",
  "Bouwkundig werk als de opening verandert",
];

const vragen: FaqItem[] = [
  {
    question: "Zijn aluminium kozijnen duurder dan kunststof?",
    answer: (
      <>
        Meestal wel. Hoeveel duurder, hangt af van het systeem, de maat, de afwerking en het glas. Op de pagina{" "}
        <Link href="/kosten" className={link}>
          kosten
        </Link>{" "}
        lees je welke keuzes de prijs bepalen.
      </>
    ),
  },
  {
    question: "Isoleert aluminium wel goed?",
    answer: (
      <>
        Aluminium geleidt warmte goed. Daarom hebben aluminium systemen voor woningen een thermische onderbreking: een
        isolerende strip tussen de binnen- en buitenkant van het profiel. Hoe goed een kozijn isoleert, hangt af van het
        gekozen systeem, het glas en de aansluiting op de muur. De waarden staan in de specificatie van je voorstel.{" "}
        <Link href="/kennis/hr-plus-plus-triple-glas" className={link}>
          Lees meer over glas
        </Link>
        .
      </>
    ),
  },
  {
    question: "Hoeveel onderhoud vraagt een aluminium kozijn?",
    answer:
      "Weinig, maar niet niets. Maak de coating een paar keer per jaar schoon met water en een milde zeep, zeker als je dicht bij een drukke weg woont. Smeer het hang- en sluitwerk en loop de rubbers na. Krassen tot op het metaal kun je het beste laten bijwerken.",
  },
  {
    question: "Kan een aluminium kozijn binnen een andere kleur hebben dan buiten?",
    answer:
      "Bij veel aluminium systemen kan dat, bijvoorbeeld donker aan de gevel en wit aan de binnenkant. Of het bij het gekozen systeem kan en wat het kost, bespreken we bij je voorstel.",
  },
  {
    question: "Wil ik een grotere opening voor een aluminium pui?",
    answer: (
      <>
        Dan is vaak bouwkundig werk nodig, zoals een nieuwe latei en aangepast metselwerk. Dat doet MTB Bouw. Lees meer
        over{" "}
        <Link href="/bouwkundige-aanpassingen" className={link}>
          bouwkundige aanpassingen
        </Link>
        .
      </>
    ),
  },
];

export default function AluminiumKozijnenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { label: "Home", href: "/" },
              { label: "Kozijnen", href: "/kozijnen" },
              { label: "Aluminium kozijnen", href: "/aluminium-kozijnen" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Aluminium kozijnen"
        title="Aluminium kozijnen voor jouw woning in Twente"
        lead="Aluminium kies je voor slanke profielen en veel glas. Het is stevig, waardoor ook grote vlakken met smalle randen mogelijk zijn. Meestal ligt de prijs hoger dan bij kunststof. Op deze pagina lees je waar je op let bij indeling, zichtlijnen, afwerking en glas."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Kozijnen", href: "/kozijnen" },
          { label: "Aluminium kozijnen" },
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

      {/* Wanneer past aluminium */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Toepassing</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Wanneer past aluminium bij je woning?</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Aluminium is sterk in verhouding tot het gewicht. Daardoor kunnen de profielen smaller blijven dan bij hout
              of kunststof, ook bij grote ramen en puien. Aluminium past vooral bij:
            </p>
            <FeatureList items={pastBij} className="mt-6" />
          </div>
          <div className="rounded-card border border-mist bg-paper-soft p-7">
            <h2 className="text-xl text-ink">Wanneer een ander materiaal logischer is</h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              Bij een klassieke woning met traditionele profilering past hout vaak beter. Weegt het budget zwaar en wil
              je weinig onderhoud, dan is kunststof een logische keuze. Bij gewone raamformaten is het verschil in
              zichtlijnen kleiner dan bij een grote pui.
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/houten-kozijnen" className={link}>
                  Houten kozijnen
                </Link>
              </li>
              <li>
                <Link href="/kunststof-kozijnen" className={link}>
                  Kunststof kozijnen
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

      {/* Indeling en zichtlijnen */}
      <Section tone="soft">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Indeling</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Indeling en zichtlijnen</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Bij aluminium gaat het vaak om de zichtlijnen: hoe breed de stijlen en dorpels zijn, en hoe het glas
              verdeeld is. Een slank systeem laat meer glas over, maar elke tussenstijl blijft zichtbaar. Denk daarom
              goed na over de indeling: welke delen vast zijn, welke opendraaien en waar je een tussenstijl wilt.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Voor grote puien kies je tussen openslaande delen, een schuifpui of een vouwwand. Elk heeft eigen eisen aan
              de opening, de drempel en de ruimte binnen.
              {MODULES.configurator && (
                <>
                  {" "}
                  <Link href="/producten/schuifpuien" className={link}>
                    Bekijk schuifpuien en vouwwanden
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
          <div>
            <Eyebrow>Systeem</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Slank of zwaarder geïsoleerd</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Aluminium systemen verschillen in zichtbreedte en inbouwdiepte. Een smaller profiel geeft een lichtere
              uitstraling. Een dieper profiel biedt meer ruimte voor isolatie en voor zwaarder glas. Wat bij jouw woning
              past, hangt af van de maat van de ramen, het glas en de bestaande muur.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Meer over de aluminium profielen, met hun maten, lees je in de{" "}
              <Link href="/kozijnen#profielen" className={link}>
                kozijnengids
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* Afwerking en onderhoud */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Afwerking</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Coating en kleur</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Aluminium wordt gecoat of geanodiseerd. Een poedercoating kan in veel kleuren, glad of met een structuur.
              Anodiseren geeft een metaalachtige uitstraling. Bij veel systemen kan de binnenkant een andere kleur krijgen
              dan de buitenkant.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Woon je dicht bij de kust of naast industrie, dan kan een dikkere laag nodig zijn. Dat stemmen we af op de
              plek van je woning.
            </p>
          </div>
          <div>
            <Eyebrow>Onderhoud</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Weinig onderhoud, wel aandacht</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Aluminium hoeft niet geschilderd te worden. Wel houd je de coating schoon, zodat vuil en zout er niet op
              blijven zitten. Het hang- en sluitwerk heeft af en toe wat smeermiddel nodig en de rubbers moeten soepel
              blijven. Krassen tot op het metaal laat je het beste bijwerken.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              <Link href="/kennis/kozijnen-onderhouden" className={link}>
                Lees hoe je kozijnen onderhoudt
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      {/* Glas */}
      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Glas</Eyebrow>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Glas in een aluminium kozijn</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Omdat aluminium kozijnen vaak grote glasvlakken hebben, telt het glas extra mee: voor de isolatie, het
            gewicht en de veiligheid. Bij grote of laag geplaatste ruiten kan veiligheidsglas nodig zijn. Triple glas
            isoleert beter dan HR++, maar is zwaarder. Het systeem en het beslag moeten daarop berekend zijn. Welk glas je
            krijgt en welke isolatiewaarde daarbij hoort, staat in de specificatie van je voorstel.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            Vervang je bestaand glas door isolatieglas, dan kom je misschien in aanmerking voor subsidie. Glas in een
            nieuwe aanbouw telt daarbij niet mee.{" "}
            <Link href="/subsidie" className={link}>
              Lees waar je op let bij subsidie
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Prijs en plaatsing */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Prijs</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Wat de prijs van een aluminium kozijn bepaalt</h2>
            <FeatureList items={prijsfactoren} className="mt-6" />
            <p className="mt-6 leading-relaxed text-ink/70">
              <Link href="/kosten" className={link}>
                Bekijk hoe een prijs voor kozijnen is opgebouwd
              </Link>
            </p>
          </div>
          <div>
            <Eyebrow>Plaatsing</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Aandachtspunten bij het plaatsen</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Grote aluminium elementen zijn zwaar en vragen een goede voorbereiding. Hoe bereikbaar is de gevel, past
              het element door de straat of de tuin, en is er een hulpmiddel nodig? Ook de aansluiting van de drempel op
              de vloer verdient aandacht bij puien en deuren.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Voordat er iets besteld wordt, meten we bij je thuis in. De montage regelen we; in je voorstel staat per
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
              <li>
                <Link href="/bouwkundige-aanpassingen" className={link}>
                  Een opening vergroten voor een pui
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
          <h2 className="mb-8 mt-4 text-2xl text-ink sm:text-3xl">Vragen over aluminium kozijnen</h2>
          <FAQ items={vragen} />
        </Container>
      </Section>

      <CtaBlok
        titel="Aluminium kozijnen voor jouw woning?"
        lead="Vertel ons wat je wilt en stuur gerust foto's van de gevel mee. Je krijgt een voorstel met systeem, glas, afwerking en montage per onderdeel."
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
