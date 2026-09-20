import { MONTAGE, EENHEID_LABEL, HOOGWERKER_NOTE } from "@/lib/montage";
import { formatEuro } from "@/lib/configurator-price";
import { Callout } from "@/components/ui/callout";

const BTW_FACTOR = 1 + MONTAGE.btwPercentage / 100;

/**
 * Montagetarieven uit de eigen prijslijst (data/montage-prijslijst.json),
 * omgerekend naar consumentenprijzen incl. btw. Deze tarieven blijven
 * zichtbaar terwijl kozijnprijzen nog niet online staan.
 */
export function MontageTarieven() {
  const regels = MONTAGE.regels;

  return (
    <div>
      <div className="overflow-hidden rounded-card border border-mist bg-paper">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            Montagetarieven per eenheid, inclusief btw
          </caption>
          <thead>
            <tr className="border-b border-mist bg-paper-soft text-xs uppercase tracking-widest text-ink/55">
              <th scope="col" className="px-5 py-3 font-semibold">
                Werkzaamheid
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Eenheid
              </th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">
                Incl. btw
              </th>
            </tr>
          </thead>
          <tbody>
            {regels.map((regel) => (
              <tr key={regel.id} className="border-b border-mist last:border-0">
                <td className="px-5 py-3 text-ink">
                  {regel.label}
                  {regel.toelichting && (
                    <span className="mt-0.5 block text-xs leading-relaxed text-ink/50">
                      {regel.toelichting}
                    </span>
                  )}
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-ink/60">
                  per {EENHEID_LABEL[regel.eenheid]}
                </td>
                <td className="px-5 py-3 text-right font-semibold whitespace-nowrap text-ink">
                  {formatEuro(regel.prijs * BTW_FACTOR)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink/50">
        Tarieven incl. {MONTAGE.btwPercentage}% btw · prijslijst bijgewerkt{" "}
        {MONTAGE.laatstBijgewerkt}. Welke werkzaamheden nodig zijn, hangt af van
        uw situatie — in de configurator rekenen we de hoeveelheden automatisch
        uit.
      </p>

      <Callout variant="warning" className="mt-4" title="Hoogwerker">
        <p>{HOOGWERKER_NOTE}</p>
      </Callout>
    </div>
  );
}
