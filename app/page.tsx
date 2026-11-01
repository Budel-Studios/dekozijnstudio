import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { ProcessSteps } from "@/components/ui/process-steps";
import { Callout } from "@/components/ui/callout";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import { FeaturedProducts } from "@/components/catalog/featured-products";
import { MtbBouwBand } from "@/components/mtb-bouw-band";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { ArrowRightIcon, EuroIcon, UsersIcon, WrenchIcon } from "@/components/icons";
import { TwenteMapSection } from "@/components/twente-map/twente-map-section";
import { TwenteMapSvg } from "@/components/twente-map/twente-map-svg";
import { jsonLd, serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { MODULES } from "@/lib/site";
import { ENSCHEDE_ANCHOR, mapPlaces } from "@/lib/werkgebied-kaart";
import { company } from "@/data/company";

/**
 * Homepage = THE landing page for "kozijnen vervangen in Enschede" (focus
 * keyword since 1-11-2026). The former /kozijnen-vervangen page is merged in
 * here and redirects to "/" (next.config.ts). Every other page supports this
 * page: menu, footer and content link here with "kozijnen vervangen" anchors.
 */
export const metadata = pageMetadata({
  absoluteTitle: "Kozijnen vervangen in Enschede | De Kozijnstudio",
  description:
    "Kozijnen vervangen in Enschede? Van inmeten tot afwerking, met een voorstel waarin kozijn, glas, montage en afwerking apart staan. Vraag een voorstel aan.",
  path: "/",
});

const link = "font-medium text-forest underline underline-offset-2";

const kaartPlaatsen = mapPlaces({ onHome: true });

/** Stadsdelen and villages of the municipality of Enschede. */
const enschedeDelen = ["Centrum", "Noord", "Oost", "Zuid", "West", "Glanerbrug", "Boekelo", "Lonneker", "Usselo"];

const redenen = [
  {
    icon: UsersIcon,
    title: "Inzicht in je keuzes",
    body: "Materiaal, glas, kleur en indeling: we leggen uit wat elke keuze betekent voor uitstraling, onderhoud en prijs. Daarna kies jij.",
  },
  {
    icon: EuroIcon,
    title: "Een duidelijke scope",
    body: "In je voorstel staan kozijn, glas, montage en eventueel bouwkundig werk apart, inclusief btw. Zo zie je wat je krijgt en kun je eerlijk vergelijken.",
  },
  {
    icon: WrenchIcon,
    title: "Eén aanspreekpunt",
    body: "Moet er een opening groter, een latei vervangen of metselwerk hersteld worden? Dat bouwkundige werk doet MTB Bouw, in dezelfde planning.",
  },
];

const signalen = [
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
    title: "Inmeten bij je thuis",
    description:
      "We nemen de exacte maten op en bekijken de opening: het metselwerk, de latei, de vensterbank en de aansluiting binnen. Pas daarna kan er besteld worden.",
  },
  {
    title: "Voorstel en keuzes",
    description: (
      <>
        Je krijgt een voorstel met kozijn, glas, montage en eventueel bouwkundig werk apart. Wat de prijs bepaalt, lees
        je bij{" "}
        <Link href="/kosten" className={link}>
          de kosten van kozijnen vervangen
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

const materialen = [
  {
    title: "Kunststof kozijnen",
    text: "Veel gekozen bij vervanging. Weinig onderhoud, veel kleuren en houtnerfstructuren, en goed te combineren met HR++- of triple glas.",
    href: "/kunststof-kozijnen",
  },
  {
    title: "Houten kozijnen",
    text: "Warm, op maat geprofileerd en goed te herstellen. Een logische keuze bij karakteristieke en vooroorlogse woningen, met periodiek schilderwerk.",
    href: "/houten-kozijnen",
  },
  {
    title: "Aluminium kozijnen",
    text: "Slanke profielen en grote glasvlakken. Vaak gekozen voor moderne woningen, aanbouwen en schuifpuien.",
    href: "/aluminium-kozijnen",
  },
];

const prijsfactoren = [
  "Materiaal en profiel",
  "Afmetingen en indeling: vast, draaikiep of deur",
  "Glas: HR++ of triple",
  "Kleur en afwerking",
  "Demontage, montage en afwerking binnen en buiten",
  "Eventueel bouwkundig werk",
];

const vragen: FaqItem[] = [
  {
    question: "Komen jullie eerst inmeten?",
    answer:
      "Ja. Voordat er iets besteld wordt, meten we bij je thuis in en bekijken we de staat van de bestaande opening. Globale maten uit je aanvraag zijn nog geen productiematen.",
  },
  {
    question: "Wat kost het om kozijnen te vervangen?",
    answer: (
      <>
        Dat hangt af van materiaal, maat, glas, kleur en het werk in je woning. Bij{" "}
        <Link href="/kosten" className={link}>
          de kosten
        </Link>{" "}
        lees je welke keuzes de prijs bepalen en hoe je offertes met dezelfde uitgangspunten vergelijkt. De prijs voor
        jouw woning staat in je voorstel, na het inmeten.
      </>
    ),
  },
  {
    question: "Kan ik thuisblijven tijdens het vervangen?",
    answer:
      "Ja, meestal wel. Er is wel een tijd een opening in de gevel en er komt stof vrij. Per ruimte stemmen we af wat er gebeurt, zodat je weet welke kamers op welk moment niet bruikbaar zijn.",
  },
  {
    question: "Wie haalt de oude kozijnen eruit?",
    answer: (
      <>
        Het verwijderen van de oude kozijnen en het afvoeren van het materiaal hoort bij de montage. Bij{" "}
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
    question: "Vervangen jullie ook kozijnen buiten Enschede?",
    answer: (
      <>
        Ja. We werken vanuit Enschede in heel Twente, waaronder Hengelo, Almelo, Oldenzaal, Haaksbergen, Losser en
        Borne. Twijfel je over jouw adres? Bekijk ons{" "}
        <Link href="/werkgebied" className={link}>
          werkgebied
        </Link>{" "}
        of vraag het ons.
      </>
    ),
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

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema()) }} />

      {/* Hero */}
      <section className="relative overflow-hidden text-paper" aria-labelledby="hero-title">
        {/* Sfeerbeeld — geen eigen project. Vervangen door een echte projectfoto uit Enschede zodra die er is. */}
        <Image
          src="/images/home-hero.jpg"
          alt="Woning met grote kozijnen en houten geveldetails"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/20" />
        <Container className="relative flex min-h-[34rem] items-end pb-16 pt-24 sm:min-h-[38rem] sm:pb-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 border border-paper/30 bg-ink/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur-md">
              <span aria-hidden className="size-2 bg-lime" />
              Kozijnen vervangen · Enschede
            </p>
            <h1 id="hero-title" className="text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
              Kozijnen vervangen in Enschede
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-paper/90 sm:text-lg">
              Tocht, houtrot of enkel glas? We vervangen je kozijnen, van het inmeten bij je thuis tot de afwerking
              binnen. Vooraf krijg je een voorstel waarin kozijn, glas, montage en afwerking apart staan, inclusief
              btw.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/offerte" size="lg">
                Vraag een voorstel <ArrowRightIcon />
              </Button>
              <Button href="/kosten" size="lg" variant="light">
                Bekijk wat het kost
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Drie redenen */}
      <Section tone="soft">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Waarom De Kozijnstudio</Eyebrow>
            <h2 className="mt-4 text-3xl leading-tight text-ink sm:text-4xl">Je kozijnen vervangen zonder verrassingen</h2>
            <p className="mt-4 text-lg leading-8 text-ink/70">
              Geen verkooppraatje, wel uitleg. Je weet vooraf wat er gebeurt, wat het kost en wie wat doet, zodat je een
              beslissing neemt die bij je woning en budget past.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden border border-mist bg-mist md:grid-cols-3">
            {redenen.map(({ icon: Icon, title, body }) => (
              <article key={title} className="bg-paper p-7 sm:p-9">
                <span className="grid size-12 place-items-center bg-lime text-ink">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-8 text-xl text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-ink/70">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Wanneer vervangen */}
      <Section id="wanneer-vervangen" className="scroll-mt-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Wanneer vervangen</Eyebrow>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Wanneer is het tijd om je kozijnen te vervangen?</h2>
            <FeatureList className="mt-6" items={signalen} />
          </div>
          <div className="self-start border border-mist bg-paper-soft p-7">
            <h3 className="text-xl text-ink">Is vervangen altijd nodig?</h3>
            <p className="mt-3 leading-relaxed text-ink/70">
              Nee. Zijn de kozijnen zelf nog goed en gaat het vooral om warmteverlies, dan kan ander glas soms genoeg
              zijn. Is er plaatselijk houtrot, dan is herstel soms mogelijk. We bekijken eerst wat er echt nodig is.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/kennis/levensduur-kozijnen" className={link}>
                  Hoe lang gaan kozijnen mee?
                </Link>
              </li>
              <li>
                <Link href="/kennis/condens-op-ramen" className={link}>
                  Condens op je ramen: wat betekent het?
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* Zo gaat het */}
      <Section tone="soft" id="zo-gaat-het" className="scroll-mt-20">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Zo gaat het</Eyebrow>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Zo gaat kozijnen vervangen, van inmeten tot oplevering</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Nieuwe kozijnen betekenen werk aan je woning. Dit zijn de stappen, en wat er bij elke stap van jouw
              situatie afhangt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/werkwijze" variant="secondary" size="sm">
                Bekijk de werkwijze
              </Button>
              <Button href="/montage" variant="secondary" size="sm">
                Wat bij de montage hoort
              </Button>
            </div>
          </div>
          <div>
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
          </div>
        </Container>
      </Section>

      {/* Materialen */}
      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Eyebrow>Materialen</Eyebrow>
              <h2 className="mt-4 max-w-2xl text-3xl text-ink sm:text-4xl">Waarmee vervang je je kozijnen?</h2>
            </div>
            <p className="max-w-md leading-7 text-ink/70">
              Kunststof, hout of aluminium: elk materiaal heeft eigen sterke kanten. We kijken samen naar uitstraling,
              onderhoud, isolatie en budget.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {materialen.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group flex flex-col justify-between border border-mist bg-paper-soft p-7 transition-colors hover:border-forest"
              >
                <div>
                  <h3 className="text-2xl text-ink">{m.title}</h3>
                  <p className="mt-3 leading-7 text-ink/70">{m.text}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                  Lees meer <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink/70">
            Twijfel je?{" "}
            <Link href="/kozijnen" className={link}>
              Zet de materialen naast elkaar
            </Link>
            .
          </p>
        </Container>
      </Section>

      {MODULES.configurator && <FeaturedProducts />}

      {/* Kosten */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Kosten</Eyebrow>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Wat kost kozijnen vervangen?</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Een prijs per kozijn zegt weinig zonder de uitgangspunten erbij. Twee ramen van dezelfde maat kunnen in
              prijs verschillen door het glas, de kleur of het werk eromheen. Daarom staat in je voorstel elk onderdeel
              apart, inclusief btw.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/kosten">Bekijk de prijsopbouw</Button>
              {MODULES.configurator && (
                <Button href="/configurator" variant="secondary">
                  Stel je kozijn samen
                </Button>
              )}
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {prijsfactoren.map((f) => (
              <li key={f} className="border border-mist bg-paper-soft px-5 py-4 text-sm font-medium text-ink">
                {f}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Planning en overlast */}
      <Section tone="soft">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Planning</Eyebrow>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Planning en overlast</h2>
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
                <Link href="/kennis/montageproces" className={link}>
                  Hoe verloopt het plaatsen van nieuwe kozijnen?
                </Link>
              </li>
              <li>
                <Link href="/kennis/hr-plus-plus-triple-glas" className={link}>
                  HR++ of triple glas kiezen
                </Link>
              </li>
              <li>
                <Link href="/subsidie" className={link}>
                  Subsidie voor isolatieglas
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* Werkgebied — interactieve Twente-kaart, zoals op mtbbouw.com */}
      <TwenteMapSection
        svg={<TwenteMapSvg places={kaartPlaatsen} currentHref="/" />}
        places={kaartPlaatsen}
        title="Vanuit Enschede, in heel Twente."
        intro={
          <p>
            Enschede is onze thuisbasis. Van daaruit vervangen we ook kozijnen in de rest van Twente. Kies je plaats op
            de kaart en lees waar we bij de woningen daar op letten.
          </p>
        }
      />

      {/* Enschede — lokale context */}
      <Section tone="soft" id={ENSCHEDE_ANCHOR} className="scroll-mt-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>Enschede</Eyebrow>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Kozijnen vervangen in een Enschedese woning</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              We werken vanuit Enschede, aan de {company.adres}. In elke wijk, en in de dorpen eromheen.
            </p>
            <p className="label-mono mt-8 text-ink/55">Stadsdelen en kernen</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Stadsdelen en kernen van Enschede">
              {enschedeDelen.map((d) => (
                <li key={d} className="border border-mist bg-paper px-3 py-1.5 text-sm text-ink/75">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="space-y-4 leading-relaxed text-ink/70">
              <p>
                Enschede heeft een gemengde woningvoorraad, en dat bepaalt welk kozijn verstandig is. In de
                vooroorlogse buurten, zoals het tuindorp Pathmos (gebouwd tussen 1914 en 1928), staan woningen met
                houten kozijnen, roedeverdelingen en bovenlichten. Daar luistert de detaillering nauw: je kiest vaak
                voor hout, of voor kunststof met een klassiek, verdiept profiel dat de oorspronkelijke maten volgt.
              </p>
              <p>
                In de naoorlogse uitbreidingswijken, zoals in Enschede-Zuid, staan veel rijwoningen en
                twee-onder-een-kappers. Daar levert het vervangen van enkel of oud dubbel glas en tochtige kozijnen
                vaak het meeste comfort op. Kunststof met HR++- of triple glas is dan een veelgekozen route. Bij
                nieuwere woningen en aanbouwen zie je vaker slanke aluminium kozijnen en schuifpuien.
              </p>
              <p>
                Bij de voorbereiding kijken we ook naar de bereikbaarheid van je woning: in de binnenstad en in de
                smalle straten van oudere wijken is ruimte voor een bus, een container of een steiger niet
                vanzelfsprekend. Dat nemen we mee in de planning.
              </p>
              <p>
                Staat je woning in een beschermd gebied of is het een monument? Kijk dan eerst{" "}
                <Link href="/kennis/kozijnen-en-vergunningen" className={link}>
                  of je een vergunning nodig hebt
                </Link>
                . Komt het nieuwe kozijn in dezelfde opening, met een vergelijkbare indeling en uitstraling, dan is dat
                meestal niet nodig.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/kunststof-kozijnen" variant="secondary" size="sm">
                Kunststof kozijnen
              </Button>
              <Button href="/houten-kozijnen" variant="secondary" size="sm">
                Houten kozijnen
              </Button>
              <Button href="/kosten" variant="secondary" size="sm">
                Wat het kost
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <MtbBouwBand tone="ink" />

      {/* Vragen */}
      <Section>
        <Container width="narrow">
          <Eyebrow>Vragen</Eyebrow>
          <h2 className="mb-8 mt-4 text-3xl text-ink sm:text-4xl">Vragen over kozijnen vervangen</h2>
          <FAQ items={vragen} />
          <div className="mt-8">
            <Button href="/faq" variant="ghost">
              Meer vragen en antwoorden <ArrowRightIcon />
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBlok
        titel="Je kozijnen laten vervangen in Enschede?"
        lead="Vertel ons wat je wilt vervangen. Foto's van je huidige kozijnen helpen, maar zijn niet nodig om te beginnen."
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
