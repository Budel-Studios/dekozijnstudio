import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Placeholder } from "@/components/ui/placeholder";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Projecten",
  description:
    "Gerealiseerde kozijnenprojecten door De Kozijnstudio in Twente & Oost-Nederland. Kunststof, houten en aluminium kozijnen.",
  alternates: { canonical: "/projecten" },
};

// Placeholder projecten — echte projectfoto's en omschrijvingen volgen zodra
// de first projecten zijn opgeleverd en klanten toestemming hebben gegeven.
const projects = [
  { type: "Kunststof kozijnen", location: "Twente", description: "Vervanging van alle kozijnen, inclusief voordeur en schuifpui. Schüco-profielen in antraciet." },
  { type: "Houten kozijnen", location: "Oost-Nederland", description: "Restauratie en gedeeltelijke vervanging van houten kozijnen in monumentale woning. Meranti, wit geschilderd." },
  { type: "Aluminium kozijnen", location: "Twente", description: "Nieuwbouwproject: volledige beglazing in aluminium. Reynaers-profielen, triple glas." },
  { type: "Kunststof + bouwkundig", location: "Oost-Nederland", description: "Kozijnen vervangen inclusief vergroting van twee muuropeningen via MTB Bouw." },
];

export default function ProjectenPage() {
  return (
    <>
      <PageHero
        eyebrow="Projecten"
        title="Wat we hebben gerealiseerd."
        lead="Een greep uit onze gerealiseerde projecten in Twente en Oost-Nederland. Van standaard kozijnvervanging tot complete gevelpakketten met bouwkundige aanpassingen."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projecten" }]}
        actions={<Button href="/offerte-aanvragen">Offerte aanvragen</Button>}
      />

      <Section>
        <Container>
          <Eyebrow>Realisaties</Eyebrow>
          <h2 className="mt-4 mb-10 text-2xl text-ink sm:text-3xl">
            Recente projecten
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {projects.map((project, index) => (
              <div key={index} className="group overflow-hidden rounded-card border border-mist bg-paper">
                <Placeholder
                  label={`Projectfoto — ${project.type}`}
                  className="rounded-none border-0 min-h-56"
                />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-wood">
                    {project.location}
                  </p>
                  <h3 className="mt-2 font-display font-semibold text-ink">{project.type}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-ink/45 text-center">
            Projectfoto's en klantreviews worden toegevoegd zodra projecten zijn
            opgeleverd en toestemming is verkregen.
          </p>
        </Container>
      </Section>

      <Section tone="ink">
        <Container className="text-center">
          <h2 className="text-2xl text-paper sm:text-3xl">
            Uw project als volgende?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            Vraag een vrijblijvende offerte aan en ontdek wat wij voor uw
            woning kunnen betekenen.
          </p>
          <div className="mt-8">
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
