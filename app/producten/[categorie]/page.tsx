import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { PresetCard } from "@/components/catalog/preset-card";
import {
  CATEGORIE_META,
  familiesByCategory,
  type ProductCategorie,
} from "@/data/preset-configuraties";

const CATEGORIES: ProductCategorie[] = ["ramen", "deuren", "schuifpuien"];

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
  const meta = CATEGORIE_META[categorie];
  return {
    title: `${meta.title} — online samenstellen`,
    description: `${meta.description} Stel online samen en ontvang direct een indicatieve richtprijs incl. btw.`,
    alternates: { canonical: `/producten/${categorie}` },
  };
}

export default async function CategoriePage({
  params,
}: {
  params: Promise<{ categorie: string }>;
}) {
  const { categorie } = await params;
  if (!isCategorie(categorie)) notFound();

  const meta = CATEGORIE_META[categorie];
  const families = familiesByCategory(categorie);

  return (
    <>
      <PageHero
        eyebrow={meta.label}
        title={meta.title}
        lead={meta.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Producten", href: "/producten" },
          { label: meta.label },
        ]}
        actions={<Button href="/configurator">Naar de configurator</Button>}
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

      <Section tone="ink">
        <Container>
          <Callout variant="disclaimer" className="border-paper/15 bg-paper/5 text-paper/70">
            <p>
              &ldquo;Vanaf&rdquo;-prijzen zijn indicatieve richtprijzen (incl. btw) op basis
              van een standaardmaat in kunststof, zonder montage. De definitieve
              prijs wordt vastgesteld na de inmeetservice (€ 49, verrekend bij
              doorgang).
            </p>
          </Callout>
        </Container>
      </Section>
    </>
  );
}
