import Link from "next/link";
import { KozijnPreview } from "@/components/configurator/kozijn-preview";
import { ArrowRightIcon } from "@/components/icons";
import { formatEuro, type KozijnConfig } from "@/lib/configurator-price";
import { vanafPrice, type CatalogProduct } from "@/data/catalog";

/**
 * Webshop-achtige productkaart.
 * Het "productbeeld" is de live configurator-tekening (kunststof, wit, HR++)
 * zodat elk product zonder foto al herkenbaar is. Klik = naar de configurator
 * met dit producttype voorgeselecteerd.
 */
export function ProductCard({ product }: { product: CatalogProduct }) {
  const previewConfig: KozijnConfig = {
    materiaal: "kunststof",
    producttype: product.configType,
    breedteCm: product.baseBreedte,
    hoogteCm: product.baseHoogte,
    aantal: 1,
    glas: "hr-plus",
    kleur: "wit",
    opties: [],
    uitvoering: "levering",
  };

  const prijs = vanafPrice(product);

  return (
    <Link
      href={`/configurator?type=${product.configType}`}
      className="group flex flex-col overflow-hidden rounded-card border border-mist bg-paper transition-shadow hover:shadow-soft"
    >
      <div className="flex items-center justify-center bg-paper-soft p-6">
        <div className="w-full max-w-[220px]">
          <KozijnPreview config={previewConfig} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display font-semibold text-ink transition-colors group-hover:text-forest">
          {product.name}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink/60">
          {product.description}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-ink/45">vanaf (richtprijs, incl. btw)</p>
            <p className="font-display text-xl font-semibold text-ink">
              {formatEuro(prijs)}
            </p>
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
