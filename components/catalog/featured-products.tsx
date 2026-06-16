import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/catalog/product-card";
import { featuredProducts } from "@/data/catalog";

/** "Meest gekozen producten" — conversie-instap op de homepage. */
export function FeaturedProducts() {
  const products = featuredProducts();

  return (
    <Section tone="soft">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <Eyebrow>Meest gekozen</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Populaire producten
            </h2>
            <p className="mt-3 leading-relaxed text-ink/60">
              Kies een product en stel het in twee minuten samen — direct een
              indicatieve richtprijs, daarna desgewenst een offerte op maat.
            </p>
          </div>
          <Button href="/producten" variant="secondary">
            Alle producten
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
