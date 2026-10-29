import { VERGELIJK_RIJEN } from "@/data/kozijnen-gids";

/**
 * Kwalitatieve vergelijkingstabel per profiel/product. Bevat bewust GEEN
 * bedragen — alleen een indicatieve prijsklasse (€ / €€ / €€€) — en geen
 * prestatiewaarden of levensduurclaims zonder productbron.
 */
export function KozijnVergelijkTabel() {
  return (
    <div>
      <div className="overflow-x-auto rounded-card border border-mist">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="bg-paper-soft text-ink">
              <th scope="col" className="px-4 py-3 font-semibold">Product</th>
              <th scope="col" className="px-4 py-3 font-semibold">Materiaal</th>
              <th scope="col" className="px-4 py-3 font-semibold">Uitstraling</th>
              <th scope="col" className="px-4 py-3 font-semibold">Onderhoud</th>
              <th scope="col" className="px-4 py-3 font-semibold">Opbouw</th>
              <th scope="col" className="px-4 py-3 font-semibold">Prijsklasse</th>
              <th scope="col" className="px-4 py-3 font-semibold">Past vaak bij</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mist">
            {VERGELIJK_RIJEN.map((rij) => (
              <tr key={rij.product} className="align-top">
                <th scope="row" className="whitespace-nowrap px-4 py-3 font-medium text-ink">{rij.product}</th>
                <td className="px-4 py-3 text-ink/70">{rij.materiaal}</td>
                <td className="px-4 py-3 text-ink/70">{rij.uitstraling}</td>
                <td className="px-4 py-3 text-ink/70">{rij.onderhoud}</td>
                <td className="px-4 py-3 text-ink/70">{rij.opbouw}</td>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-ink">{rij.prijsklasse}</td>
                <td className="px-4 py-3 text-ink/70">{rij.geschiktVoor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink/50">
        De prijsklasse is een onderlinge vergelijking (€ = voordeligst, €€€ =
        hoogste segment), geen bedrag. Wat jouw kozijnen kosten, hangt af van
        profiel, maat, glas, kleur en montage. Dat staat in je voorstel, nadat we
        bij je thuis hebben ingemeten.
      </p>
    </div>
  );
}
