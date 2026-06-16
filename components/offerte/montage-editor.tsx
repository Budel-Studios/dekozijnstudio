"use client";

import { formatEuro } from "@/lib/configurator-price";
import { MONTAGE, EENHEID_LABEL, type MontageRegel } from "@/lib/montage";

const CATEGORIE_VOLGORDE = ["Demontage", "Bouwkundig", "Plaatsing", "Afwerking", "Overig"];

/**
 * Gedeelde montage-regel-editor (gebruikt in de configurator én in 'Jouw project').
 * Toont alle prijslijst-regels gegroepeerd per categorie; de klant vult aantallen
 * in. Alle bedragen incl. btw.
 */
export function MontageEditor({
  aantallen,
  onChange,
}: {
  aantallen: Record<string, number>;
  onChange: (id: string, value: number) => void;
}) {
  return (
    <div className="space-y-6">
      {CATEGORIE_VOLGORDE.map((categorie) => {
        const regels = MONTAGE.regels.filter((r) => r.categorie === categorie);
        if (regels.length === 0) return null;
        return (
          <div key={categorie}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-wood">{categorie}</p>
            <div className="divide-y divide-mist rounded-xl border border-mist">
              {regels.map((regel) => (
                <MontageRow
                  key={regel.id}
                  regel={regel}
                  aantal={aantallen[regel.id] ?? 0}
                  onChange={(v) => onChange(regel.id, v)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MontageRow({
  regel,
  aantal,
  onChange,
}: {
  regel: MontageRegel;
  aantal: number;
  onChange: (v: number) => void;
}) {
  const incl = regel.prijs * (1 + MONTAGE.btwPercentage / 100);
  const step = regel.eenheid === "stuk" ? 1 : 0.1;
  const lineIncl = incl * (aantal || 0);
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-ink">{regel.label}</p>
        <p className="text-xs text-ink/50">
          {formatEuro(incl)} / {EENHEID_LABEL[regel.eenheid]} (incl. btw)
          {regel.toelichting ? ` · ${regel.toelichting}` : ""}
        </p>
      </div>
      <input
        type="number"
        min={0}
        step={step}
        value={aantal === 0 ? "" : aantal}
        placeholder="0"
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        aria-label={`Aantal ${regel.label} (${EENHEID_LABEL[regel.eenheid]})`}
        className="w-20 rounded-lg border border-mist bg-paper px-2.5 py-2 text-right text-sm text-ink outline-none focus:border-forest focus:ring-2 focus:ring-forest/15"
      />
      <div className="w-20 text-right text-sm font-medium text-ink">
        {aantal > 0 ? formatEuro(lineIncl) : "—"}
      </div>
    </div>
  );
}
