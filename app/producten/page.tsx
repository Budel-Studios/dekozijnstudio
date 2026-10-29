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
import { PRESET_FAMILIES } from "@/data/preset-configuraties";
import { MODULES, SHOW_PRODUCT_PRICES } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "Ramen, deuren en schuifpuien bekijken en samenstellen",
  description:
    "Bekijk ramen, deuren en schuifpuien in verschillende indelingen en stel je kozijn zelf samen. Kies materiaal, glas en kleur en zie meteen wat de montage kost.",
  path: "/producten",
});

const link = "font-medium text-forest underline underline-offset-2";

export default function ProductenPage() {
  if (!MODULES.configurator) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { label: "Home", href: "/" },
              { label: "Producten", href: "/producten" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Producten"
        title="Kies een indeling en stel je kozijn samen"
        lead="Van een enkel draaikiepraam tot een voordeur met zij- en bovenlicht. Kies een indeling als startpunt en pas die in de configurator aan: materiaal, maat, glas en kleur. Daarna vraag je een prijs op maat aan."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Producten" }]}
        actions={
          <>
            <Button href="/configurator">Naar de configurator</Button>
            <Button href="/offerte" variant="secondary">Vraag een voorstel</Button>
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

      <Section tone="soft">
        <Container width="narrow">
          <h2 className="text-xl text-ink">Twijfel je over het materiaal?</h2>
          <p className="mt-3 leading-relaxed text-ink/70">
            Elke indeling kan in kunststof, hout of aluminium. Op de pagina{" "}
            <Link href="/kozijnen" className={link}>
              materialen vergelijken
            </Link>{" "}
            zet je de verschillen naast elkaar. Wil je weten wat bij de prijs hoort, bekijk dan{" "}
            <Link href="/kosten" className={link}>
              de prijsopbouw
            </Link>
            .
          </p>
          <Callout variant="disclaimer" className="mt-6">
            <p>
              {SHOW_PRODUCT_PRICES
                ? "De vanafprijzen zijn indicatieve richtprijzen inclusief btw, op basis van een standaardmaat in kunststof, zonder montage. De definitieve prijs staat in je voorstel, nadat we bij je thuis hebben ingemeten."
                : "De prijs van je kozijnen stellen we op maat vast. Voordat er iets besteld wordt, meten we bij je thuis in; de definitieve prijs staat in je voorstel."}
            </p>
          </Callout>
        </Container>
      </Section>

      <CtaBlok
        titel="Weet je niet precies wat je nodig hebt?"
        lead="Vertel ons wat je wilt veranderen. We denken mee over de indeling en je krijgt een voorstel met kozijnen en montage per onderdeel."
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/contact" variant="light">
              Neem contact op
            </Button>
          </>
        }
      />
    </>
  );
}
