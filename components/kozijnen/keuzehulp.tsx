import { KEUZEHULP } from "@/data/kozijnen-gids";

/**
 * Korte keuzehulp: per woon-/wenssituatie een concreet materiaaladvies.
 */
export function Keuzehulp() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {KEUZEHULP.map((item) => (
        <div key={item.situatie} className="rounded-card border border-mist bg-paper p-6">
          <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-ink/60">
            <span aria-hidden className="h-3.5 w-1 rounded-full bg-lime" />
            {item.situatie}
          </p>
          <p className="mt-3 leading-relaxed text-ink/75">{item.advies}</p>
        </div>
      ))}
    </div>
  );
}
