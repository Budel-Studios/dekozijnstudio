import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { ProductCard } from "@/components/catalog/product-card";
import {
  CATEGORIE_META,
  productsByCategory,
  type ProductCategorie,
} from "@/data/catalog";

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
  const products = productsByCategory(categorie);

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

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <Callout variant="disclaimer" className="mt-10">
            <p>
              "Vanaf"-prijzen zijn indicatieve richtprijzen (incl. btw) op basis
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
