/**
 * Montage-prijslijst: laden, voorinvullen en berekenen.
 * De prijslijst (data/montage-prijslijst.json) is door de eigenaar zelf te
 * onderhouden. Prijzen zijn excl. btw; deze module rekent btw erbij voor
 * de klantweergave (incl. btw).
 */

import prijslijst from "@/data/montage-prijslijst.json";
import type { KozijnConfig } from "@/lib/configurator-price";

export type Eenheid = "stuk" | "m2" | "m1";

export type MontageRegel = {
  id: string;
  label: string;
  eenheid: Eenheid;
  /** Prijs per eenheid, EXCL. btw */
  prijs: number;
  uren: number;
  categorie: string;
  optioneel: boolean;
  eenmalig?: boolean;
  toelichting?: string;
};

export const MONTAGE = {
  btwPercentage: prijslijst.btwPercentage as number,
  laatstBijgewerkt: prijslijst.laatstBijgewerkt as string,
  regels: prijslijst.regels as MontageRegel[],
};

const BTW = 1 + MONTAGE.btwPercentage / 100;

export function regelById(id: string): MontageRegel | undefined {
  return MONTAGE.regels.find((r) => r.id === id);
}

export const EENHEID_LABEL: Record<Eenheid, string> = {
  stuk: "stuk",
  m2: "m²",
  m1: "m¹",
};

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ─── Voorinvullen op basis van de configuratie ───────────────────────────────

const DEUR_TYPES = ["voordeur", "achterdeur", "tuindeur"];

/** Slimme standaard-aantallen afgeleid uit de configuratie. Klant past aan. */
export function montagePrefill(config: KozijnConfig | null): Record<string, number> {
  const q: Record<string, number> = {};
  for (const r of MONTAGE.regels) q[r.id] = 0;

  // Geen montage bij 'alleen levering' (DIY) of als er nog geen config is.
  if (!config || config.uitvoering === "levering") return q;

  // Inmeetservice + afvoer horen bij een montageproject
  q["inmeetservice"] = 1;
  q["afvoer-materialen"] = 1;

  const area = round2((config.breedteCm / 100) * (config.hoogteCm / 100)) || 0;
  const n = Math.max(1, config.aantal || 1);
  const isDoor = config.producttype ? DEUR_TYPES.includes(config.producttype) : false;

  // Aanname: vervanging van bestaande kozijnen (klant kan op 0 zetten bij nieuwbouw)
  q["verwijderen-bestaand"] = 1;
  q["verwijderen-extra"] = Math.max(0, n - 1);

  if (isDoor) {
    q["plaatsen-buitendeur"] = n;
  } else {
    q["plaatsen-kozijn-m2"] = area;
    q["plaatsen-extra-kozijn-m2"] = round2(area * (n - 1));
  }

  return q;
}

// ─── Berekening ──────────────────────────────────────────────────────────────

export type MontageLine = {
  regel: MontageRegel;
  aantal: number;
  lineExBtw: number;
  lineInclBtw: number;
};

export type MontageResult = {
  lines: MontageLine[];
  subtotaalExBtw: number;
  subtotaalInclBtw: number;
  totaalUren: number;
};

/** Normaliseert ingevoerde aantallen (eenmalig → max 1, geen negatieven). */
export function normaliseerAantallen(
  raw: Record<string, number>,
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const r of MONTAGE.regels) {
    let v = Number(raw[r.id]) || 0;
    if (v < 0) v = 0;
    if (r.eenmalig && v > 1) v = 1;
    if (r.eenheid === "stuk") v = Math.round(v);
    else v = round2(v);
    out[r.id] = v;
  }
  return out;
}

export function computeMontage(rawAantallen: Record<string, number>): MontageResult {
  const aantallen = normaliseerAantallen(rawAantallen);
  const lines: MontageLine[] = [];
  let subtotaalExBtw = 0;
  let totaalUren = 0;

  for (const regel of MONTAGE.regels) {
    const aantal = aantallen[regel.id] ?? 0;
    if (aantal <= 0) continue;
    const lineExBtw = round2(regel.prijs * aantal);
    subtotaalExBtw += lineExBtw;
    totaalUren += regel.uren * aantal;
    lines.push({
      regel,
      aantal,
      lineExBtw,
      lineInclBtw: round2(lineExBtw * BTW),
    });
  }

  subtotaalExBtw = round2(subtotaalExBtw);
  return {
    lines,
    subtotaalExBtw,
    subtotaalInclBtw: round2(subtotaalExBtw * BTW),
    totaalUren: round2(totaalUren),
  };
}
