import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Hero } from "@/components/ui/hero";
import { Button } from "@/components/ui/button";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Placeholder } from "@/components/ui/placeholder";
import { FeatureList } from "@/components/ui/feature-list";
import { FeaturedProducts } from "@/components/catalog/featured-products";
import { MtbBouwBand } from "@/components/mtb-bouw-band";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import { ArrowRightIcon, ShieldCheckIcon, WrenchIcon, EuroIcon } from "@/components/icons";
import { inmeetservice } from "@/data/prices";

export const metadata: Metadata = {
  title: "Nieuwe kozijnen zonder verborgen marges | De Kozijnstudio",
  description:
    "Transparante kozijnen in Twente & Oost-Nederland. Kunststof, houten en aluminium kozijnen met vaste tarieven incl. btw, complete montage en bouwkundige begeleiding via MTB Bouw.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "De Kozijnstudio — Nieuwe kozijnen zonder verborgen marges",
    description:
      "Transparante prijzen incl. btw, compleet ontzorgd via MTB Bouw. Werkgebied: Twente & Oost-Nederland.",
    type: "website",
  },
};

const pillars = [
  {
    icon: EuroIcon,
    eyebrow: "Pijler 1",
    title: "Transparante prijzen",
    body: "U ziet precies wat kozijnen, montage, bouwkundige aanpassingen en subsidie kosten — alles incl. btw, gespecificeerd per onderdeel. Geen verborgen marges, geen verrassingen achteraf.",
  },
  {
    icon: WrenchIcon,
    eyebrow: "Pijler 2",
    title: "Compleet ontzorgd",
    body: "Van inmeten tot sleutelklaar. Via MTB Bouw regelen we alles: levering, montage, openingen vergroten, metselwerk en binnenafwerking. Eén aanspreekpunt, één planning.",
  },
  {
    icon: ShieldCheckIcon,
    eyebrow: "Pijler 3",
    title: "Samen besparen",
    body: "Door slimme automatisering houden we de overhead laag. Wat we besparen, geven we terug via scherpe tarieven en onze Aanbrengbonus — draag binnen een jaar iemand aan en pak tot 25% cashback op uw eigen project.",
  },
];

const materials = [
  {
    title: "Kunststof kozijnen",
    description:
      "Onderhoudsvriendelijk, energiezuinig en leverbaar in elke kleur. Profielen van Schüco en Gealan.",
    href: "/kunststof-kozijnen",
  },
  {
    title: "Houten kozijnen",
    description:
      "Tijdloze uitstraling met uitstekende isolatiewaarden. Meranti en andere duurzame houtsoorten.",
    href: "/houten-kozijnen",
  },
  {
    title: "Aluminium kozijnen",
    description:
      "Slanke profielen, maximaal glas en minimaal onderhoud. Schüco, Aluprof en Reynaers.",
    href: "/aluminium-kozijnen",
  },
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
      <Hero
        title="Nieuwe kozijnen zonder verborgen marges."
        subtitle="Transparante prijzen incl. btw, vaste montagetarieven en complete bouwkundige begeleiding via MTB Bouw. Werkgebied: Twente & Oost-Nederland."
        actions={
          <>
            <Button href="/prijzen">Bekijk prijzen</Button>
            <Button href="/offerte-aanvragen" variant="secondary">
              Offerte aanvragen
            </Button>
          </>
        }
      />

      {/* ── Drie pijlers ── */}
      <Section>
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow>Onze aanpak</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Drie pijlers onder elk project
            </h2>
            <p className="mt-4 leading-relaxed text-ink/60">
              De kozijnenmarkt is ondoorzichtig. Wij doen het anders: volledige
              transparantie over kosten, proces en materialen.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title}>
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-forest/8">
                    <Icon className="size-5 text-forest" />
                  </div>
                  <CardEyebrow>{pillar.eyebrow}</CardEyebrow>
                  <CardTitle>{pillar.title}</CardTitle>
                  <CardBody>{pillar.body}</CardBody>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── Meest gekozen producten (webshop-instap) ── */}
      <FeaturedProducts />

      {/* ── Materialen ── */}
      <Section>
        <Container>
          <Eyebrow>Kozijnen op maat</Eyebrow>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
            Welk materiaal past bij uw woning?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink/60">
            Kunststof, hout of aluminium — elk materiaal heeft zijn eigen
            voordelen. We helpen u de juiste keuze te maken op basis van uw
            situatie, budget en wensen.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {materials.map((mat) => (
              <Link
                key={mat.href}
                href={mat.href}
                className="group rounded-card border border-mist bg-paper p-6 transition-shadow hover:shadow-soft"
              >
                <Placeholder label={`Beeld — ${mat.title}`} className="mb-5 min-h-40" />
                <h3 className="flex items-center gap-2 font-display font-semibold text-ink">
                  {mat.title}
                  <ArrowRightIcon className="size-4 -translate-x-1 text-forest opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {mat.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Over ons teaser ── */}
      <Section tone="soft">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Placeholder label="Sfeerbeeld — team / werkplaats" className="min-h-72" />
          <div>
            <Eyebrow>Over De Kozijnstudio</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Transparantie van begin tot eind
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              De Kozijnstudio is opgericht vanuit MTB Bouw met één doel: de
              kozijnenmarkt transparant maken. Geen tussenhandel, geen
              onduidelijke offertes. U weet van tevoren precies wat u krijgt en
              wat het kost.
            </p>
            <FeatureList
              className="mt-5"
              items={[
                "Werkgebied: Twente & Oost-Nederland",
                `Inmeetservice ${inmeetservice.price} — verrekend bij doorgang`,
                "Levering vanaf ± 8 weken na opmeting",
                "Bouwkundige aanpassingen mogelijk via MTB Bouw",
              ]}
            />
            <div className="mt-7">
              <Button href="/over-ons" variant="secondary">
                Lees meer over ons
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── MTB Bouw — moederbedrijf & bouwpartner ── */}
      <MtbBouwBand tone="ink" />

      {/* ── Snelle FAQ ── */}
      <Section>
        <Container width="narrow">
          <Eyebrow>Veelgestelde vragen</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
            Wat klanten ons vaak vragen
          </h2>
          <FAQ items={homeFaqItems} />
          <div className="mt-8">
            <Button href="/faq" variant="ghost">
              Alle veelgestelde vragen →
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── Slot CTA ── */}
      <Section tone="ink">
        <Container className="text-center">
          <Eyebrow className="justify-center text-paper/50">
            Geen verplichtingen
          </Eyebrow>
          <h2 className="mt-4 text-2xl text-paper sm:text-3xl">
            Benieuwd wat nieuwe kozijnen kosten?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            Vraag een vrijblijvende offerte aan. Na de inmeetservice ontvangt u
            een gespecificeerde offerte — inclusief materiaal, montage en
            eventuele bouwkundige aanpassingen.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button href="/prijzen" variant="secondary">
              Bekijk prijzen
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
