import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { PresetCard } from "@/components/catalog/preset-card";
import { featuredPresets } from "@/data/preset-configuraties";

/** Product teaser on the homepage: a few presets that link into the configurator. */
export function FeaturedProducts() {
  const presets = featuredPresets();

  return (
    <Section tone="soft">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <Eyebrow>Producten</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Begin bij een product
            </h2>
            <p className="mt-3 leading-relaxed text-ink/60">
              Kies een product en stel het samen in de configurator. Je ziet
              meteen wat de montage kost; de prijs van je kozijnen krijg je op maat.
            </p>
          </div>
          <Button href="/producten" variant="secondary">
            Alle producten
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {presets.map((preset) => (
            <PresetCard key={preset.slug} preset={preset} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
