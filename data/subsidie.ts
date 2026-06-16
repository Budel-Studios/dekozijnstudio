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
  lastUpdated: "juni 2025",

  disclaimer:
    "De ISDE-regeling wordt jaarlijks bijgesteld. De bedragen en voorwaarden op deze pagina zijn indicatief en gebaseerd op de stand van juni 2025. Raadpleeg altijd de actuele informatie op rvo.nl voordat u een aanvraag doet.",

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
    "Dien de ISDE-aanvraag in via rvo.nl vóór of gelijktijdig met de opdracht.",
    "Na plaatsing ontvangt u de subsidie op uw rekening.",
  ],
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
  lastUpdated: "juni 2025",
  /** Indicatieve subsidie per m² glas (incl. de combinatie-eis), in euro. */
  ratePerM2: {
    "hr-plus": 23, // HR++ — PLACEHOLDER
    triple: 35, // Triple glas — PLACEHOLDER
  } as Record<string, number>,
  /** Indicatieve minimale glasoppervlakte om in aanmerking te komen (m²). */
  minM2: 8,
  /** Wettelijke combinatie-eis (bron RVO). */
  combinatieEis:
    "Glasisolatie komt alleen in aanmerking voor ISDE in combinatie met minimaal één andere isolatiemaatregel (bijv. gevel-, dak- of vloerisolatie).",
} as const;

