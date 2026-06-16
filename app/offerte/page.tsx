import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Checkout } from "@/components/offerte/checkout";

export const metadata: Metadata = {
  title: "Jouw project",
  description:
    "Jouw project in één overzicht: kozijn, montage per onderdeel en ISDE-subsidie met transparante prijzen incl. btw — inclusief aanbetaling en restant. Vrijblijvend.",
  alternates: { canonical: "/offerte" },
  robots: { index: false, follow: true }, // flow-pagina, niet apart indexeren
};

export default function OffertePage() {
  return (
    <>
      <PageHero
        eyebrow="Jouw project"
        title="Alles van jouw project op één plek."
        lead="Je kozijn, elke montagepost met prijs en de ISDE-subsidie in één overzicht — met bruto, netto, aanbetaling en restant. Vul je gegevens in en wij nemen contact op."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Jouw project" }]}
      />

      <Section>
        <Container>
          <Checkout />
        </Container>
      </Section>
    </>
  );
}
