/**
 * Pure price calculation for the configurator.
 * Model: basis (materiaal × producttype-factor) + glas + afwerking + opties +
 * montage, alles incl. btw. Output is een RICHTPRIJS (indicatief).
 */

import {
  CONFIG_MATERIALEN,
  CONFIG_PRODUCTTYPES,
  CONFIG_GLAS,
  CONFIG_KLEUREN,
  CONFIG_OPTIES,
  CONFIG_UITVOERING,
} from "@/data/configurator";

export type KozijnConfig = {
  materiaal?: string;
  profiel?: string;
  producttype?: string;
  breedteCm: number;
  hoogteCm: number;
  aantal: number;
  glas?: string;
  /** Kleur/afwerking — value uit CONFIG_KLEUREN */
  kleur?: string;
  opties: string[];
  uitvoering?: string;
};

export type PriceBreakdown = {
  areaM2: number;
  materiaalKosten: number;
  glasKosten: number;
  afwerkingKosten: number;
  optieKosten: number;
  montageKosten: number;
  perUnit: number;
  aantal: number;
  totaal: number;
  /** True zodra de minimaal benodigde keuzes gemaakt zijn voor een richtprijs. */
  complete: boolean;
};

export const emptyConfig: KozijnConfig = {
  breedteCm: 100,
  hoogteCm: 120,
  aantal: 1,
  opties: [],
};

function find<T extends { value: string }>(list: T[], value?: string): T | undefined {
  return value ? list.find((x) => x.value === value) : undefined;
}

export function computePrice(config: KozijnConfig): PriceBreakdown {
  const materiaal = find(CONFIG_MATERIALEN, config.materiaal);
  const producttype = find(CONFIG_PRODUCTTYPES, config.producttype);
  const glas = find(CONFIG_GLAS, config.glas);
  const kleur = find(CONFIG_KLEUREN, config.kleur);
  const uitvoering = find(CONFIG_UITVOERING, config.uitvoering);

  const areaM2 = Math.max(
    0,
    (config.breedteCm / 100) * (config.hoogteCm / 100),
  );

  const materiaalKosten =
    materiaal && producttype ? areaM2 * materiaal.pricePerM2 * producttype.factor : 0;

  const glasKosten = glas ? areaM2 * glas.pricePerM2 : 0;

  const afwerkingKosten = kleur
    ? (materiaalKosten + glasKosten) * kleur.surchargePct
    : 0;

  const optieKosten = config.opties.reduce((sum, value) => {
    const optie = find(CONFIG_OPTIES, value);
    return sum + (optie?.pricePerUnit ?? 0);
  }, 0);

  const montageKosten = uitvoering ? uitvoering.pricePerUnit : 0;

  const perUnit =
    materiaalKosten + glasKosten + afwerkingKosten + optieKosten + montageKosten;
  const aantal = Math.max(1, config.aantal || 1);
  const totaal = perUnit * aantal;

  // Een richtprijs is pas zinvol zodra materiaal + producttype + glas gekozen zijn.
  const complete = Boolean(materiaal && producttype && glas);

  return {
    areaM2,
    materiaalKosten,
    glasKosten,
    afwerkingKosten,
    optieKosten,
    montageKosten,
    perUnit,
    aantal,
    totaal,
    complete,
  };
}

/** Formatteert een bedrag als Nederlandse euro-richtprijs. */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}
