import Image from "next/image";
import { findProfiel } from "@/data/configurator";
import { Placeholder } from "@/components/ui/placeholder";
import type { ProductGids } from "@/data/kozijnen-gids";

/** Bouwt de mm-maatrijen uit de single-source profieldata (configurator). */
function maatRows(materiaal?: string, profielValue?: string): Array<[string, string]> {
  const specs = findProfiel(materiaal, profielValue)?.specs;
  if (!specs) return [];
  const rows: Array<[string, string]> = [
    ["Zichtbreedte kozijn", `${specs.kozijnMm[0]} mm`],
    ["Inbouwdiepte", `${specs.inbouwdiepteMm} mm`],
  ];
  if (specs.raamMm) rows.push(["Raamprofiel", `${specs.raamMm[0]} × ${specs.raamMm[1]} mm`]);
  if (specs.deurMm) rows.push(["Deurprofiel", specs.deurMm]);
  if (typeof specs.aanslagMm === "number") rows.push(["Aanslag", `${specs.aanslagMm} mm`]);
  if (specs.glaslat) rows.push(["Glaslatten", specs.glaslat]);
  return rows;
}

/**
 * Strips internal "TODO: …" notes from a spec value before it reaches visitors.
 * The notes stay in data/kozijnen-gids.ts as a to-confirm checklist.
 * Returns null when nothing publishable is left (row is then hidden).
 */
function publicWaarde(waarde: string): string | null {
  const idx = waarde.search(/\bTODO\b/i);
  const text = (idx === -1 ? waarde : waarde.slice(0, idx)).trim();
  return text.length > 0 ? text : null;
}

/**
 * Specificatieblok voor één profiel/product: beeld, intro, technische
 * mm-maten (uit configurator) en de prozaïsche rubrieken (uit kozijnen-gids).
 */
export function ProductSpecs({ product }: { product: ProductGids }) {
  const maten = maatRows(product.materiaal, product.profielValue);

  return (
    <div className="rounded-card border border-mist bg-paper p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Beeld + kerngegevens */}
        <div>
          {product.afbeelding ? (
            <div className="relative aspect-square w-full overflow-hidden border border-mist bg-paper">
              <Image
                src={product.afbeelding}
                alt={`Profiel ${product.titel}`}
                fill
                sizes="260px"
                className="object-contain p-3"
              />
            </div>
          ) : (
            <Placeholder label={`Beeld ${product.titel}`} className="min-h-52" />
          )}

          {maten.length > 0 && (
            <dl className="mt-4 space-y-1.5 border-t border-mist pt-4 text-sm">
              {maten.map(([label, waarde]) => (
                <div key={label} className="flex justify-between gap-3">
                  <dt className="text-ink/55">{label}</dt>
                  <dd className="text-right font-medium text-ink">{waarde}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Tekst + rubrieken */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-wood">
            {product.leverancier}
          </p>
          <h3 className="mt-2 text-xl text-ink">{product.titel}</h3>
          <p className="mt-3 leading-relaxed text-ink/70">{product.intro}</p>

          <dl className="mt-6 divide-y divide-mist border-t border-mist">
            {product.specs.map((row) => {
              const waarde = publicWaarde(row.waarde);
              if (!waarde) return null;
              return (
                <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
                  <dt className="text-sm font-medium text-ink">{row.label}</dt>
                  <dd className="text-sm leading-relaxed text-ink/70">{waarde}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}
