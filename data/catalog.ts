/**
 * Productcatalogus — webshop-achtige instap die doorlinkt naar de configurator.
 * Elk product mapt op een configurator-producttype (configType). Klanten kiezen
 * het materiaal in de configurator (categorie-indeling op type, keuze gebruiker).
 *
 * "Vanaf"-prijzen worden BEREKEND uit het configurator-prijsmodel (data-driven,
 * geen hardcoded prijzen). Het zijn indicatieve richtprijzen — PLACEHOLDER tot
 * de echte tarieven in data/configurator.ts staan.
 */

import { computePrice, type KozijnConfig } from "@/lib/configurator-price";

export type ProductCategorie = "ramen" | "deuren" | "schuifpuien";

export type CatalogProduct = {
  slug: string;
  name: string;
  categorie: ProductCategorie;
  /** Verwijst naar CONFIG_PRODUCTTYPES.value */
  configType: string;
  description: string;
  /** Standaardmaat waarop de 'vanaf'-prijs wordt berekend */
  baseBreedte: number;
  baseHoogte: number;
  /** Uitgelicht op de homepage */
  featured?: boolean;
};

export const CATEGORIE_META: Record<
  ProductCategorie,
  { label: string; title: string; description: string }
> = {
  ramen: {
    label: "Ramen",
    title: "Ramen",
    description:
      "Draaikiep-, vaste en valramen op maat — in kunststof, hout of aluminium.",
  },
  deuren: {
    label: "Deuren",
    title: "Deuren",
    description:
      "Voordeuren, achterdeuren en openslaande tuindeuren, volledig naar wens.",
  },
  schuifpuien: {
    label: "Schuifpuien",
    title: "Schuifpuien & vouwwanden",
    description:
      "Maximale lichtinval met schuifpuien en vouwwanden in elke maat.",
  },
};

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  // ── Ramen ──
  {
    slug: "draaikiepraam",
    name: "Draaikiepraam",
    categorie: "ramen",
    configType: "draaikiep",
    description: "Het veelzijdigste raam: draaien voor ventilatie, kiepen voor een kier.",
    baseBreedte: 100,
    baseHoogte: 120,
    featured: true,
  },
  {
    slug: "vast-raam",
    name: "Vast raam",
    categorie: "ramen",
    configType: "vast-raam",
    description: "Maximaal zicht en lichtinval — een vast raam zonder opening.",
    baseBreedte: 100,
    baseHoogte: 100,
    featured: true,
  },
  {
    slug: "valraam",
    name: "Valraam",
    categorie: "ramen",
    configType: "valraam",
    description: "Kantelt aan de onderzijde naar binnen — ideaal voor ventilatie op hoogte.",
    baseBreedte: 80,
    baseHoogte: 60,
  },

  // ── Deuren ──
  {
    slug: "voordeur",
    name: "Voordeur",
    categorie: "deuren",
    configType: "voordeur",
    description: "Een representatieve, goed isolerende voordeur in uw stijl.",
    baseBreedte: 100,
    baseHoogte: 215,
    featured: true,
  },
  {
    slug: "achterdeur",
    name: "Achterdeur",
    categorie: "deuren",
    configType: "achterdeur",
    description: "Praktische achterdeur met veel glas voor extra licht.",
    baseBreedte: 90,
    baseHoogte: 215,
  },
  {
    slug: "tuindeuren",
    name: "Tuindeuren",
    categorie: "deuren",
    configType: "tuindeur",
    description: "Dubbele openslaande deuren — een ruime, lichte verbinding met de tuin.",
    baseBreedte: 160,
    baseHoogte: 215,
  },

  // ── Schuifpuien ──
  {
    slug: "schuifpui",
    name: "Schuifpui",
    categorie: "schuifpuien",
    configType: "schuifpui",
    description: "Grote glasvlakken die moeiteloos schuiven — licht en ruimtegevoel.",
    baseBreedte: 300,
    baseHoogte: 220,
    featured: true,
  },
  {
    slug: "vouwwand",
    name: "Vouwwand",
    categorie: "schuifpuien",
    configType: "vouwwand",
    description: "Vouw de hele gevel open en verbind binnen en buiten volledig.",
    baseBreedte: 360,
    baseHoogte: 220,
  },
];

// ─── Afgeleide helpers ────────────────────────────────────────────────────────

export function productsByCategory(categorie: ProductCategorie): CatalogProduct[] {
  return CATALOG_PRODUCTS.filter((p) => p.categorie === categorie);
}

export function featuredProducts(): CatalogProduct[] {
  return CATALOG_PRODUCTS.filter((p) => p.featured);
}

export function getProduct(slug: string): CatalogProduct | undefined {
  return CATALOG_PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Indicatieve 'vanaf'-prijs: goedkoopste zinvolle samenstelling
 * (kunststof · HR++ · wit · zonder montage) op de standaardmaat van het product.
 * Richtprijs incl. btw — PLACEHOLDER.
 */
export function vanafPrice(product: CatalogProduct): number {
  const config: KozijnConfig = {
    materiaal: "kunststof",
    producttype: product.configType,
    breedteCm: product.baseBreedte,
    hoogteCm: product.baseHoogte,
    aantal: 1,
    glas: "hr-plus",
    kleur: "wit",
    opties: [],
    uitvoering: "levering",
  };
  return computePrice(config).totaal;
}
