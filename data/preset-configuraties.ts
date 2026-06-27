/**
 * Voorgeconfigureerde kozijn-samenstellingen ("presets").
 *
 * Elke preset is een layout-boom (zie components/configurator/preset-preview.tsx)
 * die als schematische tekening op een kaart wordt getoond. De kaart linkt naar
 * de configurator op het dichtstbijzijnde BASISTYPE (de configurator blijft
 * enkelvoudig). "Vanaf"-prijzen worden berekend uit het bestaande prijsmodel —
 * indicatieve richtprijzen incl. btw, geen hardcoded bedragen.
 */

import { computePrice } from "@/lib/configurator-price";
import type { Cell } from "@/components/configurator/preset-preview";

export type ProductCategorie = "ramen" | "deuren" | "schuifpuien";

export type PresetItem = {
  slug: string;
  naam: string;
  layout: Cell;
  /** Dichtstbijzijnde CONFIG_PRODUCTTYPES.value voor prijs + "Stel samen". */
  configType: string;
  baseBreedte: number;
  baseHoogte: number;
  featured?: boolean;
};

export type PresetFamilie = {
  key: string;
  titel: string;
  categorie: ProductCategorie;
  omschrijving: string;
  presets: PresetItem[];
};

export const CATEGORIE_META: Record<
  ProductCategorie,
  { label: string; title: string; description: string }
> = {
  ramen: {
    label: "Ramen",
    title: "Ramen",
    description:
      "Vaste, draaikiep-, openslaande en valramen — los of in samenstellingen met vast glas.",
  },
  deuren: {
    label: "Deuren",
    title: "Deuren",
    description:
      "Voordeuren, achterdeuren en openslaande tuindeuren, met of zonder zij- en bovenlichten.",
  },
  schuifpuien: {
    label: "Schuifpuien",
    title: "Schuifpuien & vouwwanden",
    description:
      "Maximale lichtinval met schuifpuien en vouwwanden in elke maat.",
  },
};

// ─── Layout-bouwers (kort houden) ─────────────────────────────────────────────

const vast: Cell = { kind: "vast" };
const dkL: Cell = { kind: "draaikiep", hinge: "links" };
const dkR: Cell = { kind: "draaikiep", hinge: "rechts" };
const drL: Cell = { kind: "draai", hinge: "links" };
const drR: Cell = { kind: "draai", hinge: "rechts" };
const val: Cell = { kind: "valraam" };
const voordeur: Cell = { kind: "deur", variant: "voordeur" };
const achterdeur: Cell = { kind: "deur", variant: "achterdeur" };
const tuindeur: Cell = { kind: "deur", variant: "tuindeur" };

type Child = Cell | { weight: number; cell: Cell };
const norm = (c: Child): { weight?: number; cell: Cell } =>
  "kind" in c || "split" in c ? { cell: c } : c;
const cols = (...cs: Child[]): Cell => ({ split: "cols", children: cs.map(norm) });
const rows = (...cs: Child[]): Cell => ({ split: "rows", children: cs.map(norm) });
const w = (weight: number, cell: Cell): Child => ({ weight, cell });

// ─── Families ─────────────────────────────────────────────────────────────────

