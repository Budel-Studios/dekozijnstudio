/**
 * Bedrijfsgegevens — één bron voor juridische pagina's, footer en contact.
 * De Kozijnstudio is een handelsnaam/onderdeel van MTB Bouw B.V.
 * Gegevens met [haken] nog te verifiëren/invullen (niet op mtbbouw.com gevonden).
 */
export const company = {
  /** Handelsnaam waaronder de site opereert */
  naam: "De Kozijnstudio",
  /** Juridische entiteit */
  entiteit: "MTB Bouw B.V.",
  moeder: "MTB Bouw",
  kvk: "[KvK-nummer MTB Bouw B.V. — nog invullen]",
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
