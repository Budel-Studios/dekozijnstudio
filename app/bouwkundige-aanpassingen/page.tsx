import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Placeholder } from "@/components/ui/placeholder";
import { MtbBouwBand } from "@/components/mtb-bouw-band";

export const metadata: Metadata = {
  title: "Bouwkundige aanpassingen",
  description:
    "Opening vergroten, latei plaatsen, metselwerk en binnenafwerking — alles via MTB Bouw. Eén bedrijf, één planning, één offerte.",
  alternates: { canonical: "/bouwkundige-aanpassingen" },
};

const aanpassingen = [
  {
    eyebrow: "Opening vergroten",
    title: "Grotere ramen of deuren",
    body: "Wilt u meer licht of een grotere doorgang? We vergroten de muuropening en passen de latei aan — alles conform de constructieve eisen van uw woning.",
  },
  {
    eyebrow: "Constructief",
    title: "Latei plaatsen of vervangen",
    body: "Een nieuwe of te vervangen latei is constructief werk dat vakkundig uitgevoerd moet worden. MTB Bouw heeft de kennis en materialen om dit veilig te doen.",
  },
  {
    eyebrow: "Afwerking",
    title: "Metselwerk en pleisterwerk",
    body: "Na het aanpassen van een opening verzorgen we het metselwerk en de binnen- en buitenafwerking zodat alles naadloos aansluit.",
  },
  {
    eyebrow: "Binnenwerk",
    title: "Dorpels, stucwerk en kozijnbekleding",
    body: "De binnenafwerking rondom een nieuw kozijn — dorpels, stucwerk en kozijnbekleding — wordt door dezelfde ploeg verzorgd.",
  },
];

export default function BouwkundigeAanpassingenPage() {
  return (
    <>
      <PageHero
        eyebrow="Bouwkundige aanpassingen"
        title="Eén bedrijf voor kozijnen én de verbouwing."
        lead="Via MTB Bouw kunnen we bouwkundige aanpassingen uitvoeren als onderdeel van uw kozijnenproject. Geen extra aannemers, geen coördinatiegedoe — één planning, één aanspreekpunt."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Bouwkundige aanpassingen" }]}
        actions={
          <>
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button href="/montage" variant="secondary">Over de montage</Button>
          </>
        }
        media={<Placeholder label="Bouwkundige aanpassing — sfeerfoto" className="min-h-72 lg:min-h-80" />}
      />

      <Section>
        <Container>
          <Eyebrow>Wat is mogelijk?</Eyebrow>
          <h2 className="mt-4 mb-10 text-2xl text-ink sm:text-3xl">
            Alle voorkomende bouwkundige werkzaamheden
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {aanpassingen.map((a) => (
              <Card key={a.title}>
                <Placeholder label={`Beeld — ${a.title}`} className="mb-4 min-h-32" />
                <CardEyebrow>{a.eyebrow}</CardEyebrow>
                <CardTitle>{a.title}</CardTitle>
                <CardBody>{a.body}</CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Voordeel</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Alles in één offerte
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Bouwkundige aanpassingen worden altijd apart en transparant
              vermeld in uw offerte — per onderdeel, incl. btw. U ziet precies
              wat erbij komt kijken en kunt een weloverwogen beslissing nemen.
            </p>
            <p className="mt-4 leading-relaxed text-ink/65">
              Doordat De Kozijnstudio en MTB Bouw samenwerken, hoeft u niet zelf
              een aannemer in te schakelen. We plannen alles op elkaar af: de
              bouwkundige aanpassing en de kozijnmontage vinden zo efficiënt
              mogelijk na elkaar plaats.
            </p>
          </div>
          <Placeholder label="Voor/na — gevel aanpassing" className="min-h-64" />
        </Container>
      </Section>

      <MtbBouwBand tone="paper" />

      <Section tone="ink">
        <Container className="text-center">
          <h2 className="text-2xl text-paper sm:text-3xl">
            Bouwkundige aanpassing + kozijnen?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            Vraag een offerte aan. Na de inmeetservice brengen we alles in
            kaart: kozijnen, montage én eventuele bouwkundige werkzaamheden —
            in één helder overzicht.
          </p>
          <div className="mt-8">
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
