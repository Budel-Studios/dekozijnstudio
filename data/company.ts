/**
 * Bedrijfsgegevens — één bron voor juridische pagina's, footer en contact.
 * De Kozijnstudio B.V. is onderdeel van MTB Bouw.
 * Gegevens met [haken] nog te verifiëren/invullen.
 */
export const company = {
  /** Handelsnaam waaronder de site opereert */
  naam: "De Kozijnstudio",
  /** Juridische entiteit */
  entiteit: "De Kozijnstudio B.V.",
  moeder: "MTB Bouw",
  kvk: "60942037",
  btw: "[btw-identificatienummer — nog invullen]",
  adres: "[Straat en huisnummer — nog invullen]",
  postcodePlaats: "[Postcode en plaats — nog invullen]",
  email: "info@mtbbouw.com",
  telefoon: "053 206 50 71",
  website: "www.dekozijnstudio.nl",
  werkgebied: "Twente & Oost-Nederland",
  instagram: "https://www.instagram.com/mtbbouw",
  sbb: "SBB erkend leerbedrijf — ID 100812726",
} as const;

/** Datum laatste herziening van de juridische documenten / site-informatie. */
export const LEGAL_LAST_UPDATED = "juni 2026";
