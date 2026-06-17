/**
 * ISDE-subsidie gegevens.
 *
 * REGELS (CLAUDE.md):
 *  - Geen vaste bedragen hardcoden — regels wijzigen jaarlijks.
 *  - Altijd voorzien van `lastUpdated` datum + disclaimer + RVO-link.
 *  - Toon bedragen NOOIT als feit, altijd als indicatie met verwijzing naar RVO.
 */

export const isdeInfo = {
  /** Datum waarop deze informatie is gecontroleerd — update bij elke review. */
  lastUpdated: "juni 2026",

  disclaimer:
    "De ISDE-regeling wordt jaarlijks bijgesteld. De bedragen en voorwaarden op deze pagina zijn indicatief en gebaseerd op de stand van juni 2026. Raadpleeg altijd de actuele informatie op rvo.nl voordat u een aanvraag doet.",

  rvoUrl: "https://www.rvo.nl/subsidies-financiering/isde",
  rvoLabel: "Actuele ISDE-informatie op rvo.nl",

  /** Welke producten komen in aanmerking (globaal — raadpleeg RVO voor exacte eisen). */
  eligibleProducts: [
    "HR++-glas (dubbele beglazing met coating)",
    "Triple glas (driedubbele beglazing)",
  ],

  /** Globale omschrijving van het mechaniek — GEEN vaste bedragen. */
  mechanismDescription:
    "Via de ISDE (Investeringssubsidie Duurzame Energie en Energiebesparing) kunt u een bijdrage ontvangen voor de vervanging van enkel- of dubbelglas door HR++- of triple glas. De hoogte van de subsidie is afhankelijk van het glasoppervlak, het type beglazing en uw woonsituatie. Raadpleeg rvo.nl voor de actuele tarieven.",

  /** Voordelen — feiten zonder specifieke bedragen. */
  benefits: [
    "Lagere energierekening door betere isolatiewaarden",
    "Vermindering van CO₂-uitstoot",
    "Financiële tegemoetkoming via ISDE",
    "Comfortverbetering: minder koude straling en tocht",
  ],

  /** Stappen voor een aanvraag — procedureel, geen geldbedragen. */
  applicationSteps: [
    "Controleer of uw situatie voldoet aan de ISDE-voorwaarden via rvo.nl.",
    "Vraag een offerte aan bij De Kozijnstudio (inclusief specificatie van het glastype).",
    "Laat de kozijnen plaatsen — wij leveren de juiste maatregelcode en factuur.",
    "Dien de ISDE-aanvraag in via mijn.rvo.nl met onze specificaties en uw foto's.",
    "Na goedkeuring ontvangt u de subsidie op uw rekening.",
  ],
} as const;

/**
 * Gedetailleerd aanvraagproces: wie doet wat + benodigdheden.
 * Procedureel, geen bedragen. Exacte codes/termijnen kunnen wijzigen — verwijs
 * altijd naar rvo.nl.
 */
export const isdeAanvraag = {
  /** Wat De Kozijnstudio voor de klant verzorgt. */
  watWijDoen: [
    "Glasspecificatie aanleveren: glastype, Ug-waarde en het aantal m² per kozijn.",
    "De juiste maatregelcode voor glasisolatie bij uw offerte en factuur vermelden.",
    "Een factuur opstellen waarop de maatregel, het glasoppervlak (m²) en de uitvoeringsdatum duidelijk staan.",
    "Desgewenst foto's maken van de situatie tijdens de werkzaamheden.",
  ],
  /** Wat de klant zelf doet. */
  watUDoet: [
    "Regel DigiD als u die nog niet heeft (nodig om in te loggen op mijn.rvo.nl).",
    "Maak foto's van de gevel — zowel vóór als ná de werkzaamheden.",
    "Dien de aanvraag in op mijn.rvo.nl met onze specificaties, de maatregelcode en uw factuur.",
    "Geef uw rekeningnummer (IBAN) door; na goedkeuring ontvangt u de subsidie.",
  ],
  /** Checklist van benodigdheden. */
  benodigdheden: [
    "DigiD",
    "Maatregelcode glasisolatie (leveren wij aan)",
    "Gevelfoto's vóór én ná de plaatsing",
    "Factuur met glastype, m² en uitvoeringsdatum",
    "Uw rekeningnummer (IBAN)",
  ],
  termijn:
    "Dien uw aanvraag in binnen de door RVO gestelde termijn na uitvoering. Controleer de actuele termijn en maatregelcodes altijd op rvo.nl.",
} as const;

/**
 * Indicatieve ISDE-rekenwaarden voor de configurator/checkout.
 *
 * ⚠️ PLACEHOLDER — vervang door de ACTUELE tarieven van rvo.nl.
 * Bedragen worden jaarlijks bijgesteld. Toon altijd als indicatie, gedateerd,
 * met disclaimer en RVO-link. Glasisolatie komt alléén in aanmerking in
 * combinatie met minimaal één andere isolatiemaatregel — verwijs hiervoor naar
 * onze vaste bouwpartner MTB Bouw.
 */
export const isdeBerekening = {
  lastUpdated: "juni 2026",
  /** Indicatieve subsidie per m² glas (basisbedrag), in euro. */
  ratePerM2: {
    "hr-plus": 23, // HR++ — PLACEHOLDER
    triple: 35, // Triple glas — PLACEHOLDER
  } as Record<string, number>,
  /** Indicatieve minimale glasoppervlakte om in aanmerking te komen (m², 2026). */
  minM2: 3,
  /**
   * Combineren is NIET verplicht: glasisolatie komt zelfstandig in aanmerking.
   * Combineren met minstens één andere maatregel kan het subsidiebedrag echter
   * verhogen (tot ongeveer een verdubbeling) — extra besparing dus.
   */
  combinatieVoordeel:
    "Glasisolatie komt zelfstandig in aanmerking voor ISDE. Combineert u het met minimaal één andere isolatiemaatregel (bijv. gevel-, dak- of vloerisolatie), dan kan het subsidiebedrag oplopen tot ongeveer een verdubbeling — een mooie extra besparing.",
} as const;

