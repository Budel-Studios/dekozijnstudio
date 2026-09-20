import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import { faqPageSchema, jsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op de meest gestelde vragen over kozijnen, prijzen, montage, subsidie en het proces bij De Kozijnstudio.",
  alternates: { canonical: "/faq" },
};

const faqGroups: Array<{ title: string; items: FaqItem[] }> = [
  {
    title: "Prijzen en offertes",
    items: [
      {
        question: "Zijn jullie prijzen altijd inclusief btw?",
        answer:
          "Ja, altijd. Alle bedragen die wij communiceren zijn consumentenprijzen inclusief 21% btw. Wat u ziet in de offerte, is wat u betaalt.",
      },
      {
        question: "Wat houdt de inmeetservice in?",
        answer:
          "Voor € 49 komen wij langs om de exacte maten op te nemen en uw situatie te beoordelen. Dit bedrag wordt volledig verrekend bij doorgang van de opdracht. Zo weet u precies waar u aan toe bent voordat u een beslissing neemt.",
      },
      {
        question: "Hoe lang na de inmeetservice ontvang ik een offerte?",
        answer:
          "U ontvangt uw gespecificeerde offerte doorgaans binnen vijf werkdagen na de inmeetservice. De offerte bevat alle kostenposten apart — materiaal, montage en eventuele bouwkundige aanpassingen.",
      },
      {
        question: "Kan de offerte nog veranderen nadat ik akkoord heb gegeven?",
        answer:
          "Nee, tenzij u zelf aanpassingen doorgeeft of er tijdens de montage onvoorziene omstandigheden zijn (zoals verborgen constructief werk). Eventueel meerwerk wordt altijd vooraf besproken en schriftelijk vastgelegd — nooit achteraf verrekend zonder uw akkoord.",
      },
    ],
  },
  {
    title: "Producten en materialen",
    items: [
      {
        question: "Welke kozijnmaterialen leveren jullie?",
        answer:
          "Wij leveren kunststof (PVC), houten en aluminium kozijnen op maat. Voor kunststof werken we primair met Schüco- en Gealan-profielen, voor aluminium met Schüco, Aluprof en Reynaers, voor hout met Meranti en andere duurzame houtsoorten.",
      },
      {
        question: "Wat is het verschil tussen HR++ en triple glas?",
        answer:
          "HR++-glas heeft twee glaslagen met een speciale coating en een gasvulling. Het isoleert uitstekend voor de meeste woningen. Triple glas heeft drie lagen en isoleert nóg beter, maar is zwaarder en duurder. Beide typen komen in aanmerking voor ISDE-subsidie. Wij adviseren u welke keuze het beste past bij uw woning en budget.",
      },
      {
        question: "Kunnen jullie kozijnen in elke kleur leveren?",
        answer:
          "Ja. Kunststof en aluminium kozijnen zijn beschikbaar in vrijwel elke RAL-kleur en in populaire structuurlakken zoals antraciet, creme en houtstructuren. Houten kozijnen worden geleverd in de gewenste kleur of transparante lak.",
      },
    ],
  },
  {
    title: "Montage en planning",
    items: [
      {
        question: "Hoe lang duurt de levering?",
        answer:
          "Maatwerk kozijnen worden doorgaans geleverd en gemonteerd binnen ± 8 weken na de definitieve opmeting en opdracht. De exacte levertijd staat altijd vermeld in uw offerte.",
      },
      {
        question: "Hoe lang duurt de montage?",
        answer:
          "Dat hangt af van het aantal kozijnen en de complexiteit. We proberen zoveel mogelijk kozijnen per dag te plaatsen om de overlast te beperken. De meeste projecten zijn binnen één werkweek afgerond.",
      },
      {
        question: "Kunnen jullie ook de muuropening vergroten?",
        answer:
          "Ja. Via MTB Bouw voeren we bouwkundige aanpassingen uit: een opening vergroten, een latei plaatsen of vervangen, metselwerk aanpassen en de binnenafwerking verzorgen. Alles onder één planning.",
      },
      {
        question: "Hoe is de betaling geregeld?",
        answer:
          "Voor maatwerk wordt een kleine aanbetaling gevraagd om de productie te starten. De montagefactuur wordt achteraf verstuurd, na oplevering.",
      },
    ],
  },
  {
    title: "ISDE-subsidie",
    items: [
      {
        question: "Kom ik in aanmerking voor ISDE-subsidie?",
        answer:
          "Als u enkel- of verouderd dubbelglas vervangt door HR++- of triple glas, komt u in principe in aanmerking. De exacte voorwaarden worden jaarlijks bijgesteld door de overheid. Raadpleeg rvo.nl voor de actuele informatie.",
      },
      {
        question: "Vraagt De Kozijnstudio de subsidie voor mij aan?",
        answer:
          "De ISDE-aanvraag doet u zelf via rvo.nl — dit is een persoonlijke aanvraag als eigenaar van de woning. Wij leveren de benodigde productspecificaties (Ug-waarden, glastype) die u nodig heeft voor de aanvraag.",
      },
    ],
  },
  {
    title: "Werkgebied en contact",
    items: [
      {
        question: "Waar is De Kozijnstudio actief?",
        answer:
          "We zijn gestart in Twente en Oost-Nederland en groeien gestaag. Neem contact op om te vragen of uw adres binnen ons werkgebied valt.",
      },
      {
        question: "Hoe neem ik contact op?",
        answer:
          "Via ons contactformulier, telefonisch of per e-mail. U vindt alle gegevens op de contactpagina. We reageren doorgaans binnen één werkdag.",
      },
    ],
  },
];

// Flatten for JSON-LD
const allFaqItems = faqGroups.flatMap((g) =>
  g.items.map((item) => ({
    question: item.question,
    answer: typeof item.answer === "string" ? item.answer : String(item.answer),
  })),
);

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            faqPageSchema(allFaqItems),
          ),
        }}
      />

      <PageHero
        eyebrow="Veelgestelde vragen"
        title="Antwoorden op uw vragen."
        lead="Alles wat u wilt weten over kozijnen, prijzen, montage, subsidie en hoe wij werken — eerlijk en zonder omwegen beantwoord."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Veelgestelde vragen" }]}
        actions={<Button href="/offerte-aanvragen">Offerte aanvragen</Button>}
      />

      <Section>
        <Container width="narrow">
          {faqGroups.map((group) => (
            <div key={group.title} className="mb-12 last:mb-0">
              <Eyebrow>{group.title}</Eyebrow>
              <div className="mt-5">
                <FAQ items={group.items} />
              </div>
            </div>
          ))}

          <div className="mt-10 rounded-card border border-mist bg-paper-soft p-6 text-center">
            <p className="font-medium text-ink">Staat uw vraag er niet bij?</p>
            <p className="mt-2 text-sm text-ink/65">
              Neem contact op — we beantwoorden uw vraag doorgaans binnen één
              werkdag.
            </p>
            <div className="mt-4">
              <Button href="/contact" variant="secondary" size="sm">
                Stel uw vraag
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
