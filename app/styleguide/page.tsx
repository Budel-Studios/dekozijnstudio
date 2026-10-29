import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { PriceTable } from "@/components/ui/price-table";
import { FAQ } from "@/components/ui/faq";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Placeholder, PlaceholderTag } from "@/components/ui/placeholder";
import { LOREM_PARAGRAPH } from "@/lib/placeholder";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "lime — signatuur", value: "#ABE000", className: "bg-lime", text: "text-ink" },
  { name: "ink — antraciet", value: "#23272A", className: "bg-ink", text: "text-paper" },
  { name: "paper-soft — warm wit", value: "#F7F6F3", className: "bg-paper-soft border border-mist", text: "text-ink" },
  { name: "paper", value: "#FFFFFF", className: "bg-paper border border-mist", text: "text-ink" },
  { name: "forest — tekstgroen", value: "#4D7C0F", className: "bg-forest", text: "text-paper" },
  { name: "mint — limoentint", value: "#F1F5E4", className: "bg-mint border border-mist", text: "text-ink" },
  { name: "wood-soft — hout", value: "#C9A36B", className: "bg-wood-soft", text: "text-ink" },
  { name: "mist — lijnen", value: "#E3DFD6", className: "bg-mist", text: "text-ink" },
];

const typeScale = [
  { label: "display-lg", className: "text-display-lg" },
  { label: "display", className: "text-display" },
  { label: "display-sm", className: "text-display-sm" },
  { label: "2xl", className: "text-2xl" },
  { label: "xl", className: "text-xl" },
  { label: "base", className: "text-base" },
  { label: "sm", className: "text-sm" },
];

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-mist py-12 first:border-t-0">
      <h2 className="text-xl text-ink">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <Section tone="soft" className="py-12 sm:py-16">
        <Container>
          <PlaceholderTag>Design system · fase 1</PlaceholderTag>
          <h1 className="text-display-sm sm:text-display mt-5 text-ink">
            Styleguide
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/55">
            Tokens en componenten van De Kozijnstudio. Premium, minimal,
            toegankelijk.
          </p>
        </Container>
      </Section>

      <Container className="pb-24">
        {/* Colours */}
        <Block title="Kleuren">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {colors.map((color) => (
              <div key={color.name}>
                <div
                  className={`flex h-24 items-end rounded-card p-3 ${color.className} ${color.text}`}
                >
                  <span className="text-xs font-medium">{color.value}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-ink">{color.name}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* Typography */}
        <Block title="Typografie">
          <div className="space-y-4">
            {typeScale.map((t) => (
              <div
                key={t.label}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
              >
                <span className="w-28 shrink-0 text-xs uppercase tracking-widest text-ink/40">
                  {t.label}
                </span>
                <span className={`${t.className} text-ink`}>
                  De Kozijnstudio
                </span>
              </div>
            ))}
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <div className="rounded-card border border-mist p-5">
                <p className="text-xs uppercase tracking-widest text-ink/40">
                  Display — Bricolage Grotesque
                </p>
                <p className="mt-2 font-display text-2xl text-ink">
                  Koppen in Bricolage Grotesque
                </p>
              </div>
              <div className="rounded-card border border-mist p-5">
                <p className="text-xs uppercase tracking-widest text-ink/40">
                  Body — Sora
                </p>
                <p className="mt-2 leading-relaxed text-ink/70">
                  {LOREM_PARAGRAPH}
                </p>
              </div>
            </div>
          </div>
        </Block>

        {/* Buttons */}
        <Block title="Buttons">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/styleguide">Als link</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </Block>

        {/* Cards */}
        <Block title="Cards">
          <div className="grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <Card key={n}>
                <CardEyebrow>Eyebrow</CardEyebrow>
                <CardTitle>Kaarttitel {n}</CardTitle>
                <CardBody>{LOREM_PARAGRAPH}</CardBody>
              </Card>
            ))}
          </div>
        </Block>

        {/* Price table */}
        <Block title="PriceTable (shell)">
          <div className="max-w-xl">
            <PriceTable
              caption="Voorbeeld prijstabel"
              rows={[
                { label: "Montage per kozijn", price: "—", from: true, note: "Placeholder" },
                { label: "Levering-only", price: "—", from: true },
                { label: "Inmeetservice", price: "—", note: "Verrekend bij doorgang" },
              ]}
              footnote="Placeholder — bedragen volgen data-driven in fase 2. Incl. btw."
            />
          </div>
        </Block>

        {/* FAQ */}
        <Block title="FAQ-accordion">
          <div className="max-w-xl">
            <FAQ
              items={[
                { question: "Placeholdervraag één?", answer: LOREM_PARAGRAPH },
                { question: "Placeholdervraag twee?", answer: LOREM_PARAGRAPH },
              ]}
            />
          </div>
        </Block>

        {/* Breadcrumbs */}
        <Block title="Breadcrumbs">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Kozijnen", href: "/kunststof-kozijnen" },
              { label: "Kunststof kozijnen" },
            ]}
          />
        </Block>

        {/* Placeholders */}
        <Block title="Placeholders">
          <div className="space-y-4">
            <PlaceholderTag />
            <Placeholder label="Beeld volgt" className="max-w-md" />
          </div>
        </Block>
      </Container>
    </>
  );
}
