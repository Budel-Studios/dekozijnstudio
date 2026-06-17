/**
 * Montage-prijslijst: laden, automatisch berekenen en selecteren.
 * De prijslijst (data/montage-prijslijst.json) is door de eigenaar zelf te
 * onderhouden. Prijzen zijn excl. btw; deze module rekent btw erbij voor
 * de klantweergave (incl. btw).
 *
 * Model: de klant vinkt regels aan/uit. De hoeveelheid (stuk/m²/m¹) wordt
 * automatisch afgeleid uit de configuratie — de klant vult niets in.
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
  /** Standaard aangevinkt? false = situationeel (klant vinkt zelf aan). */
  defaultOn: boolean;
  eenmalig?: boolean;
  toelichting?: string;
};

export const MONTAGE = {
  btwPercentage: prijslijst.btwPercentage as number,
  laatstBijgewerkt: prijslijst.laatstBijgewerkt as string,
  regels: prijslijst.regels as MontageRegel[],
};

const BTW = 1 + MONTAGE.btwPercentage / 100;

/** Informatieve melding over hoogwerker-huur (geen vaste prijslijst-post). */
export const HOOGWERKER_NOTE =
  "Per project bekijken we of een hoogwerker nodig is. Een hoogwerker kost doorgaans € 150–250 per 2 uur. We richten de werkzaamheden zo in dat een hoogwerker zo min mogelijk nodig is — en de kosten dus zo laag mogelijk blijven.";

export const EENHEID_LABEL: Record<Eenheid, string> = {
  stuk: "stuk",
  m2: "m²",
  m1: "m¹",
};

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

const DEUR_TYPES = ["voordeur", "achterdeur", "tuindeur"];

// ─── Automatische hoeveelheden ────────────────────────────────────────────────

/**
 * Berekent automatisch de hoeveelheid voor een regel op basis van de config.
 * 0 betekent: niet van toepassing voor deze configuratie.
 */
export function autoQuantity(regel: MontageRegel, config: KozijnConfig | null): number {
  if (!config || config.uitvoering === "levering") return 0;

  const b = config.breedteCm || 0;
  const h = config.hoogteCm || 0;
  const area = round2((b / 100) * (h / 100));
  const perimeter = round2((2 * (b + h)) / 100); // m¹ per kozijn
  const n = Math.max(1, config.aantal || 1);
  const isDoor = config.producttype ? DEUR_TYPES.includes(config.producttype) : false;

  switch (regel.id) {
    case "inmeetservice":
    case "afvoer-materialen":
    case "verwijderen-bestaand":
      return 1;
    case "verwijderen-extra":
      return Math.max(0, n - 1);
    case "plaatsen-kozijn-m2":
      return isDoor ? 0 : area;
    case "plaatsen-extra-kozijn-m2":
      return isDoor ? 0 : round2(area * (n - 1));
    case "plaatsen-buitendeur":
      return isDoor ? n : 0;
    case "binnenafwerking-m1":
    case "buitenafwerking-m1":
      return round2(perimeter * n);
    default:
      // Generieke fallback per eenheid
      if (regel.eenheid === "m2") return round2(area * n);
      if (regel.eenheid === "m1") return round2(perimeter * n);
      return n; // stuk
  }
}

/** Regels die van toepassing zijn (auto-hoeveelheid > 0) voor deze config. */
export function applicableRegels(config: KozijnConfig | null): MontageRegel[] {
  return MONTAGE.regels.filter((r) => autoQuantity(r, config) > 0);
}

/** Standaard aangevinkte regel-ids: van toepassing én defaultOn. */
export function defaultCheckedIds(config: KozijnConfig | null): string[] {
  return applicableRegels(config)
    .filter((r) => r.defaultOn)
    .map((r) => r.id);
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

/** Berekent de montage op basis van de aangevinkte regels (qty = automatisch). */
export function computeMontage(
  config: KozijnConfig | null,
  checkedIds: string[],
): MontageResult {
  const checked = new Set(checkedIds);
  const lines: MontageLine[] = [];
  let subtotaalExBtw = 0;
  let totaalUren = 0;

  for (const regel of MONTAGE.regels) {
    if (!checked.has(regel.id)) continue;
    const aantal = autoQuantity(regel, config);
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
