import { formatEuro } from "@/lib/configurator-price";
import { MONTAGE } from "@/lib/montage";
import type { CheckoutTotals } from "@/lib/checkout";
import { cn } from "@/lib/utils";

/**
 * Gedeeld prijsoverzicht: product + montage → bruto, ISDE-teruggave → netto,
 * en de betaalsplitsing (aanbetaling bij opdracht / restant bij oplevering).
 * Alle bedragen incl. btw. Gebruikt in de configurator én in 'Jouw project'.
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
        <Line k="Kozijn(en)" v={formatEuro(totals.productInclBtw)} />
        <Line k="Montage & werk" v={formatEuro(totals.montage.subtotaalInclBtw)} />

        <div className="border-t border-mist pt-2">
          <Line k="Bruto (incl. btw)" v={formatEuro(totals.brutoInclBtw)} strong />
          <p className="mt-0.5 text-xs text-ink/45">
            waarvan btw ({MONTAGE.btwPercentage}%): {formatEuro(totals.btwBedrag)}
          </p>
        </div>

        {isde.subsidie > 0 && (
          <div className="border-t border-mist pt-2">
            <Line
              k="ISDE-subsidie (ontvangt u van RVO)"
              v={`− ${formatEuro(isde.subsidie)}`}
              accent
            />
            <Line k="Netto investering" v={formatEuro(totals.nettoInvestering)} strong />
          </div>
        )}
      </dl>

      {/* Betaalsplitsing */}
      <div className="mt-4 rounded-xl border border-mist bg-paper p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-wood">Betaling</p>
        <dl className="mt-2.5 space-y-1.5">
          <Line k="Aanbetaling bij opdracht" v={formatEuro(totals.aanbetaling)} />
          <Line k="Restant bij oplevering" v={formatEuro(totals.restantBijOplevering)} />
        </dl>
        <p className="mt-2.5 text-xs leading-relaxed text-ink/45">
          De aanbetaling dekt de maatwerkproductie van uw kozijnen. Het restant
          (resterend kozijndeel + montage) voldoet u bij oplevering.
        </p>
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
