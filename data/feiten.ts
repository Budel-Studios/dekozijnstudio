/**
 * Feitenregister — every business claim that may appear on the public site.
 *
 * Rule (docs/seo-strategie-2026-10.md, h17): a claim is only rendered when its
 * status is "verified". Claims with "needs_confirmation" stay in this register
 * (so nobody forgets them) but are hidden from public pages. Flip the status to
 * "verified" — and fill in `bron` + `gecontroleerd` — to make a claim visible
 * everywhere it is used. Never invent values here.
 *
 * Usage in components:  `feit("inmeetservice")` → tekst | null
 *                       `isVerified("levertijd")` → boolean
 */

export type FeitStatus = "verified" | "needs_confirmation";

export type Feit = {
  /** Publieke formulering, precies zoals die op de site mag staan. */
  tekst: string;
  status: FeitStatus;
  /** Waar het feit op gebaseerd is (document, prijslijst, besluit eigenaar). */
  bron: string;
  eigenaar: string;
  /** ISO-datum van de laatste controle; null = nooit bevestigd. */
  gecontroleerd: string | null;
  /** Interne toelichting — wordt nooit gerenderd. */
  notitie?: string;
};

export const FEITEN = {
  inmeetservice: {
    tekst: "Inmeetservice € 49, verrekend bij opdracht",
    status: "needs_confirmation",
    bron: "Concept uit eerdere gesprekken; staat ook als regel in data/montage-prijslijst.json",
    eigenaar: "Robbert",
    gecontroleerd: null,
    notitie: "Bevestig bedrag en verrekening. Tot dan: geen prijsbelofte voor inmeten op de site.",
  },
  levertijd: {
    tekst: "Levertijd maatwerk vanaf ± 8 weken na inmeting en akkoord",
    status: "needs_confirmation",
    bron: "Concept uit eerdere gesprekken",
    eigenaar: "Robbert",
    gecontroleerd: null,
  },
  montageduur: {
    tekst: "Montage meestal binnen één week, meerdere kozijnen per dag",
    status: "needs_confirmation",
    bron: "Concept uit eerdere gesprekken",
    eigenaar: "Robbert",
    gecontroleerd: null,
    notitie: "Plan: geen universele belofte 'binnen één dag/week' zonder echte uitvoeringsafspraken.",
  },
  montageDoorMtb: {
    tekst: "De montage wordt uitgevoerd door het team van MTB Bouw",
    status: "needs_confirmation",
    bron: "Relatie met MTB Bouw; uitvoerende partij per opdracht nog vast te leggen",
    eigenaar: "Robbert",
    gecontroleerd: null,
    notitie: "Tot bevestiging neutraal formuleren ('wij regelen de montage').",
  },
  prijslijstMontage: {
    tekst: "Montagetarieven uit de eigen prijslijst (data/montage-prijslijst.json)",
    status: "needs_confirmation",
    bron: "data/montage-prijslijst.json, laatst bijgewerkt 2026-06-08",
    eigenaar: "Robbert",
    gecontroleerd: null,
    notitie:
      "Uitzondering: de configurator blijft deze tarieven tonen omdat de eigenaar de configurator actief hield (29-10-2026). Btw-tarief laten bevestigen door de administratie.",
  },
  profielen: {
    tekst: "Leverbare profielen: Schüco, Gealan, Aluprof, Reynaers en Sapeli mahonie",
    status: "needs_confirmation",
    bron: "data/configurator.ts + data/kozijnen-gids.ts (fabrikantinformatie)",
    eigenaar: "Robbert",
    gecontroleerd: null,
    notitie:
      "Geen dealerstatus of keurmerken (KOMO, SKG, PKVW) claimen zonder productbron. Configurator en kozijnengids blijven actief op verzoek eigenaar.",
  },
  montagescope: {
    tekst: "Per onderdeel aangegeven wat bij de montage hoort, wat een optie is en wat van de situatie afhangt",
    status: "needs_confirmation",
    bron: "Voorstel in data/montage-scope.ts, afgeleid van data/montage-prijslijst.json (defaultOn)",
    eigenaar: "Robbert",
    gecontroleerd: null,
    notitie: "Controleer de status per onderdeel in data/montage-scope.ts en zet dan op verified.",
  },
  reactietermijn: {
    tekst: "We reageren binnen één werkdag",
    status: "needs_confirmation",
    bron: "Niet operationeel bevestigd",
    eigenaar: "Robbert",
    gecontroleerd: null,
  },
  offertetermijn: {
    tekst: "Je voorstel binnen vijf werkdagen na inmeting",
    status: "needs_confirmation",
    bron: "Niet operationeel bevestigd",
    eigenaar: "Robbert",
    gecontroleerd: null,
  },
  bezoekOpAfspraak: {
    tekst: "Bezoek alleen op afspraak, Heersenkampweg 5 in Enschede",
    status: "verified",
    bron: "Keuze eigenaar: MTB Bouw-gegevens voor nu (CLAUDE.md, bedrijfsgegevens)",
    eigenaar: "Robbert",
    gecontroleerd: "2026-07-01",
  },
  handelsnaam: {
    tekst: "De Kozijnstudio is een handelsnaam van MTB Bouw B.V.",
    status: "verified",
    bron: "data/company.ts (keuze eigenaar)",
    eigenaar: "Robbert",
    gecontroleerd: "2026-07-01",
  },
} satisfies Record<string, Feit>;

export type FeitKey = keyof typeof FEITEN;

export function isVerified(key: FeitKey): boolean {
  return FEITEN[key].status === "verified";
}

/** Public text of a claim, or null when it may not be shown yet. */
export function feit(key: FeitKey): string | null {
  return isVerified(key) ? FEITEN[key].tekst : null;
}

/** Claims that still block or limit the public release — used in docs/checks. */
export function openFeiten() {
  return (Object.keys(FEITEN) as FeitKey[]).filter((k) => !isVerified(k));
}
