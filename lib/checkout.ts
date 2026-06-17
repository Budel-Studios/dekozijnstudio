/**
 * Checkout-berekening: combineert productprijs (configurator), dynamische
 * montage (prijslijst) en indicatieve ISDE-subsidie tot één prijsoverzicht.
 * Alle klantbedragen incl. btw; btw apart getoond als "waarvan btw".
 */

import { z } from "zod";
import { computePrice, type KozijnConfig } from "@/lib/configurator-price";
import { computeMontage, MONTAGE, type MontageResult } from "@/lib/montage";
import { isdeBerekening } from "@/data/subsidie";
import { AANBETALING_KOZIJN_AANDEEL } from "@/data/prices";

const BTW_FACTOR = 1 + MONTAGE.btwPercentage / 100;

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

// ─── ISDE (indicatief) ────────────────────────────────────────────────────────

export type IsdeResult = {
  /** Komt het glastype in aanmerking? */
  eligible: boolean;
  glasM2: number;
  ratePerM2: number;
  /** Indicatieve subsidie (euro). 0 als niet van toepassing. */
  subsidie: number;
  /** Haalt de glasoppervlakte de indicatieve minimumdrempel? */
  meetsMinimum: boolean;
};

export function computeIsde(config: KozijnConfig | null): IsdeResult {
  const glasType = config?.glas ?? "";
  const rate = isdeBerekening.ratePerM2[glasType] ?? 0;
  const eligible = rate > 0;
  const glasM2 = config
    ? round2((config.breedteCm / 100) * (config.hoogteCm / 100) * Math.max(1, config.aantal || 1))
    : 0;
  const meetsMinimum = glasM2 >= isdeBerekening.minM2;
  const subsidie = eligible ? round2(glasM2 * rate) : 0;
  return { eligible, glasM2, ratePerM2: rate, subsidie, meetsMinimum };
}

// ─── Totaaloverzicht ─────────────────────────────────────────────────────────

export type CheckoutTotals = {
  productInclBtw: number;
  montage: MontageResult;
  subtotaalInclBtw: number;
  btwBedrag: number;
  isde: IsdeResult;
  /** Bruto: totaal incl. btw dat aan ons betaald wordt (vóór ISDE). */
  brutoInclBtw: number;
  /** Netto investering na indicatieve ISDE (ISDE ontvangt klant van RVO). */
  nettoInvestering: number;
  /** Aanbetaling bij opdracht (maatwerkproductie kozijn). */
  aanbetaling: number;
  /** Restant te voldoen bij oplevering (resterend kozijndeel + montage). */
  restantBijOplevering: number;
  /** = nettoInvestering (behouden voor bestaande verwijzingen). */
  eindtotaalInclBtw: number;
};

export function computeCheckout(
  config: KozijnConfig | null,
  montageCheckedIds: string[],
): CheckoutTotals {
  // Productprijs zonder de simpele configurator-montage (montage = prijslijst).
  const productInclBtw = config
    ? computePrice({ ...config, uitvoering: "levering" }).totaal
    : 0;
  const productExBtw = productInclBtw / BTW_FACTOR;

  const montage = computeMontage(config, montageCheckedIds);

  const subtotaalExBtw = productExBtw + montage.subtotaalExBtw;
  const btwBedrag = round2(subtotaalExBtw * (MONTAGE.btwPercentage / 100));
  const subtotaalInclBtw = round2(subtotaalExBtw + btwBedrag);

  const isde = computeIsde(config);

  // Bruto = wat aan ons betaald wordt (vóór ISDE). ISDE is een aparte
  // RVO-teruggave aan de klant en verlaagt dus niet de betaling aan ons.
  const brutoInclBtw = subtotaalInclBtw;
  const nettoInvestering = round2(brutoInclBtw - isde.subsidie);
  const aanbetaling = round2(round2(productInclBtw) * AANBETALING_KOZIJN_AANDEEL);
  const restantBijOplevering = round2(brutoInclBtw - aanbetaling);

  return {
    productInclBtw: round2(productInclBtw),
    montage,
    subtotaalInclBtw,
    btwBedrag,
    isde,
    brutoInclBtw,
    nettoInvestering,
    aanbetaling,
    restantBijOplevering,
    eindtotaalInclBtw: nettoInvestering,
  };
}

// ─── Validatieschema voor verzending ─────────────────────────────────────────

export const checkoutContactSchema = z.object({
  naam: z.string().min(2, "Vul uw naam in.").max(120),
  email: z.string().email("Vul een geldig e-mailadres in.").max(160),
  telefoon: z
    .string()
    .min(8, "Vul een geldig telefoonnummer in.")
    .max(25)
    .regex(/^[0-9+()\s-]+$/, "Alleen cijfers en + ( ) - zijn toegestaan."),
  postcode: z.string().regex(/^\d{4}\s?[A-Za-z]{2}$/, "Vul een geldige postcode in.").max(8),
  plaats: z.string().min(2, "Vul uw plaats in.").max(120),
  opmerkingen: z.string().max(2000).optional().or(z.literal("")),
  privacyAkkoord: z.literal(true, { message: "U dient akkoord te gaan met de privacyverklaring." }),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type CheckoutContact = z.infer<typeof checkoutContactSchema>;
