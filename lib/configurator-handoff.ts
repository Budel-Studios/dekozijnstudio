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
  CONFIG_DRAAIRICHTING,
  CONFIG_HANGSLUIT,
  CONFIG_VENTILATIE_POSITIE,
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
  /** Volledige configuratie — gebruikt door de projectoverzicht (/project). */
  config: KozijnConfig;
  /** Aangevinkte montage-regel-ids (hoeveelheden zijn automatisch). */
  montageChecked: string[];
  /** Human-readable multi-line summary, attached to the offerte email. */
  summary: string;
};

function lbl<T extends { value: string; label: string }>(
  list: readonly T[],
  value?: string,
): string {
  return list.find((x) => x.value === value)?.label ?? "—";
}

export function buildHandoff(
  config: KozijnConfig,
  montageChecked: string[] = [],
): OfferteHandoff {
  const breakdown = computePrice(config);

  const materiaalOptie = CONFIG_MATERIALEN.find((m) => m.value === config.materiaal);
  const profielLabel =
    materiaalOptie?.profielen.find((p) => p.value === config.profiel)?.label ?? "—";
  const producttypeOptie = CONFIG_PRODUCTTYPES.find((p) => p.value === config.producttype);
  const uitvoeringOptie = CONFIG_UITVOERING.find((u) => u.value === config.uitvoering);

  const ventilatieAan = config.opties.includes("ventilatie");
  const extras = config.opties.filter((o) => o !== "ventilatie");
  const extraLabels = extras.length > 0 ? extras.map((o) => lbl(CONFIG_OPTIES, o)).join(", ") : "Geen";
  const ventilatieTekst = ventilatieAan
    ? `Ja${config.ventilatiePositie ? ` (${lbl(CONFIG_VENTILATIE_POSITIE, config.ventilatiePositie)})` : ""}${config.ventilatieKleur ? `, kleur ${lbl(CONFIG_KLEUREN, config.ventilatieKleur)}` : ""}`
    : "Nee";

  const lines = [
    "── Configuratie via de online configurator ──",
    `Materiaal: ${lbl(CONFIG_MATERIALEN, config.materiaal)}`,
    `Profiel: ${profielLabel}`,
    `Producttype: ${lbl(CONFIG_PRODUCTTYPES, config.producttype)}`,
    `Afmetingen: ${config.breedteCm} × ${config.hoogteCm} cm (${breakdown.areaM2.toFixed(2)} m²)`,
    `Aantal: ${config.aantal}`,
    `Glas: ${lbl(CONFIG_GLAS, config.glas)}`,
    `Kleur: ${lbl(CONFIG_KLEUREN, config.kleur)}`,
    config.draairichting ? `Draairichting: ${lbl(CONFIG_DRAAIRICHTING, config.draairichting)}` : "",
    config.hangSluit ? `Hang- en sluitwerk: ${lbl(CONFIG_HANGSLUIT, config.hangSluit)}` : "",
    `Ventilatierooster: ${ventilatieTekst}`,
    `Extra's: ${extraLabels}`,
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
    montageChecked,
    summary: lines.join("\n"),
  };
}
