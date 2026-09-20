import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { PresetCard } from "@/components/catalog/preset-card";
import { featuredPresets } from "@/data/preset-configuraties";

/** "Meest gekozen producten" — conversie-instap op de homepage. */
export function FeaturedProducts() {
  const presets = featuredPresets();

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
              inzicht in de montagekosten, daarna uw prijs op maat.
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
