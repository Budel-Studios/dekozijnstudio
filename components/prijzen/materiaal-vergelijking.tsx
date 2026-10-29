import { computePrice, formatEuro, type KozijnConfig } from "@/lib/configurator-price";

/**
 * Vergelijkingstabel: per voorbeeldconfiguratie (rij) de richtprijs in
 * kunststof, hout en aluminium (kolommen). Prijzen zijn data-driven berekend
 * uit het configurator-prijsmodel — vanaf-prijs, incl. btw, excl. montage.
 */

const MATERIALEN = [
  { value: "kunststof", label: "Kunststof" },
  { value: "hout", label: "Hout" },
  { value: "aluminium", label: "Aluminium" },
];

type Rij = {
  type: string;
  configType: string;
  glas: string;
  glasValue: string;
  afmeting: string;
  breedteCm: number;
  hoogteCm: number;
};

const RIJEN: Rij[] = [
  { type: "Draaikiepraam", configType: "draaikiep", glas: "HR++", glasValue: "hr-plus", afmeting: "100 × 120 cm", breedteCm: 100, hoogteCm: 120 },
  { type: "Vast raam", configType: "vast-raam", glas: "HR++", glasValue: "hr-plus", afmeting: "100 × 100 cm", breedteCm: 100, hoogteCm: 100 },
  { type: "Vast raam", configType: "vast-raam", glas: "Triple", glasValue: "triple", afmeting: "100 × 100 cm", breedteCm: 100, hoogteCm: 100 },
  { type: "Voordeur", configType: "voordeur", glas: "Triple", glasValue: "triple", afmeting: "100 × 215 cm", breedteCm: 100, hoogteCm: 215 },
  { type: "Schuifpui", configType: "schuifpui", glas: "HR++", glasValue: "hr-plus", afmeting: "300 × 220 cm", breedteCm: 300, hoogteCm: 220 },
];

function prijs(materiaal: string, rij: Rij): number {
  const config: KozijnConfig = {
    materiaal,
    producttype: rij.configType,
    breedteCm: rij.breedteCm,
    hoogteCm: rij.hoogteCm,
    aantal: 1,
    glas: rij.glasValue,
    kleur: "wit",
    opties: [],
    uitvoering: "levering",
  };
  return computePrice(config).totaal;
}

export function MateriaalVergelijking() {
  return (
    <div>
      <div className="overflow-x-auto rounded-card border border-mist">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="bg-paper-soft text-ink">
              <th scope="col" className="px-4 py-3 font-semibold">Type</th>
              <th scope="col" className="px-4 py-3 font-semibold">Glas</th>
              <th scope="col" className="px-4 py-3 font-semibold">Afmeting</th>
              {MATERIALEN.map((m) => (
                <th key={m.value} scope="col" className="px-4 py-3 text-right font-semibold">{m.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-mist">
            {RIJEN.map((rij, i) => (
              <tr key={i} className="align-middle">
                <th scope="row" className="px-4 py-3 font-medium text-ink">{rij.type}</th>
                <td className="px-4 py-3 text-ink/70">{rij.glas}</td>
                <td className="px-4 py-3 text-ink/70">{rij.afmeting}</td>
                {MATERIALEN.map((m) => (
                  <td key={m.value} className="whitespace-nowrap px-4 py-3 text-right text-ink">
                    <span className="mr-1 text-xs uppercase tracking-wide text-ink/40">vanaf</span>
                    {formatEuro(prijs(m.value, rij))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink/50">
        Indicatieve richtprijzen per stuk, inclusief btw en zonder montage, in
        de standaardkleur wit. Ze zijn alleen bedoeld om de materialen te
        vergelijken. Je definitieve prijs staat in je voorstel, nadat we bij je
        thuis hebben ingemeten.
      </p>
    </div>
  );
}
