/**
 * Bridges the configurator → offerteformulier (fase 4).
 * The configurator writes a handoff object to sessionStorage; the offerte
 * wizard reads it on mount to prefill fields and attach the full configuration
 * (incl. richtprijs) so it ends up in the email. No backend needed.
 */

import {
  CONFIG_MATERIALEN,
  CONFIG_PRODUCTTYPES,
  CONFIG_GLAS,
  CONFIG_KLEUREN,
  CONFIG_OPTIES,
  CONFIG_UITVOERING,
} from "@/data/configurator";
import { computePrice, formatEuro, type KozijnConfig } from "@/lib/configurator-price";

export const HANDOFF_KEY = "kozijn-configuratie";

export type OfferteHandoff = {
  prefill: {
    materiaal?: string;
    producttypes?: string[];
    aantal?: number;
    uitvoering?: string;
  };
  /** Volledige configuratie — gebruikt door de checkout (/offerte). */
  config: KozijnConfig;
  /** Door de klant gekozen montage-aantallen (per prijslijst-regel). */
  montageAantallen: Record<string, number>;
  /** Human-readable multi-line summary, attached to the offerte email. */
  summary: string;
};

function lbl<T extends { value: string; label: string }>(
  list: T[],
  value?: string,
): string {
  return list.find((x) => x.value === value)?.label ?? "—";
}

export function buildHandoff(
  config: KozijnConfig,
  montageAantallen: Record<string, number> = {},
): OfferteHandoff {
  const breakdown = computePrice(config);

  const materiaalOptie = CONFIG_MATERIALEN.find((m) => m.value === config.materiaal);
  const profielLabel =
    materiaalOptie?.profielen.find((p) => p.value === config.profiel)?.label ?? "—";
  const producttypeOptie = CONFIG_PRODUCTTYPES.find((p) => p.value === config.producttype);
  const uitvoeringOptie = CONFIG_UITVOERING.find((u) => u.value === config.uitvoering);

  const optieLabels =
    config.opties.length > 0
      ? config.opties.map((o) => lbl(CONFIG_OPTIES, o)).join(", ")
      : "Geen";

  const lines = [
    "── Configuratie via de online configurator ──",
    `Materiaal: ${lbl(CONFIG_MATERIALEN, config.materiaal)}`,
    `Profiel: ${profielLabel}`,
    `Producttype: ${lbl(CONFIG_PRODUCTTYPES, config.producttype)}`,
    `Afmetingen: ${config.breedteCm} × ${config.hoogteCm} cm (${breakdown.areaM2.toFixed(2)} m²)`,
    `Aantal: ${config.aantal}`,
    `Glas: ${lbl(CONFIG_GLAS, config.glas)}`,
    `Kleur: ${lbl(CONFIG_KLEUREN, config.kleur)}`,
    `Opties: ${optieLabels}`,
    `Uitvoering: ${lbl(CONFIG_UITVOERING, config.uitvoering)}`,
    "",
    `Indicatieve richtprijs: ${formatEuro(breakdown.totaal)} (incl. btw)`,
    "NB: richtprijs uit de configurator — niet bindend. Definitieve prijs na inmeting.",
  ];

  return {
    prefill: {
      materiaal: config.materiaal,
      producttypes: producttypeOptie ? [producttypeOptie.offerteType] : undefined,
      aantal: config.aantal,
      uitvoering: uitvoeringOptie?.offerteType,
    },
    config,
    montageAantallen,
    summary: lines.join("\n"),
  };
}
