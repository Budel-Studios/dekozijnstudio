/**
 * Montage scope — what installing kozijnen involves, per part of the work
 * (docs/seo-strategie-2026-10.md, h8 "Montage en werkwijze").
 *
 * `uitleg` is general, factual explanation and is always shown.
 * `status` says whether a part is included, optional or depends on the
 * situation. It is only shown once feit "montagescope" is verified in
 * data/feiten.ts — the proposed statuses below are derived from
 * data/montage-prijslijst.json (defaultOn = standard) and must be confirmed.
 */

export type ScopeStatus = "inbegrepen" | "optie" | "afhankelijk";

export const SCOPE_STATUS_LABEL: Record<ScopeStatus, string> = {
  inbegrepen: "Hoort bij de montage",
  optie: "Optie",
  afhankelijk: "Afhankelijk van je situatie",
};

export type ScopeOnderdeel = {
  id: string;
  onderdeel: string;
  uitleg: string;
  status: ScopeStatus;
};

export const MONTAGE_SCOPE: ScopeOnderdeel[] = [
  {
    id: "inmeten",
    onderdeel: "Inmeten",
    uitleg: "De exacte maten en de staat van de bestaande opening worden opgenomen. Pas daarna kan er besteld worden.",
    status: "inbegrepen",
  },
  {
    id: "beschermen",
    onderdeel: "Beschermen",
    uitleg: "Vloeren, vensterbanken en meubels rond het werk worden afgedekt tegen stof en schade.",
    status: "inbegrepen",
  },
  {
    id: "demontage",
    onderdeel: "Oude kozijnen verwijderen",
    uitleg: "Het bestaande kozijn wordt eruit gehaald, zo veel mogelijk zonder het metselwerk eromheen te beschadigen.",
    status: "inbegrepen",
  },
  {
    id: "afvoer",
    onderdeel: "Afvoer",
    uitleg: "Oude kozijnen, glas en bouwafval worden afgevoerd.",
    status: "inbegrepen",
  },
  {
    id: "stellen",
    onderdeel: "Stellen en bevestigen",
    uitleg: "Het nieuwe kozijn wordt waterpas en haaks gesteld en stevig verankerd, zodat ramen en deuren goed sluiten.",
    status: "inbegrepen",
  },
  {
    id: "aansluitingen",
    onderdeel: "Aansluitingen",
    uitleg: "De naad tussen kozijn en muur wordt geïsoleerd en luchtdicht en waterdicht afgewerkt. Hier zit vaak het verschil tussen een comfortabel en een tochtig kozijn.",
    status: "inbegrepen",
  },
  {
    id: "glas",
    onderdeel: "Beglazing",
    uitleg: "Het glas wordt geplaatst en afgekit of met glaslatten vastgezet, afhankelijk van het systeem.",
    status: "inbegrepen",
  },
  {
    id: "aftimmering",
    onderdeel: "Aftimmering binnen en buiten",
    uitleg: "Aan de binnen- en buitenkant worden de randen rond het kozijn netjes afgewerkt.",
    status: "inbegrepen",
  },
  {
    id: "vensterbanken",
    onderdeel: "Vensterbanken",
    uitleg: "De bestaande vensterbank blijft vaak liggen. Past die niet meer, dan komt er een nieuwe.",
    status: "afhankelijk",
  },
  {
    id: "stuc-schilder",
    onderdeel: "Stuc- en schilderwerk",
    uitleg: "Bij het verwijderen kan het stucwerk rond het kozijn beschadigen. Of herstel nodig is, zie je pas bij het inmeten of de demontage.",
    status: "afhankelijk",
  },
  {
    id: "constructief",
    onderdeel: "Opening vergroten of latei",
    uitleg: "Een grotere of nieuwe opening vraagt bouwkundig werk, zoals een nieuwe latei en aangepast metselwerk. Dat werk doet MTB Bouw.",
    status: "optie",
  },
  {
    id: "boven-bg",
    onderdeel: "Werken op hoogte",
    uitleg: "Voor kozijnen boven de begane grond kan een steiger of hoogwerker nodig zijn.",
    status: "afhankelijk",
  },
  {
    id: "schoonmaak",
    onderdeel: "Schoonmaak en oplevering",
    uitleg: "Na het werk wordt de werkplek schoon achtergelaten en loop je samen de kozijnen na: sluiten, draaien en kiepen, afwerking.",
    status: "inbegrepen",
  },
];