export const PRESET_FAMILIES: PresetFamilie[] = [
  {
    key: "vast-glas",
    titel: "Vast glas",
    categorie: "ramen",
    omschrijving: "Vaste ramen zonder opening — maximaal zicht en lichtinval.",
    presets: [
      { slug: "vast", naam: "Vast", layout: vast, configType: "vast-raam", baseBreedte: 100, baseHoogte: 100, featured: true },
      { slug: "vast-2-vlakken", naam: "Vast – 2 vlakken", layout: cols(vast, vast), configType: "vast-raam", baseBreedte: 180, baseHoogte: 100 },
      { slug: "vast-3-vlakken", naam: "Vast – 3 vlakken", layout: cols(vast, vast, vast), configType: "vast-raam", baseBreedte: 260, baseHoogte: 100 },
      { slug: "vast-4-vlakken", naam: "Vast – 4 vlakken", layout: cols(vast, vast, vast, vast), configType: "vast-raam", baseBreedte: 320, baseHoogte: 100 },
      { slug: "verticaal-vast-2-vlakken", naam: "Verticaal vast – 2 vlakken", layout: rows(vast, vast), configType: "vast-raam", baseBreedte: 100, baseHoogte: 180 },
      { slug: "verticaal-vast-3-vlakken", naam: "Verticaal vast – 3 vlakken", layout: rows(vast, vast, vast), configType: "vast-raam", baseBreedte: 100, baseHoogte: 240 },
    ],
  },
  {
    key: "draaikiepraam",
    titel: "Draaikiepraam",
    categorie: "ramen",
    omschrijving: "Het veelzijdigste raam: draaien voor ventilatie, kiepen voor een kier.",
    presets: [
      { slug: "draaikiep", naam: "Draaikiep", layout: dkR, configType: "draaikiep", baseBreedte: 100, baseHoogte: 120, featured: true },
      { slug: "draaikiep-vast-links", naam: "Draaikiep + vast glas links", layout: cols(w(0.4, vast), w(0.6, dkR)), configType: "draaikiep", baseBreedte: 150, baseHoogte: 120 },
      { slug: "draaikiep-vast-rechts", naam: "Draaikiep + vast glas rechts", layout: cols(w(0.6, dkL), w(0.4, vast)), configType: "draaikiep", baseBreedte: 150, baseHoogte: 120 },
      { slug: "draaikiep-vast-links-rechts", naam: "Draaikiep + vast glas links en rechts", layout: cols(w(0.3, vast), w(0.4, dkR), w(0.3, vast)), configType: "draaikiep", baseBreedte: 200, baseHoogte: 120 },
      { slug: "draaikiep-vast-boven", naam: "Draaikiep + vast glas boven", layout: rows(w(0.3, vast), w(0.7, dkR)), configType: "draaikiep", baseBreedte: 100, baseHoogte: 160 },
      { slug: "draaikiep-vast-onder", naam: "Draaikiep + vast glas onder", layout: rows(w(0.7, dkR), w(0.3, vast)), configType: "draaikiep", baseBreedte: 100, baseHoogte: 160 },
      { slug: "draaikiep-vast-boven-onder", naam: "Draaikiep + vast glas boven en onder", layout: rows(w(0.25, vast), w(0.5, dkR), w(0.25, vast)), configType: "draaikiep", baseBreedte: 100, baseHoogte: 190 },
      { slug: "dubbele-draaikiep", naam: "Dubbele draaikiep", layout: cols(dkL, dkR), configType: "draaikiep", baseBreedte: 180, baseHoogte: 120 },
      { slug: "dubbele-draaikiep-vast-links", naam: "Dubbele draaikiep + vast glas links", layout: cols(w(0.25, vast), dkL, dkR), configType: "draaikiep", baseBreedte: 230, baseHoogte: 120 },
      { slug: "dubbele-draaikiep-vast-rechts", naam: "Dubbele draaikiep + vast glas rechts", layout: cols(dkL, dkR, w(0.25, vast)), configType: "draaikiep", baseBreedte: 230, baseHoogte: 120 },
      { slug: "dubbele-draaikiep-vast-links-rechts", naam: "Dubbele draaikiep + vast glas links en rechts", layout: cols(w(0.22, vast), dkL, dkR, w(0.22, vast)), configType: "draaikiep", baseBreedte: 270, baseHoogte: 120 },
    ],
  },
  {
    key: "openslaande-ramen",
    titel: "Openslaande ramen",
    categorie: "ramen",
    omschrijving: "Draairamen die volledig opendraaien — alleen draaien, zonder kiepstand.",
    presets: [
      { slug: "draairaam-links", naam: "Draairaam links", layout: drL, configType: "draaikiep", baseBreedte: 70, baseHoogte: 120 },
      { slug: "draairaam-rechts", naam: "Draairaam rechts", layout: drR, configType: "draaikiep", baseBreedte: 70, baseHoogte: 120 },
      { slug: "dubbel-draairaam", naam: "Dubbel draairaam", layout: cols(drL, drR), configType: "draaikiep", baseBreedte: 140, baseHoogte: 120 },
      { slug: "draairaam-vast-links", naam: "Draairaam + vast glas links", layout: cols(w(0.4, vast), w(0.6, drR)), configType: "draaikiep", baseBreedte: 130, baseHoogte: 120 },
      { slug: "draairaam-vast-rechts", naam: "Draairaam + vast glas rechts", layout: cols(w(0.6, drL), w(0.4, vast)), configType: "draaikiep", baseBreedte: 130, baseHoogte: 120 },
      { slug: "draairaam-vast-links-rechts", naam: "Draairaam + vast glas links en rechts", layout: cols(w(0.3, vast), w(0.4, drR), w(0.3, vast)), configType: "draaikiep", baseBreedte: 170, baseHoogte: 120 },
    ],
  },
  {
    key: "valramen",
    titel: "Valramen",
    categorie: "ramen",
    omschrijving: "Kantelt aan de onderzijde naar binnen — ideaal voor ventilatie op hoogte.",
    presets: [
      { slug: "valraam", naam: "Valraam", layout: val, configType: "valraam", baseBreedte: 80, baseHoogte: 60 },
      { slug: "valraam-vast-onder", naam: "Valraam + vast glas onder", layout: rows(w(0.6, val), w(0.4, vast)), configType: "valraam", baseBreedte: 80, baseHoogte: 100 },
      { slug: "valraam-vast-boven", naam: "Valraam + vast glas boven", layout: rows(w(0.4, vast), w(0.6, val)), configType: "valraam", baseBreedte: 80, baseHoogte: 100 },
    ],
  },
  {
    key: "tuindeuren",
    titel: "Tuindeuren",
    categorie: "deuren",
    omschrijving: "Dubbele openslaande deuren — een ruime, lichte verbinding met de tuin.",
    presets: [
      { slug: "dubbele-tuindeur", naam: "Dubbele tuindeur", layout: tuindeur, configType: "tuindeur", baseBreedte: 160, baseHoogte: 215, featured: true },
      { slug: "dubbele-tuindeur-vast-links", naam: "Dubbele tuindeur + vast licht links", layout: cols(w(0.3, vast), w(0.7, tuindeur)), configType: "tuindeur", baseBreedte: 220, baseHoogte: 215 },
      { slug: "dubbele-tuindeur-vast-rechts", naam: "Dubbele tuindeur + vast licht rechts", layout: cols(w(0.7, tuindeur), w(0.3, vast)), configType: "tuindeur", baseBreedte: 220, baseHoogte: 215 },
      { slug: "dubbele-tuindeur-vast-links-rechts", naam: "Dubbele tuindeur + vaste lichten links en rechts", layout: cols(w(0.25, vast), w(0.5, tuindeur), w(0.25, vast)), configType: "tuindeur", baseBreedte: 260, baseHoogte: 215 },
      { slug: "dubbele-tuindeur-bovenlicht", naam: "Dubbele tuindeur + bovenlicht", layout: rows(w(0.2, vast), w(0.8, tuindeur)), configType: "tuindeur", baseBreedte: 160, baseHoogte: 250 },
      { slug: "dubbele-tuindeur-bovenlicht-vast-links", naam: "Dubbele tuindeur + bovenlicht + vast licht links", layout: rows(w(0.2, vast), w(0.8, cols(w(0.3, vast), w(0.7, tuindeur)))), configType: "tuindeur", baseBreedte: 220, baseHoogte: 250 },
      { slug: "dubbele-tuindeur-bovenlicht-vast-rechts", naam: "Dubbele tuindeur + bovenlicht + vast licht rechts", layout: rows(w(0.2, vast), w(0.8, cols(w(0.7, tuindeur), w(0.3, vast)))), configType: "tuindeur", baseBreedte: 220, baseHoogte: 250 },
      { slug: "dubbele-tuindeur-bovenlicht-vast-links-rechts", naam: "Dubbele tuindeur + bovenlicht + vaste lichten links en rechts", layout: rows(w(0.2, vast), w(0.8, cols(w(0.25, vast), w(0.5, tuindeur), w(0.25, vast)))), configType: "tuindeur", baseBreedte: 260, baseHoogte: 250 },
    ],
  },
  {
    key: "voordeuren",
    titel: "Voordeuren",
    categorie: "deuren",
    omschrijving: "Een representatieve, goed isolerende voordeur — met of zonder zij- en bovenlicht.",
    presets: [
      { slug: "voordeur", naam: "Voordeur", layout: voordeur, configType: "voordeur", baseBreedte: 100, baseHoogte: 215, featured: true },
      { slug: "voordeur-zijlicht-links", naam: "Voordeur + zijlicht links", layout: cols(w(0.3, vast), w(0.7, voordeur)), configType: "voordeur", baseBreedte: 150, baseHoogte: 215 },
      { slug: "voordeur-zijlicht-rechts", naam: "Voordeur + zijlicht rechts", layout: cols(w(0.7, voordeur), w(0.3, vast)), configType: "voordeur", baseBreedte: 150, baseHoogte: 215 },
      { slug: "voordeur-zijlichten-links-rechts", naam: "Voordeur + zijlichten links en rechts", layout: cols(w(0.28, vast), w(0.44, voordeur), w(0.28, vast)), configType: "voordeur", baseBreedte: 190, baseHoogte: 215 },
      { slug: "voordeur-bovenlicht", naam: "Voordeur + bovenlicht", layout: rows(w(0.18, vast), w(0.82, voordeur)), configType: "voordeur", baseBreedte: 100, baseHoogte: 250 },
      { slug: "voordeur-bovenlicht-zijlicht-links", naam: "Voordeur + bovenlicht + zijlicht links", layout: rows(w(0.18, vast), w(0.82, cols(w(0.3, vast), w(0.7, voordeur)))), configType: "voordeur", baseBreedte: 150, baseHoogte: 250 },
      { slug: "voordeur-bovenlicht-zijlicht-rechts", naam: "Voordeur + bovenlicht + zijlicht rechts", layout: rows(w(0.18, vast), w(0.82, cols(w(0.7, voordeur), w(0.3, vast)))), configType: "voordeur", baseBreedte: 150, baseHoogte: 250 },
      { slug: "voordeur-bovenlicht-zijlichten-links-rechts", naam: "Voordeur + bovenlicht + zijlichten links en rechts", layout: rows(w(0.18, vast), w(0.82, cols(w(0.28, vast), w(0.44, voordeur), w(0.28, vast)))), configType: "voordeur", baseBreedte: 190, baseHoogte: 250 },
    ],
  },
  {
    key: "achterdeur",
    titel: "Achterdeur / Buitendeur",
    categorie: "deuren",
    omschrijving: "Praktische achter- of buitendeur met veel glas voor extra licht.",
    presets: [
      { slug: "achterdeur", naam: "Achterdeur", layout: achterdeur, configType: "achterdeur", baseBreedte: 90, baseHoogte: 215 },
      { slug: "achterdeur-zijlicht-links", naam: "Achterdeur + zijlicht links", layout: cols(w(0.3, vast), w(0.7, achterdeur)), configType: "achterdeur", baseBreedte: 140, baseHoogte: 215 },
      { slug: "achterdeur-zijlicht-rechts", naam: "Achterdeur + zijlicht rechts", layout: cols(w(0.7, achterdeur), w(0.3, vast)), configType: "achterdeur", baseBreedte: 140, baseHoogte: 215 },
      { slug: "achterdeur-zijlichten-links-rechts", naam: "Achterdeur + zijlichten links en rechts", layout: cols(w(0.28, vast), w(0.44, achterdeur), w(0.28, vast)), configType: "achterdeur", baseBreedte: 180, baseHoogte: 215 },
      { slug: "achterdeur-bovenlicht", naam: "Achterdeur + bovenlicht", layout: rows(w(0.18, vast), w(0.82, achterdeur)), configType: "achterdeur", baseBreedte: 90, baseHoogte: 250 },
    ],
  },
  {
    key: "schuifpuien",
    titel: "Schuifpuien & vouwwanden",
    categorie: "schuifpuien",
    omschrijving: "Maximale lichtinval met schuifpuien en vouwwanden in elke maat.",
    presets: [
      { slug: "schuifpui", naam: "Schuifpui (2-delig)", layout: cols(vast, vast), configType: "schuifpui", baseBreedte: 300, baseHoogte: 220, featured: true },
      { slug: "schuifpui-3", naam: "Schuifpui (3-delig)", layout: cols(vast, vast, vast), configType: "schuifpui", baseBreedte: 360, baseHoogte: 220 },
      { slug: "vouwwand", naam: "Vouwwand", layout: cols(vast, vast, vast, vast), configType: "vouwwand", baseBreedte: 360, baseHoogte: 220 },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function familiesByCategory(categorie: ProductCategorie): PresetFamilie[] {
  return PRESET_FAMILIES.filter((f) => f.categorie === categorie);
}

export function featuredPresets(): PresetItem[] {
  return PRESET_FAMILIES.flatMap((f) => f.presets).filter((p) => p.featured);
}

/**
 * Indicatieve 'vanaf'-prijs op de standaardmaat (kunststof · HR++ · wit · zonder
 * montage) via het bestaande prijsmodel. Richtprijs incl. btw — PLACEHOLDER.
 */
export function presetVanafPrice(p: PresetItem): number {
  return computePrice({
    materiaal: "kunststof",
    producttype: p.configType,
    breedteCm: p.baseBreedte,
    hoogteCm: p.baseHoogte,
    aantal: 1,
    glas: "hr-plus",
    kleur: "wit",
    opties: [],
    uitvoering: "levering",
  }).totaal;
}
