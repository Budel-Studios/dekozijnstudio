/**
 * MTB Bouw — moederbedrijf van De Kozijnstudio en betrouwbare bouwpartner.
 * Diensten zijn ontleend aan mtbbouw.com (geen verzonnen claims).
 * Uitgelicht (keuze gebruiker): Verbouw & Renovatie, Aan- & Uitbouw.
 */

export const MTB_URL = "https://www.mtbbouw.com";

export type MtbService = {
  title: string;
  description: string;
};

/** Primair uitgelichte diensten. */
export const mtbFeaturedServices: MtbService[] = [
  {
    title: "Verbouw & Renovatie",
    description:
      "Van een enkele ruimte tot een complete woningrenovatie. MTB Bouw verbouwt, renoveert en verduurzaamt — met dezelfde transparantie en kwaliteit.",
  },
  {
    title: "Aan- & Uitbouw",
    description:
      "Meer ruimte en licht met een aanbouw, uitbouw of serre. Constructief doordacht en netjes afgewerkt, naadloos aansluitend op uw bestaande woning.",
  },
];

/** Volledige breedte van MTB Bouw (kort genoemd ter context). */
export const mtbAllServices: string[] = [
  "Verbouw & Renovatie",
  "Aan- & Uitbouw",
  "Nieuwbouw",
  "Bijgebouwen",
  "Kozijnen & Gevels",
  "Totaalprojecten",
];

/** Waarom het partnerschap waardevol is voor de klant. */
export const mtbVoordelen: string[] = [
  "Eén aanspreekpunt voor kozijnen én bouwkundig werk",
  "Eén planning — geen coördinatie tussen losse aannemers",
  "Bouwkundige aanpassingen direct meegenomen in uw offerte",
  "Dezelfde transparante werkwijze als De Kozijnstudio",
];
