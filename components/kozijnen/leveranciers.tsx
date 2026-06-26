import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { LEVERANCIERS } from "@/data/kozijnen-gids";

/**
 * Leverancierssectie: per fabrikant een korte introductie, een (placeholder)
 * logo en een knop naar de officiële website. Externe links openen automatisch
 * in een nieuw tabblad (zie Button: externe href ⇒ target/rel).
 */
export function LeveranciersSectie() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {LEVERANCIERS.map((lev) => (
        <div key={lev.naam} className="flex flex-col rounded-card border border-mist bg-paper p-6">
          {/* TODO: officieel logo toevoegen zodra beschikbaar. */}
          <Placeholder label={`Logo ${lev.naam}`} className="mb-4 min-h-16" />
          <h3 className="text-lg font-medium text-ink">{lev.naam}</h3>
          <p className="mt-2 grow leading-relaxed text-ink/70">{lev.intro}</p>
          <div className="mt-4">
            <Button href={lev.url} variant="secondary" size="sm">
              Bezoek officiële website
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
