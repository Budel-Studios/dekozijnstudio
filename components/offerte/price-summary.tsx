import { formatEuro } from "@/lib/configurator-price";
import { MONTAGE } from "@/lib/montage";
import type { CheckoutTotals } from "@/lib/checkout";
import { PRICE_ON_REQUEST, SHOW_PRODUCT_PRICES } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Gedeeld prijsoverzicht: product + montage → bruto, ISDE-teruggave → netto,
 * en de betaalsplitsing (aanbetaling bij opdracht / restant bij oplevering).
 * Alle bedragen incl. btw. Gebruikt in de configurator én in 'Jouw project'.
 *
 * Met SHOW_PRODUCT_PRICES = false blijven alleen de montagekosten en de
 * indicatieve ISDE-subsidie staan; kozijnprijzen en totalen worden verborgen.
 */
export function PriceSummary({
  totals,
  className,
}: {
  totals: CheckoutTotals;
  className?: string;
}) {
  const { isde } = totals;

  return (
    <div className={cn("text-sm", className)}>
      <dl className="space-y-2">
        <Line
          k="Kozijn(en)"
          v={SHOW_PRODUCT_PRICES ? formatEuro(totals.productInclBtw) : PRICE_ON_REQUEST}
        />
        <Line k="Montage & werk" v={formatEuro(totals.montage.subtotaalInclBtw)} />

        {SHOW_PRODUCT_PRICES && (
          <div className="border-t border-mist pt-2">
            <Line k="Bruto (incl. btw)" v={formatEuro(totals.brutoInclBtw)} strong />
            <p className="mt-0.5 text-xs text-ink/45">
              waarvan btw ({MONTAGE.btwPercentage}%): {formatEuro(totals.btwBedrag)}
            </p>
          </div>
        )}

        {isde.subsidie > 0 && (
          <div className="border-t border-mist pt-2">
            <Line
              k="ISDE-subsidie (ontvang je van RVO)"
              v={`− ${formatEuro(isde.subsidie)}`}
              accent
            />
            {SHOW_PRODUCT_PRICES && (
              <Line k="Netto investering" v={formatEuro(totals.nettoInvestering)} strong />
            )}
          </div>
        )}
      </dl>

      {/* Betaalsplitsing */}
      <div className="mt-4 rounded-xl border border-mist bg-paper p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-wood">Betaling</p>
        {SHOW_PRODUCT_PRICES ? (
          <>
            <dl className="mt-2.5 space-y-1.5">
              <Line k="Aanbetaling bij opdracht" v={formatEuro(totals.aanbetaling)} />
              <Line k="Restant bij oplevering" v={formatEuro(totals.restantBijOplevering)} />
            </dl>
            <p className="mt-2.5 text-xs leading-relaxed text-ink/45">
              De aanbetaling dekt de maatwerkproductie van je kozijnen. Het restant
              (resterend kozijndeel en montage) betaal je bij oplevering.
            </p>
          </>
        ) : (
          <p className="mt-2.5 text-xs leading-relaxed text-ink/45">
            Bij maatwerk vragen we een aanbetaling voor de productie; de montage
            betaal je achteraf. De bedragen staan in je voorstel na het inmeten.
          </p>
        )}
      </div>
    </div>
  );
}

function Line({
  k,
  v,
  strong,
  accent,
}: {
  k: string;
  v: string;
  strong?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between gap-3">
      <dt className={cn("text-ink/60", strong && "font-medium text-ink")}>{k}</dt>
      <dd
        className={cn(
          "text-right text-ink",
          strong && "font-semibold",
          accent && "font-medium text-forest",
        )}
      >
        {v}
      </dd>
    </div>
  );
}
