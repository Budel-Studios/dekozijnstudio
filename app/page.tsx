import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { FeaturedProducts } from "@/components/catalog/featured-products";
import { MtbBouwBand } from "@/components/mtb-bouw-band";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  WrenchIcon,
  EuroIcon,
  LeafIcon,
  UsersIcon,
  HomeIcon,
  ClockIcon,
  CheckIcon,
} from "@/components/icons";
import { inmeetservice } from "@/data/prices";
import { isdeInfo } from "@/data/subsidie";

export const metadata: Metadata = {
  title: "Nieuwe kozijnen zonder verborgen marges | De Kozijnstudio",
  description:
    "Transparante kozijnen in Twente & Oost-Nederland. Kunststof, houten en aluminium kozijnen met vaste tarieven incl. btw, complete montage en bouwkundige begeleiding via MTB Bouw.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "De Kozijnstudio — Mooie kozijnen. Eerlijk geprijsd.",
    description:
      "Transparante prijzen incl. btw, compleet ontzorgd via MTB Bouw. Werkgebied: Twente & Oost-Nederland.",
    type: "website",
  },
};

const pillars = [
  {
    icon: EuroIcon,
    n: "01",
    title: "Transparante prijzen",
    body: "Elke kostenpost zichtbaar: kozijn, montage, bouwkundig werk en subsidie — altijd incl. btw. Zo weet u precies waar u ja tegen zegt.",
  },
  {
    icon: WrenchIcon,
    n: "02",
    title: "Compleet ontzorgd",
    body: "Kozijnen én bouwkundig werk via MTB Bouw: van latei en metselwerk tot montage en afwerking. Eén aanspreekpunt, één planning.",
  },
  {
    icon: ShieldCheckIcon,
    n: "03",
    title: "Samen besparen",
    body: "Slimme automatisering houdt onze overhead laag. Die besparing delen we met u — ook via onze Aanbrengbonus (zie voorwaarden).",
  },
];

const materials = [
  {
    title: "Kunststof",
    tag: "Praktisch & slim",
    text: "Onderhoudsarm, energiezuinig en in elke kleur. Profielen van Schüco en Gealan.",
    href: "/kunststof-kozijnen",
    frame: "border-lime",
  },
  {
    title: "Hout",
    tag: "Natuurlijk maatwerk",
    text: "Warm, tijdloos en volledig op maat. Meranti en andere duurzame houtsoorten.",
    href: "/houten-kozijnen",
    frame: "border-wood-soft",
  },
  {
    title: "Aluminium",
    tag: "Slank & sterk",
    text: "Slanke profielen, maximaal glas. Schüco, Aluprof en Reynaers.",
    href: "/aluminium-kozijnen",
    frame: "border-ink/40",
  },
];

const steps = [
  { icon: UsersIcon, title: "Advies", text: "We luisteren, leggen uit en verkennen wat bij uw huis past." },
  { icon: HomeIcon, title: "Inmeten", text: `Voor ${inmeetservice.price} meten we precies in — verrekend bij doorgang.` },
  { icon: ClockIcon, title: "Levering", text: "Maatwerk vanaf ± 8 weken. U hoort vooraf wanneer alles klaarstaat." },
  { icon: WrenchIcon, title: "Montage", text: "Onze vakmensen plaatsen en werken alles netjes af." },
];

