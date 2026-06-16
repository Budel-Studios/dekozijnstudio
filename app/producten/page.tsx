import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { ProductCard } from "@/components/catalog/product-card";
import { ArrowRightIcon } from "@/components/icons";
import {
  CATEGORIE_META,
  productsByCategory,
  type ProductCategorie,
} from "@/data/catalog";

export const metadata: Metadata = {
  title: "Producten — kozijnen, deuren & schuifpuien",
  description:
    "Bekijk onze kozijnen, deuren en schuifpuien en stel ze online samen. Direct een indicatieve richtprijs incl. btw, daarna een offerte op maat.",
  alternates: { canonical: "/producten" },
};

const categorieen: ProductCategorie[] = ["ramen", "deuren", "schuifpuien"];

export default function ProductenPage() {
  return (
    <>
      <PageHero
        eyebrow="Producten"
        title="Kies een product en stel het zelf samen."
        lead="Van draaikiepraam tot schuifpui — bekijk onze producten, configureer in twee minuten en ontvang direct een indicatieve richtprijs. Materiaal kiest u in de configurator."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Producten" }]}
        actions={
          <>
            <Button href="/configurator">Naar de configurator</Button>
            <Button href="/offerte-aanvragen" variant="secondary">Offerte aanvragen</Button>
          </>
        }
      />

      {categorieen.map((cat, index) => {
        const meta = CATEGORIE_META[cat];
        const products = productsByCategory(cat);
        return (
          <Section key={cat} id={cat} tone={index % 2 === 0 ? "paper" : "soft"}>
            <Container>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-xl">
                  <Eyebrow>{meta.label}</Eyebrow>
                  <h2 className="mt-4 text-2xl text-ink sm:text-3xl">{meta.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink/60">{meta.description}</p>
                </div>
                <Link
                  href={`/producten/${cat}`}
                  className="flex items-center gap-1.5 text-sm font-medium text-forest hover:underline"
                >
                  Bekijk {meta.label.toLowerCase()}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      <Section tone="ink">
        <Container className="text-center">
          <Callout variant="disclaimer" className="mx-auto mb-8 max-w-2xl border-paper/15 bg-paper/5 text-paper/70">
            <p>
              Getoonde "vanaf"-prijzen zijn indicatieve richtprijzen (incl. btw)
              op basis van een standaardmaat in kunststof, zonder montage. De
              definitieve prijs volgt na de inmeetservice.
            </p>
          </Callout>
          <h2 className="text-2xl text-paper sm:text-3xl">Niet zeker welk product u nodig heeft?</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            Vraag een vrijblijvende offerte aan of neem contact op — we denken
            graag met u mee.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button href="/contact" variant="secondary">Contact</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
