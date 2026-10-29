import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BevestigingDetails } from "@/components/offerte/bevestiging-details";
import { pageMetadata } from "@/lib/seo";

/** Thank-you page after a confirmed request. noindex, not in the sitemap. */
export const metadata = pageMetadata({
  title: "Bedankt voor je aanvraag",
  description: "Je aanvraag is bij ons binnengekomen.",
  path: "/bedankt",
  noindex: true,
});

export default function BedanktPage() {
  return (
    <Section tone="soft">
      <Container width="narrow">
        <Eyebrow>Aanvraag ontvangen</Eyebrow>
        <h1 className="mt-4 text-display-sm text-ink">Bedankt, je aanvraag is binnen</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
          We bekijken je wensen en nemen contact met je op om de volgende stap te bespreken.
        </p>
        <BevestigingDetails />
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/werkwijze">Zo gaat het verder</Button>
          <Button href="/kosten" variant="secondary">
            Waar de prijs van afhangt
          </Button>
        </div>
      </Container>
    </Section>
  );
}