const homeFaqItems: FaqItem[] = [
  {
    question: "Zijn jullie prijzen echt inclusief btw?",
    answer:
      "Ja, altijd. Alle prijzen die wij communiceren zijn consumentenprijzen incl. 21% btw. Wat u ziet, is wat u betaalt.",
  },
  {
    question: "Wat houdt de inmeetservice in?",
    answer: `Voor ${inmeetservice.price} komen wij de exacte maten opmeten en uw situatie beoordelen. ${inmeetservice.note} Zo weet u precies waar u aan toe bent voordat u een beslissing neemt.`,
  },
  {
    question: "Kunnen jullie ook de muuropening vergroten?",
    answer:
      "Ja. Via MTB Bouw kunnen we bouwkundige aanpassingen uitvoeren: een opening vergroten, een latei plaatsen, metselwerk aanpassen en de binnenafwerking verzorgen. Alles onder één dak.",
  },
  {
    question: "Hoe lang duurt de levering?",
    answer:
      "Maatwerk kozijnen worden doorgaans geleverd vanaf ± 8 weken na de definitieve opmeting en opdracht. De exacte levertijd staat altijd vermeld in uw offerte.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative min-h-[36rem] overflow-hidden text-paper sm:min-h-[42rem]"
        aria-labelledby="hero-title"
      >
        {/* Sfeerbeeld (AI-gegenereerd in Lovable-merkproef) — vervangen door eigen projectfoto. */}
        <Image
          src="/images/home-hero.jpg"
          alt="Moderne woning met grote kozijnen en warme houten geveldetails"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10" />
        <Container className="relative flex min-h-[36rem] items-end pb-16 pt-24 sm:min-h-[42rem] sm:pb-24">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-pill border border-paper/30 bg-ink/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur-md">
              <span aria-hidden className="size-2 rounded-full bg-lime" />
              Kozijnen voor Twente & Oost-Nederland
            </p>
            <h1
              id="hero-title"
              className="text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-8xl"
            >
              Mooie kozijnen.
              <br />
              <span className="text-lime">Eerlijk geprijsd.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-paper/85 sm:text-lg">
              Voor ieder huis en ieder budget. U ziet wat u kiest, wat de
              montage kost en wie het maakt — alles incl. btw, zonder verborgen
              marges. Uw kozijnprijs stellen we op maat vast.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/prijzen" size="lg">
                Bekijk montagekosten <ArrowRightIcon />
              </Button>
              <Button href="/offerte-aanvragen" size="lg" variant="light">
                Offerte aanvragen
              </Button>
            </div>
          </div>
        </Container>
        <div className="absolute bottom-0 right-0 hidden items-center gap-8 rounded-tl-[3rem] bg-paper-soft px-10 py-6 text-ink md:flex">
          <div>
            <span className="block text-xs text-ink/60">Onderdeel van</span>
            <strong className="font-display text-lg">MTB Bouw</strong>
          </div>
          <div className="h-9 w-px bg-mist" />
          <div>
            <span className="block text-xs text-ink/60">Werkgebied</span>
            <strong className="font-display text-lg">Twente & Oost-Nederland</strong>
          </div>
        </div>
      </section>

      {/* ── Drie pijlers ── */}
      <Section tone="soft" className="sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Eyebrow>Waarom De Kozijnstudio</Eyebrow>
              <h2 className="mt-4 text-4xl leading-tight text-ink sm:text-5xl">
                Helder van eerste idee tot laatste kitrand.
              </h2>
            </div>
            <p className="max-w-xl self-end text-lg leading-8 text-ink/65">
              Geen glad verkooppraatje, wel aandacht voor uw huis. We leggen
              keuzes rustig uit en maken de optelsom zichtbaar.
            </p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-mist bg-mist md:grid-cols-3">
            {pillars.map(({ icon: Icon, n, title, body }) => (
              <article
                key={title}
                className="bg-paper p-7 transition-colors duration-300 hover:bg-mint sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-full bg-lime text-ink">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-display text-sm text-ink/50">{n}</span>
                </div>
                <h3 className="mt-12 text-2xl text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-ink/65">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Materialen ── */}
      <Section tone="ink" className="sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Eyebrow className="text-lime">Materiaal met karakter</Eyebrow>
              <h2 className="mt-4 max-w-2xl text-4xl text-paper sm:text-5xl">
                Drie materialen.
                <br />
                Eindeloos veel eigenheid.
              </h2>
            </div>
            <p className="max-w-sm leading-7 text-paper/65">
              We kijken samen naar uitstraling, onderhoud, isolatie en budget.
              Zonder een voorkeur op te dringen.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {materials.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex min-h-96 flex-col justify-between rounded-2xl bg-paper-soft p-7 text-ink transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <span className="rounded-pill border border-ink/15 px-3 py-1 text-xs font-semibold">
                    {item.tag}
                  </span>
                  <span className="font-display text-sm">0{index + 1}</span>
                </div>
                <div>
                  <div className="mb-8 flex h-32 items-end justify-center" aria-hidden>
                    <div className={`relative h-28 w-40 rounded-md border-[10px] ${item.frame}`}>
                      <div className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-current opacity-80" />
                    </div>
                  </div>
                  <h3 className="flex items-center gap-2 text-3xl">
                    {item.title}
                    <ArrowRightIcon className="size-5 -translate-x-1 text-forest opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-3 leading-7 text-ink/70">{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/kozijnen" size="lg" variant="light">
              Meer over materialen <ArrowRightIcon />
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── Meest gekozen producten (webshop-instap) ── */}
      <FeaturedProducts />

      {/* ── Zo werkt het ── */}
      <Section tone="soft" className="sm:py-28">
        <Container>
          <Eyebrow>Zo werkt het</Eyebrow>
          <h2 className="mt-4 text-4xl text-ink sm:text-5xl">
            Vier heldere stappen.
            <br />
            Eén vertrouwd team.
          </h2>
          <ol className="relative mt-16 grid gap-8 md:grid-cols-4 md:gap-5">
            <div
              aria-hidden
              className="absolute left-[12%] right-[12%] top-7 hidden border-t-2 border-dashed border-lime/60 md:block"
            />
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative">
                <div className="relative z-10 grid size-14 place-items-center rounded-full border-4 border-paper-soft bg-lime text-ink shadow-studio">
                  <Icon className="size-5" />
                </div>
                <span className="mt-6 block text-xs font-semibold text-ink/55">
                  STAP 0{i + 1}
                </span>
                <h3 className="mt-2 text-2xl text-ink">{title}</h3>
                <p className="mt-2 leading-7 text-ink/65">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button href="/montage" size="lg" variant="secondary">
              Meer over montage <ArrowRightIcon />
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── ISDE-subsidie ── */}
      <section className="bg-paper-soft py-4 sm:py-8" aria-labelledby="subsidy-title">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-paper sm:px-12 sm:py-16 lg:px-20">
            <LeafIcon
              aria-hidden
              className="absolute -bottom-12 -right-10 size-64 rotate-12 text-lime/15"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <Eyebrow className="text-lime">ISDE-subsidie</Eyebrow>
                <h2 id="subsidy-title" className="mt-4 max-w-2xl text-4xl text-paper sm:text-5xl">
                  Nieuwe kozijnen kunnen extra voordeel opleveren.
                </h2>
                <p className="mt-5 max-w-2xl leading-7 text-paper/75">
                  Bij isolatieglas en passende maatregelen komt u mogelijk in
                  aanmerking voor ISDE-subsidie. We helpen u begrijpen welke
                  voorwaarden relevant zijn.
                </p>
              </div>
              <div className="rounded-2xl border border-paper/15 bg-paper/10 p-6 backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-lime">
                  Actuele bedragen
                </span>
                <p className="mt-3 font-display text-xl font-semibold">
                  Zie RVO — regels wijzigen jaarlijks
                </p>
                <p className="mt-2 text-xs text-paper/55">
                  Informatie gecontroleerd: {isdeInfo.lastUpdated}.{" "}
                  <a
                    href={isdeInfo.rvoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-lime"
                  >
                    {isdeInfo.rvoLabel}
                  </a>
                </p>
                <Button href="/isde-subsidie" className="mt-6">
                  Hoe het werkt <ArrowRightIcon />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Over ons teaser ── */}
      <Section tone="soft" className="sm:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/images/home-hero.jpg"
              alt="Detail van een woning met nieuwe kozijnen en houten gevelaccenten"
              width={1600}
              height={1100}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="image-zoom aspect-[4/3] w-full object-cover object-right"
            />
          </div>
          <div>
            <Eyebrow>Over De Kozijnstudio</Eyebrow>
            <h2 className="mt-4 text-4xl text-ink sm:text-5xl">
              Transparant van begin tot eind.
            </h2>
            <p className="mt-5 leading-relaxed text-ink/65">
              De Kozijnstudio is opgericht vanuit MTB Bouw met één doel: de
              kozijnenmarkt transparant maken. Geen onduidelijke offertes — u
              weet vooraf precies wat u krijgt en wat het kost.
            </p>
            <FeatureList
              className="mt-6"
              items={[
                "Werkgebied: Twente & Oost-Nederland",
                `Inmeetservice ${inmeetservice.price} — verrekend bij doorgang`,
                "Levering vanaf ± 8 weken na opmeting",
                "Bouwkundige aanpassingen via MTB Bouw",
              ]}
            />
            <div className="mt-8">
              <Button href="/over-ons" variant="secondary" size="lg">
                Lees meer over ons <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── MTB Bouw — moederbedrijf & bouwpartner ── */}
      <MtbBouwBand tone="ink" />

      {/* ── Snelle FAQ ── */}
      <Section tone="soft" className="sm:py-28">
        <Container width="narrow">
          <Eyebrow>Veelgestelde vragen</Eyebrow>
          <h2 className="mb-10 mt-4 text-4xl text-ink sm:text-5xl">
            Wat klanten ons vaak vragen
          </h2>
          <FAQ items={homeFaqItems} />
          <div className="mt-8">
            <Button href="/faq" variant="ghost">
              Alle veelgestelde vragen <ArrowRightIcon />
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── Slot CTA ── */}
      <Section tone="paper" className="sm:py-28">
        <Container className="text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-lime text-ink shadow-studio">
            <CheckIcon className="size-7" />
          </span>
          <Eyebrow className="mt-8 justify-center">Zullen we samen kijken?</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl text-ink sm:text-6xl">
            Een goed kozijn begint met een helder gesprek.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-ink/65">
            Vraag een vrijblijvende offerte aan. Na de inmeetservice ontvangt u
            een gespecificeerde offerte — inclusief materiaal, montage en
            eventuele bouwkundige aanpassingen.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/offerte-aanvragen" size="lg">
              Offerte aanvragen <ArrowRightIcon />
            </Button>
            <Button href="/prijzen" size="lg" variant="secondary">
              Bekijk montagekosten
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
