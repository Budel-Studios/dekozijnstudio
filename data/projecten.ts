/**
 * Projects — the proof section (SEO-strategie 2026-10 (privé projectdocument), h8 "Projectpagina's").
 *
 * Only add a project when ALL of this is true:
 *  - it really exists and De Kozijnstudio (not only MTB Bouw) was the party
 *    that delivered it — set `uitvoerendePartij` truthfully;
 *  - the client gave permission for photos (and any quote) to be published;
 *  - photos are real photos of the work (never generated or stock images).
 * No exact house addresses or identifiable personal data.
 *
 * While this list is empty, /projecten and /projecten/<slug> return 404 and
 * are left out of navigation and sitemap.
 */

export type ProjectFoto = {
  src: string;
  alt: string;
  soort: "buiten" | "binnen" | "detail" | "voor";
};

export type Project = {
  slug: string;
  titel: string;
  /** Place at a sensible level of detail, e.g. "Enschede-Zuid" — never a street address. */
  plaats: string;
  woningtype: string;
  uitvoerendePartij: "De Kozijnstudio" | "De Kozijnstudio en MTB Bouw";
  klantvraag: string;
  uitgangssituatie: string;
  keuzes: string[];
  /** Why one notable choice was made — the plan asks for one difficult choice per case. */
  lastigeKeuze: string;
  product: string;
  montage: string;
  afwerking: string;
  resultaat: string;
  fotos: ProjectFoto[];
  /** Only with explicit permission. */
  klantreactie?: string;
  /** Only when permitted and specified enough to be meaningful. */
  prijsToelichting?: string;
  toestemmingOp: string;
  datum: string;
};

export const PROJECTEN: Project[] = [];

export function projectBySlug(slug: string) {
  return PROJECTEN.find((p) => p.slug === slug);
}
