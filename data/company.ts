/**
 * Bedrijfsgegevens — één bron voor juridische pagina's, footer en contact.
 * De Kozijnstudio opereert voorlopig als handelsnaam van MTB Bouw B.V.;
 * alle gegevens hieronder zijn de MTB Bouw-gegevens (keuze eigenaar).
 * Gegevens met [haken] nog te verifiëren/invullen.
 */
export const company = {
  /** Handelsnaam waaronder de site opereert */
  naam: "De Kozijnstudio",
  /** Juridische entiteit (voorlopig MTB Bouw B.V. — eigen B.V. volgt mogelijk later) */
  entiteit: "MTB Bouw B.V.",
  moeder: "MTB Bouw",
  kvk: "60942037",
  btw: "[btw-identificatienummer — nog invullen]",
  adres: "Heersenkampweg 5",
  postcode: "7546 PG",
  plaats: "Enschede",
  postcodePlaats: "7546 PG Enschede",
  email: "info@mtbbouw.com",
  telefoon: "053 206 50 71",
  telefoonHref: "+31532065071",
  whatsapp: "+31 6 42 99 70 18",
  whatsappHref: "31642997018",
  openingstijden: "Ma–Vr 08:00–17:00",
  website: "www.kozijnstudio.com",
  werkgebied: "Twente & Oost-Nederland",
  instagram: "https://www.instagram.com/mtbbouw",
  sbb: "SBB erkend leerbedrijf — ID 100812726",
} as const;

/** Datum laatste herziening van de juridische documenten / site-informatie. */
export const LEGAL_LAST_UPDATED = "juli 2026";
