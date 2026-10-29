/**
 * ISDE-subsidie — content for /subsidie, the project overview and the
 * configurator.
 *
 * RULES (CLAUDE.md + docs/seo-strategie-2026-10.md, h8 "Glas en subsidie"):
 *  - No amounts on the site until they are checked against rvo.nl.
 *  - Every statement below was checked on the date in `gecontroleerd`;
 *    re-check every quarter and before 1 January (`volgendeControle`).
 *  - Never promise that a new kozijn automatically qualifies, and never
 *    subtract subsidy from the price we communicate.
 */

export const isdeInfo = {
  /** Date the rules below were checked on rvo.nl. */
  gecontroleerd: "29 oktober 2026",
  volgendeControle: "januari 2027",
  /** Kept for existing references. */
  lastUpdated: "oktober 2026",

  disclaimer:
    "De ISDE-regeling verandert regelmatig. Deze uitleg is gecontroleerd op 29 oktober 2026 en is geen toezegging. Kijk voor de actuele voorwaarden en bedragen altijd op rvo.nl voordat je een aanvraag doet.",

  rvoUrl: "https://www.rvo.nl/subsidies-financiering/isde/woningeigenaren/isolatiemaatregelen",
  rvoLabel: "Actuele voorwaarden op rvo.nl",
  rvoFaqUrl: "https://www.rvo.nl/subsidies-financiering/isde/woningeigenaren/veelgestelde-vragen",
  meldcodeUrl: "https://www.rvo.nl/subsidies-financiering/isde/woningeigenaren/isolatiemaatregelen",

  mechanismDescription:
    "Met de ISDE (Investeringssubsidie duurzame energie en energiebesparing) kun je als woningeigenaar subsidie krijgen voor isolatieglas, en in combinatie met dat glas ook voor isolerende deuren en panelen. Of je in aanmerking komt, hangt af van je woning, het glastype, het oppervlak en wie het werk uitvoert.",

  /** Checked on rvo.nl on 29-10-2026 — no amounts. */
  voorwaarden: [
    "Je woning is gebouwd vóór 1 januari 2019 (of de omgevingsvergunning is aangevraagd vóór 1 juli 2018).",
    "Een bouwbedrijf voert het werk uit. Zelf plaatsen telt volgens RVO niet als subsidiabele uitvoering.",
    "Het gaat om bestaand glasoppervlak. Glas in een nieuwe aanbouw, dakkapel of garage telt niet mee.",
    "Er geldt een minimum oppervlak (voor glas geplaatst vanaf 1 januari 2025: 3 m²) en een maximum (45 m²).",
    "Het glas haalt de isolatie-eis: HR++-glas een U-waarde van maximaal 1,2 W/m²K, triple glas maximaal 0,7 W/m²K. Triple glas vraagt om nieuwe, isolerende kozijnen.",
    "Isolerende deuren en panelen tellen alleen mee in combinatie met HR++-, triple of vacuümglas.",
    "Je vraagt de subsidie aan binnen 24 maanden nadat het werk klaar is.",
  ],

  /** Woonsituaties die RVO apart noemt. */
  uitzondering:
    "Woon je in de provincie Groningen of in Aa en Hunze, Noordenveld of Tynaarlo? Dan geldt voor isolatie een andere regeling. RVO verwijst daarvoor naar SNN.",

  benefits: [
    "Minder warmteverlies door het glas en de aansluitingen",
    "Minder koudeval en tocht bij het raam",
    "Mogelijk een bijdrage via de ISDE, als je aan de voorwaarden voldoet",
  ],
} as const;

/**
 * What the application involves (procedural, no amounts).
 * Checked on rvo.nl on 29-10-2026.
 */
export const isdeAanvraag = {
  /** What we can supply for the application. */
  watWijDoen: [
    "Een factuur met het glastype, het oppervlak in m² en de datum waarop het werk is uitgevoerd.",
    "Een kozijnstaat of glasstaat met de isolatiewaarden en de oppervlakken per kozijn.",
    "De meldcode van het geplaatste glas.",
    "Duidelijk vermelden welke onderdelen niet meetellen, bijvoorbeeld glas in een nieuwe aanbouw.",
  ],
  /** What the homeowner does. */
  watJijDoet: [
    "Controleer vooraf op rvo.nl of je woning en je plannen aan de voorwaarden voldoen.",
    "Maak tijdens het werk een foto waarop je woning en de werkzaamheden samen te zien zijn.",
    "Bewaar de factuur en het betaalbewijs.",
    "Dien de aanvraag in via rvo.nl, binnen 24 maanden nadat het werk klaar is.",
  ],
  benodigdheden: [
    "DigiD",
    "Factuur en betaalbewijs",
    "Foto van de werkzaamheden bij je woning",
    "Meldcode van het glas",
    "Kozijnstaat of glasstaat",
  ],
  termijn:
    "Dien je aanvraag in binnen 24 maanden nadat het werk is afgerond. Controleer de actuele termijn op rvo.nl.",
} as const;

/**
 * Indicative ISDE calculation for the configurator / project overview.
 *
 * `tarievenGecontroleerd: false` → no subsidy amount is calculated or shown.
 * Only switch on after copying the CURRENT amounts from rvo.nl (they differ
 * per glass type and per situation, e.g. glass with or without new kozijnen)
 * and recording the date in `lastUpdated`.
 */
export const isdeBerekening = {
  tarievenGecontroleerd: false,
  lastUpdated: "niet gecontroleerd",
  /** € per m² per glass type — only used when tarievenGecontroleerd is true. */
  ratePerM2: {} as Record<string, number>,
  /** Minimum glass surface for glass placed from 1 January 2025 (rvo.nl, 29-10-2026). */
  minM2: 3,
  maxM2: 45,
  combinatieVoordeel:
    "Of combineren met een andere isolatiemaatregel invloed heeft op het bedrag, lees je in de actuele voorwaarden op rvo.nl.",
} as const;
