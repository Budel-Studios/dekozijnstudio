"use client";

import { formatEuro, type KozijnConfig } from "@/lib/configurator-price";
import {
  applicableRegels,
  autoQuantity,
  EENHEID_LABEL,
  HOOGWERKER_NOTE,
  MONTAGE,
  type MontageRegel,
} from "@/lib/montage";
import { cn } from "@/lib/utils";

const CATEGORIE_VOLGORDE = ["Demontage", "Bouwkundig", "Plaatsing", "Afwerking", "Overig"];
const BTW = 1 + MONTAGE.btwPercentage / 100;

/**
 * Gedeelde montage-editor (configurator én 'Jouw project').
 * De klant vinkt regels aan/uit; hoeveelheden en prijs worden automatisch
 * berekend uit de configuratie. Alle bedragen incl. btw.
 */
export function MontageEditor({
  config,
  checkedIds,
  onToggle,
}: {
  config: KozijnConfig | null;
  checkedIds: string[];
  onToggle: (id: string, checked: boolean) => void;
}) {
  const regels = applicableRegels(config);
  const checked = new Set(checkedIds);

  if (regels.length === 0) {
    return (
      <p className="rounded-xl border border-mist bg-paper-soft px-4 py-3 text-sm text-ink/55">
        Geen montagewerkzaamheden van toepassing (zonder montage of nog geen
        configuratie).
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {CATEGORIE_VOLGORDE.map((categorie) => {
        const inCat = regels.filter((r) => r.categorie === categorie);
        if (inCat.length === 0) return null;
        return (
          <div key={categorie}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-wood">{categorie}</p>
            <div className="divide-y divide-mist rounded-xl border border-mist">
              {inCat.map((regel) => (
                <MontageRow
                  key={regel.id}
                  regel={regel}
                  config={config}
                  checked={checked.has(regel.id)}
                  onToggle={(c) => onToggle(regel.id, c)}
                />
              ))}
            </div>
          </div>
        );
      })}

      <p className="rounded-xl border border-wood/30 bg-wood/5 px-4 py-3 text-xs leading-relaxed text-ink/70">
        <strong className="text-ink">Hoogwerker?</strong> {HOOGWERKER_NOTE}
      </p>
    </div>
  );
}

function MontageRow({
  regel,
  config,
  checked,
  onToggle,
}: {
  regel: MontageRegel;
  config: KozijnConfig | null;
  checked: boolean;
  onToggle: (checked: boolean) => void;
}) {
  const aantal = autoQuantity(regel, config);
  const lineIncl = regel.prijs * BTW * (checked ? aantal : 0);
  const aantalLabel =
    regel.eenheid === "stuk"
      ? `${aantal}×`
      : `${aantal} ${EENHEID_LABEL[regel.eenheid]}`;

  return (
    <label className="flex cursor-pointer items-center gap-3 px-4 py-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onToggle(e.target.checked)}
        className="size-4 shrink-0 accent-forest"
      />
      <div className="flex-1">
        <p className={cn("text-sm font-medium", checked ? "text-ink" : "text-ink/55")}>{regel.label}</p>
        <p className="text-xs text-ink/50">
          {aantalLabel} · {formatEuro(regel.prijs * BTW)} / {EENHEID_LABEL[regel.eenheid]} (incl. btw)
          {regel.toelichting ? ` · ${regel.toelichting}` : ""}
        </p>
      </div>
      <div className="w-20 text-right text-sm font-medium text-ink">
        {checked ? formatEuro(lineIncl) : "—"}
      </div>
    </label>
  );
}
