import Link from "next/link";
import { PresetPreview } from "@/components/configurator/preset-preview";
import { ArrowRightIcon } from "@/components/icons";
import { formatEuro } from "@/lib/configurator-price";
import { PRICE_ON_REQUEST, SHOW_PRODUCT_PRICES } from "@/lib/site";
import { presetVanafPrice, type PresetItem } from "@/data/preset-configuraties";

/**
 * Kaart voor een voorgeconfigureerd product. De tekening (PresetPreview) staat
 * in een vaste-hoogte beeldvak en is gecentreerd → alle kaarten exact even groot.
 * Klik = naar de configurator met het dichtstbijzijnde basistype voorgeselecteerd.
 */
export function PresetCard({ preset }: { preset: PresetItem }) {
  const prijs = SHOW_PRODUCT_PRICES ? presetVanafPrice(preset) : 0;

  return (
    <Link
      href={`/configurator?type=${preset.configType}`}
      className="group flex flex-col overflow-hidden rounded-card border border-mist bg-paper transition-shadow hover:shadow-soft"
    >
      <div className="flex h-48 items-center justify-center bg-paper-soft p-6">
        <div className="flex h-full w-full items-center justify-center">
          <PresetPreview layout={preset.layout} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display font-semibold text-ink transition-colors group-hover:text-forest">
          {preset.naam}
        </h3>

        <div className="mt-4 flex items-end justify-between">
          <div>
            {SHOW_PRODUCT_PRICES ? (
              <>
                <p className="text-xs text-ink/45">vanaf (richtprijs, incl. btw)</p>
                <p className="font-display text-xl font-semibold text-ink">
                  {formatEuro(prijs)}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-ink/45">Volledig op maat</p>
                <p className="font-display text-base font-semibold text-ink">
                  {PRICE_ON_REQUEST}
                </p>
              </>
            )}
          </div>
          <span className="flex items-center gap-1.5 text-sm font-medium text-forest">
            Stel samen
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
