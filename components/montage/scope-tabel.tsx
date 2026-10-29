import { MONTAGE_SCOPE, SCOPE_STATUS_LABEL } from "@/data/montage-scope";
import { isVerified } from "@/data/feiten";

/**
 * Readable HTML table of what montage involves. The status column (included /
 * option / depends) only appears once feit "montagescope" is verified.
 */
export function ScopeTabel({ ids }: { ids?: string[] }) {
  const rows = ids ? MONTAGE_SCOPE.filter((r) => ids.includes(r.id)) : MONTAGE_SCOPE;
  const metStatus = isVerified("montagescope");
  return (
    <div className="overflow-x-auto rounded-card border border-mist bg-paper">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <caption className="sr-only">Onderdelen van het monteren van kozijnen</caption>
        <thead>
          <tr className="border-b border-mist bg-paper-soft text-xs uppercase tracking-widest text-ink/60">
            <th scope="col" className="px-5 py-3 font-semibold">Onderdeel</th>
            <th scope="col" className="px-5 py-3 font-semibold">Wat het inhoudt</th>
            {metStatus && (
              <th scope="col" className="px-5 py-3 font-semibold">In je voorstel</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-mist align-top last:border-0">
              <th scope="row" className="px-5 py-3.5 font-medium text-ink">{r.onderdeel}</th>
              <td className="px-5 py-3.5 leading-relaxed text-ink/75">{r.uitleg}</td>
              {metStatus && (
                <td className="whitespace-nowrap px-5 py-3.5 text-ink/75">{SCOPE_STATUS_LABEL[r.status]}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
