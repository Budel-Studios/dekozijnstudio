/**
 * Checked price examples for /kosten (docs/seo-strategie-2026-10.md, h8 "Kosten").
 *
 * Only add an example that comes from a real, checked calculation (anonymised).
 * Amounts incl. btw as calculated by the administration — do not work out the
 * btw split yourself. Planned scenarios: one window frame, a façade or floor,
 * and a sliding door. While this list is empty the section is not shown.
 */

export type PrijsRegel = { omschrijving: string; bedragInclBtw: number };

export type Prijsvoorbeeld = {
  id: string;
  titel: string;
  /** Type element, number, outside dimensions. */
  basis: string;
  /** Material, profile, colour, fixed or opening. */
  uitvoering: string;
  glas: string;
  levering: string;
  demontage: string;
  montage: string;
  /** Which inside/outside finishing is and isn't included. */
  afwerking: string;
  regels: PrijsRegel[];
  totaalInclBtw: number;
  /** Price reference date, validity, assumptions and exclusions. */
  voorwaarden: string;
  status: "indicatie" | "productspecificatie";
  peildatum: string;
  gecontroleerdDoor: string;
};

export const PRIJSVOORBEELDEN: Prijsvoorbeeld[] = [];
