import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Placeholder, PlaceholderTag } from "@/components/ui/placeholder";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { LOREM_LEAD, LOREM_PARAGRAPH } from "@/lib/placeholder";
import { primaryCta } from "@/lib/navigation";

/**
 * Generic wireframe page used for every sitemap route in fase 1.
 * It deliberately contains NO real copy — only clearly-marked placeholders
 * and empty layout slots, so the page structure can be reviewed in preview.
 */
export function WireframeStub({
  title,
  breadcrumbs,
  blocks = 3,
}: {
  title: string;
  breadcrumbs?: Crumb[];
  /** Number of placeholder content blocks to render. */
  blocks?: number;
}) {
  return (
    <>
      <Section tone="soft" className="py-12 sm:py-16">
        <Container>
          {breadcrumbs && (
            <div className="mb-6">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          <PlaceholderTag>Wireframe · fase 1</PlaceholderTag>
          <h1 className="text-display-sm sm:text-display mt-5 text-ink">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/55">
            {LOREM_LEAD}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href="/prijzen" variant="secondary">
              Bekijk prijzen
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <Placeholder label="Sectiebeeld" className="min-h-64" />
          <div>
            <Eyebrow>Placeholder-sectie</Eyebrow>
            <h2 className="mt-3 text-2xl text-ink">Lorem ipsum kop</h2>
            <p className="mt-4 leading-relaxed text-ink/60">{LOREM_PARAGRAPH}</p>
            <p className="mt-4 leading-relaxed text-ink/60">{LOREM_PARAGRAPH}</p>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: blocks }).map((_, index) => (
              <Card key={index}>
                <CardEyebrow>Blok {index + 1}</CardEyebrow>
                <CardTitle>Lorem ipsum</CardTitle>
                <CardBody>{LOREM_PARAGRAPH}</CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
