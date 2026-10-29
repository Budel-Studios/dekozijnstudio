import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { PresetCard } from "@/components/catalog/preset-card";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import {
  CATEGORIE_META,
  familiesByCategory,
  type ProductCategorie,
} from "@/data/preset-configuraties";
import { SHOW_PRODUCT_PRICES } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

const CATEGORIES: ProductCategorie[] = ["ramen", "deuren", "schuifpuien"];

const link = "font-medium text-forest underline underline-offset-2";

/**
 * Page copy per category (SEO title, description, H1, lead and one practical
 * point of attention). Kept here so each category page has its own text; the
 * catalog data (data/preset-configuraties.ts) only holds the presets.
 */
const CATEGORIE_TEKST: Record<
  ProductCategorie,
  { seoTitle: string; description: string; h1: string; lead: string; aandachtspunt: ReactNode }
> = {
  ramen: {
    seoTitle: "Ramen samenstellen: draaikiep, vast glas en valramen",
    description:
      "Stel je raam zelf samen: vast glas, draaikiepramen, openslaande ramen of valramen, los of gecombineerd. Kies materiaal, glas en kleur in de configurator.",
    h1: "Ramen bekijken en samenstellen",
    lead: "Vaste ramen, draaikiepramen, openslaande ramen en valramen, los of samen met vast glas. Kies een indeling en pas maat, materiaal, glas en kleur aan in de configurator.",
    aandachtspunt: (
      <>
        Welk raam waar past, hangt af van hoe je wilt ventileren en schoonmaken. Een draaikiepraam kan op een kier en
        helemaal open; een vast raam geeft het meeste glas. Wil je weten welk glas past, of wat er bij het vervangen
        gebeurt? Lees{" "}
        <Link href="/kozijnen-vervangen" className={link}>
          hoe kozijnen vervangen in zijn werk gaat
        </Link>
        .
      </>
    ),
  },
  deuren: {
    seoTitle: "Deuren samenstellen: voordeur, achterdeur en tuindeuren",
    description:
      "Stel je nieuwe deur met kozijn zelf samen: een voordeur, achterdeur of openslaande tuindeuren, met of zonder zij- en bovenlicht. Bekijk de indelingen.",
    h1: "Deuren bekijken en samenstellen",
    lead: "Voordeuren, achterdeuren en openslaande tuindeuren, met of zonder zij- en bovenlicht. Kies een indeling en stel deur en kozijn samen in de configurator.",
    aandachtspunt: (
      <>
        Bij een deur tellen ook de draairichting, de drempel en het hang- en sluitwerk mee. Die keuzes maak je in de
        configurator; bij het inmeten kijken we of ze passen bij de bestaande opening. Lees meer over{" "}
        <Link href="/montage" className={link}>
          wat er bij de montage hoort
        </Link>
        .
      </>
    ),
  },
  schuifpuien: {
    seoTitle: "Schuifpuien en vouwwanden samenstellen",
    description:
      "Bekijk schuifpuien en vouwwanden in verschillende indelingen en stel ze zelf samen. Lees ook wanneer een grotere gevelopening bouwkundig werk vraagt.",
    h1: "Schuifpuien en vouwwanden bekijken en samenstellen",
    lead: "Schuifpuien en vouwwanden in verschillende indelingen. Kies een startpunt en pas maat, materiaal, glas en kleur aan in de configurator.",
    aandachtspunt: (
      <>
        Komt de schuifpui in een bestaande opening, of wordt de opening groter? Bij een grotere opening is vaak
        bouwkundig werk nodig, zoals een nieuwe latei of aangepast metselwerk. Of dat zo is, zien we bij het inmeten.
        Lees meer over{" "}
        <Link href="/bouwkundige-aanpassingen" className={link}>
          bouwkundige aanpassingen
        </Link>
        .
      </>
    ),
  },
};

export function generateStaticParams() {
  return CATEGORIES.map((categorie) => ({ categorie }));
}

function isCategorie(value: string): value is ProductCategorie {
  return (CATEGORIES as string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string }>;
}): Promise<Metadata> {
  const { categorie } = await params;
  if (!isCategorie(categorie)) return { title: "Niet gevonden" };
  const tekst = CATEGORIE_TEKST[categorie];
  return pageMetadata({
    title: tekst.seoTitle,
    description: tekst.description,
    path: `/producten/${categorie}`,
  });
}

export default async function CategoriePage({
  params,
}: {
  params: Promise<{ categorie: string }>;
}) {
  const { categorie } = await params;
  if (!isCategorie(categorie)) notFound();

  const meta = CATEGORIE_META[categorie];
  const tekst = CATEGORIE_TEKST[categorie];
  const families = familiesByCategory(categorie);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { label: "Home", href: "/" },
              { label: "Producten", href: "/producten" },
              { label: meta.label, href: `/producten/${categorie}` },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow={meta.label}
        title={tekst.h1}
        lead={tekst.lead}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Producten", href: "/producten" },
          { label: meta.label },
        ]}
        actions={
          <>
            <Button href="/configurator">Naar de configurator</Button>
            <Button href="/offerte" variant="secondary">Vraag een voorstel</Button>
          </>
        }
      />

      {families.map((familie, index) => (
        <Section key={familie.key} id={familie.key} tone={index % 2 === 0 ? "paper" : "soft"}>
          <Container>
            <div className="mb-8 max-w-xl">
              <Eyebrow>{familie.titel}</Eyebrow>
              <h2 className="mt-4 text-2xl text-ink sm:text-3xl">{familie.titel}</h2>
              <p className="mt-3 leading-relaxed text-ink/60">{familie.omschrijving}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {familie.presets.map((preset) => (
                <PresetCard key={preset.slug} preset={preset} />
              ))}
            </div>
          </Container>
        </Section>
      ))}

      <Section tone={families.length % 2 === 0 ? "paper" : "soft"}>
        <Container width="narrow">
          <h2 className="text-xl text-ink">Waar je op let</h2>
          <p className="mt-3 leading-relaxed text-ink/70">{tekst.aandachtspunt}</p>
          <p className="mt-4 leading-relaxed text-ink/70">
            Twijfel je over het materiaal?{" "}
            <Link href="/kozijnen" className={link}>
              Vergelijk hout, kunststof en aluminium
            </Link>
            .
          </p>
          <Callout variant="disclaimer" className="mt-6">
            <p>
              {SHOW_PRODUCT_PRICES
                ? "De vanafprijzen zijn indicatieve richtprijzen inclusief btw, op basis van een standaardmaat in kunststof, zonder montage. De definitieve prijs staat in je voorstel, nadat we bij je thuis hebben ingemeten."
                : "De prijs stellen we op maat vast. Voordat er iets besteld wordt, meten we bij je thuis in; de definitieve prijs staat in je voorstel."}
            </p>
          </Callout>
        </Container>
      </Section>

      <CtaBlok
        titel="Hulp nodig bij je keuze?"
        lead="Vertel ons wat je wilt. Je krijgt een voorstel met de kozijnen en de montage per onderdeel."
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/producten" variant="light">
              Alle producten
            </Button>
          </>
        }
      />
    </>
  );
}
