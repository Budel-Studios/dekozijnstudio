import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { PresetCard } from "@/components/catalog/preset-card";
import { PRESET_FAMILIES } from "@/data/preset-configuraties";

export const metadata: Metadata = {
  title: "Producten — kozijnen, deuren & schuifpuien",
  description:
    "Bekijk onze voorgeconfigureerde kozijnen, deuren en schuifpuien en stel ze online samen. Direct een indicatieve richtprijs incl. btw, daarna een offerte op maat.",
  alternates: { canonical: "/producten" },
};

export default function ProductenPage() {
  return (
    <>
      <PageHero
        eyebrow="Producten"
        title="Kies een samenstelling en stel het zelf samen."
        lead="Van een enkel draaikiepraam tot een voordeur met boven- en zijlichten — kies een voorgeconfigureerd product, pas het aan in de configurator en ontvang direct een indicatieve richtprijs. Materiaal kiest u in de configurator."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Producten" }]}
        actions={
          <>
            <Button href="/configurator">Naar de configurator</Button>
            <Button href="/offerte-aanvragen" variant="secondary">Offerte aanvragen</Button>
          </>
        }
      />

      {PRESET_FAMILIES.map((familie, index) => (
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
        <Container className="text-center">
          <Callout variant="disclaimer" className="mx-auto mb-8 max-w-2xl border-paper/15 bg-paper/5 text-paper/70">
            <p>
              Getoonde &ldquo;vanaf&rdquo;-prijzen zijn indicatieve richtprijzen (incl. btw)
              op basis van een standaardmaat in kunststof, zonder montage. De
              definitieve prijs volgt na de inmeetservice.
            </p>
          </Callout>
          <h2 className="text-2xl text-paper sm:text-3xl">Niet zeker welke samenstelling u nodig heeft?</h2>
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
