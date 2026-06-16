import { cn } from "@/lib/utils";

/**
 * Price table SHELL (fase 1).
 * Prices are passed in as data — never hardcoded in components (CLAUDE.md).
 * In fase 2+ the rows come from a data/CMS source. Consumer prices are
 * incl. btw and "vanaf" indications must be labelled.
 */
export type PriceRow = {
  label: string;
  /** Display string for the price, e.g. "€ 0,00" or "—" while unknown. */
  price: string;
  /** When true, prefixes the price with the "vanaf" label. */
  from?: boolean;
  note?: string;
};

export function PriceTable({
  caption,
  rows,
  footnote,
  className,
}: {
  caption: string;
  rows: PriceRow[];
  footnote?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-card border border-mist", className)}>
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-paper-soft text-ink">
            <th scope="col" className="px-5 py-4 font-semibold">
              Onderdeel
            </th>
            <th scope="col" className="px-5 py-4 text-right font-semibold">
              Prijs (incl. btw)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-mist">
          {rows.map((row, index) => (
            <tr key={index} className="align-top">
              <th scope="row" className="px-5 py-4 font-medium text-ink">
                {row.label}
                {row.note && (
                  <span className="mt-1 block text-xs font-normal text-ink/50">
                    {row.note}
                  </span>
                )}
              </th>
              <td className="whitespace-nowrap px-5 py-4 text-right text-ink">
                {row.from && (
                  <span className="mr-1 text-xs uppercase tracking-wide text-ink/45">
                    vanaf
                  </span>
                )}
                {row.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {footnote && (
        <p className="border-t border-mist bg-paper px-5 py-3 text-xs text-ink/55">
          {footnote}
        </p>
      )}
    </div>
  );
}
