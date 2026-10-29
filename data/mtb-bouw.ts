/**
 * MTB Bouw — De Kozijnstudio is a trade name (handelsnaam) of MTB Bouw B.V.
 * MTB Bouw is the construction company for verbouw, renovatie, aan- en
 * uitbouw and the bouwkundig werk around kozijnen.
 *
 * Services are taken from mtbbouw.com (no invented claims). Do not claim here
 * that every kozijn montage is carried out by MTB Bouw: that fact is still
 * `needs_confirmation` in data/feiten.ts (montageDoorMtb).
 */

export const MTB_URL = "https://www.mtbbouw.com";

export type MtbService = {
  title: string;
  description: string;
};

/** Primarily highlighted services (owner's choice). */
export const mtbFeaturedServices: MtbService[] = [
  {
    title: "Verbouw & Renovatie",
    description:
      "Van één ruimte tot een hele woning: MTB Bouw verbouwt, renoveert en verduurzaamt.",
  },
  {
    title: "Aan- & Uitbouw",
    description:
      "Meer ruimte en licht met een aanbouw of uitbouw die aansluit op je bestaande woning.",
  },
];

/** Full range of MTB Bouw, named briefly for context (from mtbbouw.com). */
export const mtbAllServices: string[] = [
  "Verbouw & Renovatie",
  "Aan- & Uitbouw",
  "Nieuwbouw",
  "Bijgebouwen",
  "Kozijnen & Gevels",
  "Totaalprojecten",
];

/** Bouwkundig werk around kozijnen that MTB Bouw carries out. */
export const mtbBouwkundigWerk: string[] = [
  "Een opening vergroten of een nieuwe opening maken",
  "Een latei plaatsen of vervangen",
  "Metselwerk aanpassen en herstellen",
];

/** What the relationship means for the customer — no unconfirmed claims. */
export const mtbVoordelen: string[] = [
  "Eén aanspreekpunt voor je kozijnen én het bouwkundige werk",
  "Eén planning, zonder afstemming tussen losse aannemers",
  "Bouwkundig werk staat als apart onderdeel in je voorstel",
];
