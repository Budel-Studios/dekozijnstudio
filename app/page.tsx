import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import { FeaturedProducts } from "@/components/catalog/featured-products";
import { MtbBouwBand } from "@/components/mtb-bouw-band";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { ArrowRightIcon, EuroIcon, UsersIcon, WrenchIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { MODULES } from "@/lib/site";

export const metadata = pageMetadata({
  absoluteTitle: "Kozijnen in Enschede en Twente | De Kozijnstudio",
  description:
    "Nieuwe kozijnen in Enschede of Twente? Vergelijk materialen, bekijk onze werkwijze en vraag een voorstel aan voor jouw woning.",
  path: "/",
});

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

const stappen = [
  { title: "Je vraag", text: "Je vertelt wat je wilt, eventueel met foto's van je huidige kozijnen." },
  { title: "Advies en inmeten", text: "We bespreken de keuzes en meten bij je thuis in voordat er iets besteld wordt." },
  { title: "Voorstel", text: "Je krijgt een uitgesplitst voorstel. Pas na je akkoord bestellen we." },
  { title: "Montage en oplevering", text: "We plaatsen de kozijnen, werken alles af en lopen het samen met je na." },
];

const vragen: FaqItem[] = [
  {
    question: "Komen jullie eerst inmeten?",
    answer:
      "Ja. Voordat er iets besteld wordt, meten we bij je thuis in en bekijken we de staat van de bestaande opening. Globale maten uit je aanvraag zijn nog geen productiematen.",
  },
  {
    question: "Regelen jullie ook de montage?",
    answer: (
      <>
        Ja, we leveren en monteren. Wat er bij het monteren komt kijken, van het verwijderen van je oude kozijnen
        tot de afwerking binnen, lees je op de pagina over{" "}
        <Link href="/montage" className="font-medium text-forest underline underline-offset-2">
          montage
        </Link>
        .
      </>
    ),
  },
  {
    question: "Wat kosten nieuwe kozijnen?",
    answer: (
      <>
        Dat hangt af van materiaal, maat, glas, kleur en het werk in je woning. Op de{" "}
        <Link href="/kosten" className="font-medium text-forest underline underline-offset-2">
          kostenpagina
        </Link>{" "}
        lees je welke keuzes de prijs bepalen en hoe je offertes met dezelfde uitgangspunten vergelijkt.
      </>
    ),
  },
  {
    question: "In welke plaatsen werken jullie?",
    answer: (
      <>
        We werken vanuit Enschede in heel Twente, waaronder Hengelo, Almelo, Oldenzaal, Haaksbergen, Losser en Borne.
        Twijfel je over jouw adres? Bekijk ons{" "}
        <Link href="/werkgebied" className="font-medium text-forest underline underline-offset-2">
          werkgebied
        </Link>{" "}
        of vraag het ons.
      </>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden text-paper" aria-labelledby="hero-title">
        {/* Sfeerbeeld — geen eigen project. Vervangen door een echte projectfoto zodra die er is. */}
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
            <p className="mb-5 inline-flex items-center gap-2 rounded-pill border border-paper/30 bg-ink/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur-md">
              <span aria-hidden className="size-2 rounded-full bg-lime" />
              Kozijnen · Enschede en Twente
            </p>
            <h1 id="hero-title" className="text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
              Kozijnen in Enschede en Twente
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-paper/90 sm:text-lg">
              Nieuwe kozijnen kiezen begint met overzicht. Wat past bij je woning, welk glas is verstandig en
              wat kost de uitvoering? We bespreken de keuzes voor jouw woning, en je voorstel laat zien wat
              wordt geleverd en welk werk daarbij hoort.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/offerte" size="lg">
                Vraag een voorstel <ArrowRightIcon />
              </Button>
              <Button href="/kosten" size="lg" variant="light">
                Bekijk de prijsopbouw
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
            <h2 className="mt-4 text-3xl leading-tight text-ink sm:text-4xl">
              Weten waar je ja tegen zegt
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink/70">
              Geen verkooppraatje, wel uitleg. We maken de keuzes en de optelsom zichtbaar, zodat je een
              beslissing neemt die bij je woning en budget past.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-mist bg-mist md:grid-cols-3">
            {redenen.map(({ icon: Icon, title, body }) => (
              <article key={title} className="bg-paper p-7 sm:p-9">
                <span className="grid size-12 place-items-center rounded-full bg-lime text-ink">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-8 text-xl text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-ink/70">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Materialen */}
      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Eyebrow>Materialen</Eyebrow>
              <h2 className="mt-4 max-w-2xl text-3xl text-ink sm:text-4xl">Kunststof, hout of aluminium</h2>
            </div>
            <p className="max-w-md leading-7 text-ink/70">
              Elk materiaal heeft eigen sterke kanten. We kijken samen naar uitstraling, onderhoud, isolatie en budget.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {materialen.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group flex flex-col justify-between rounded-2xl border border-mist bg-paper-soft p-7 transition-colors hover:border-forest"
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
            <Link href="/kozijnen" className="font-medium text-forest underline underline-offset-2">
              Zet de materialen naast elkaar
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Kosten */}
      <Section tone="soft">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Kosten</Eyebrow>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Waar de prijs van afhangt</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Een kozijnprijs is maatwerk: twee ramen van dezelfde maat kunnen in prijs verschillen door het glas,
              de kleur of het werk eromheen. Daarom zetten we in je voorstel elk onderdeel apart, inclusief btw.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/kosten">Bekijk de prijsopbouw</Button>
              <Button href="/kozijnen-vervangen" variant="secondary">
                Kozijnen vervangen: zo gaat het
              </Button>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {prijsfactoren.map((f) => (
              <li key={f} className="rounded-xl border border-mist bg-paper px-5 py-4 text-sm font-medium text-ink">
                {f}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {MODULES.configurator && <FeaturedProducts />}

      {/* Werkwijze */}
      <Section>
        <Container>
          <Eyebrow>Werkwijze</Eyebrow>
          <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Van eerste vraag tot nieuwe kozijnen</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {stappen.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-mist bg-paper-soft p-6">
                <span className="font-display text-sm font-semibold text-ink/60">Stap {i + 1}</span>
                <h3 className="mt-2 text-lg text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Button href="/werkwijze" variant="secondary">
              Bekijk de volledige werkwijze <ArrowRightIcon />
            </Button>
          </div>
        </Container>
      </Section>

      {/* Kozijnen in Enschede — lokale context */}
      <Section tone="soft">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Enschede</Eyebrow>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Kozijnen voor Enschedese woningen</h2>
          </div>
          <div className="space-y-4 leading-relaxed text-ink/70">
            <p>
              Enschede heeft een gemengde woningvoorraad. In de vooroorlogse wijken staan veel jaren-20- en
              jaren-30-woningen met houten kozijnen en fijne roedeverdelingen. Daar luistert de detaillering nauw,
              en kies je vaak voor hout of voor kunststof met een verdiept, klassiek profiel.
            </p>
            <p>
              In de naoorlogse wijken, zoals in Enschede-Zuid, staan veel rijwoningen waar het vervangen van
              enkel of oud dubbel glas en tochtige kozijnen het meeste comfort oplevert. Bij nieuwere woningen en
              aanbouwen zien we vaker slanke aluminium kozijnen en schuifpuien.
            </p>
            <p>
              We werken vanuit Enschede, in alle wijken en in de rest van{" "}
              <Link href="/werkgebied" className="font-medium text-forest underline underline-offset-2">
                Twente
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      <MtbBouwBand tone="ink" />

      {/* Vragen */}
      <Section>
        <Container width="narrow">
          <Eyebrow>Vragen</Eyebrow>
          <h2 className="mb-8 mt-4 text-3xl text-ink sm:text-4xl">Vragen die we vaak krijgen</h2>
          <FAQ items={vragen} />
          <div className="mt-8">
            <Button href="/faq" variant="ghost">
              Meer vragen en antwoorden <ArrowRightIcon />
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBlok
        titel="Zullen we naar jouw woning kijken?"
        lead="Vertel ons wat je wilt veranderen. Foto's van je huidige kozijnen helpen, maar zijn niet nodig om te beginnen."
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
