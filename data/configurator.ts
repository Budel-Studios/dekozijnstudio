/**
 * Configurator price model — fully data-driven.
 *
 * ⚠️ PLACEHOLDER RICHTPRIJZEN (incl. btw).
 * De bedragen hieronder zijn INDICATIEF en dienen vóór livegang vervangen te
 * worden door echte tarieven. De configurator toont uitsluitend een richtprijs
 * met disclaimer — nooit een bindende prijs (CLAUDE.md: prijzen data-driven,
 * geen verzonnen content als feit; echte prijs volgt na inmeting).
 *
 * Het prijsmodel (zie lib/configurator-price.ts) is: basis + per-onderdeel +
 * opties, alles incl. btw.
 */

export type Profiel = { value: string; label: string };

export type MateriaalOptie = {
  value: string;
  label: string;
  description: string;
  /** Richtprijs per m² (incl. btw) — PLACEHOLDER */
  pricePerM2: number;
  profielen: Profiel[];
};

export const CONFIG_MATERIALEN: MateriaalOptie[] = [
  {
    value: "kunststof",
    label: "Kunststof",
    description: "Onderhoudsvriendelijk en energiezuinig.",
    pricePerM2: 480,
    profielen: [
      { value: "schuco-living", label: "Schüco Living" },
      { value: "schuco-ct70", label: "Schüco CT 70" },
      { value: "gealan-s9000", label: "Gealan S 9000" },
    ],
  },
  {
    value: "hout",
    label: "Hout",
    description: "Tijdloze uitstraling, duurzaam materiaal.",
    pricePerM2: 690,
    profielen: [
      { value: "meranti", label: "Meranti (hardhout)" },
      { value: "eu-naaldhout", label: "Europees naaldhout (FSC)" },
    ],
  },
  {
    value: "aluminium",
    label: "Aluminium",
    description: "Slanke profielen, minimaal onderhoud.",
    pricePerM2: 820,
    profielen: [
      { value: "schuco-aws", label: "Schüco AWS 75" },
      { value: "aluprof-mb70", label: "Aluprof MB-70" },
      { value: "reynaers-masterline", label: "Reynaers MasterLine 8" },
    ],
  },
];

export type ProducttypeOptie = {
  value: string;
  label: string;
  /** Complexiteitsfactor op de materiaalkosten — PLACEHOLDER */
  factor: number;
  /** Offerteformulier-equivalent (fase 4 enum) voor prefill */
  offerteType: string;
};

export const CONFIG_PRODUCTTYPES: ProducttypeOptie[] = [
  { value: "vast-raam", label: "Vast raam", factor: 1.0, offerteType: "vaste-ramen" },
  { value: "draaikiep", label: "Draaikiepraam", factor: 1.2, offerteType: "draaikiepramen" },
  { value: "valraam", label: "Valraam", factor: 1.1, offerteType: "draaikiepramen" },
  { value: "voordeur", label: "Voordeur", factor: 1.6, offerteType: "voordeur" },
  { value: "achterdeur", label: "Achterdeur", factor: 1.45, offerteType: "achterdeur" },
  { value: "tuindeur", label: "Tuindeuren (dubbel)", factor: 1.7, offerteType: "achterdeur" },
  { value: "schuifpui", label: "Schuifpui", factor: 1.7, offerteType: "schuifpui" },
  { value: "vouwwand", label: "Vouwwand", factor: 1.85, offerteType: "schuifpui" },
];

export type GlasOptie = {
  value: string;
  label: string;
  description: string;
  /** Meerprijs per m² t.o.v. basis (incl. btw) — PLACEHOLDER */
  pricePerM2: number;
};

export const CONFIG_GLAS: GlasOptie[] = [
  {
    value: "hr-plus",
    label: "HR++ glas",
    description: "Uitstekende isolatie, standaard keuze. In aanmerking voor ISDE.",
    pricePerM2: 0,
  },
  {
    value: "triple",
    label: "Triple glas",
    description: "Maximale isolatie en geluidsdemping. Ook ISDE-subsidiabel.",
    pricePerM2: 75,
  },
];

export type KleurCategorie = "standaard" | "ral" | "hout";

export type KleurOptie = {
  value: string;
  label: string;
  /** Weergavekleur van het kozijnprofiel in de tekening */
  hex: string;
  ral?: string;
  category: KleurCategorie;
  /** Toeslag als percentage op (materiaal + glas) — PLACEHOLDER */
  surchargePct: number;
};

export const KLEUR_CATEGORIE_LABEL: Record<KleurCategorie, string> = {
  standaard: "Standaard",
  ral: "RAL-kleuren",
  hout: "Houtstructuur",
};

export const CONFIG_KLEUREN: KleurOptie[] = [
  // Standaard (geen toeslag)
  { value: "wit", label: "Wit", hex: "#f2f2ec", ral: "RAL 9010", category: "standaard", surchargePct: 0 },
  { value: "creme", label: "Crèmewit", hex: "#e7e0cf", ral: "RAL 9001", category: "standaard", surchargePct: 0 },
  // RAL-kleuren (toeslag)
  { value: "antraciet", label: "Antraciet", hex: "#373d42", ral: "RAL 7016", category: "ral", surchargePct: 0.12 },
  { value: "zwart", label: "Zwart", hex: "#1c1c1c", ral: "RAL 9005", category: "ral", surchargePct: 0.12 },
  { value: "basaltgrijs", label: "Basaltgrijs", hex: "#565d61", ral: "RAL 7012", category: "ral", surchargePct: 0.12 },
  { value: "dennengroen", label: "Dennengroen", hex: "#2c382a", ral: "RAL 6009", category: "ral", surchargePct: 0.12 },
  { value: "staalblauw", label: "Staalblauw", hex: "#28384a", ral: "RAL 5011", category: "ral", surchargePct: 0.12 },
  // Houtstructuur / folie (hogere toeslag)
  { value: "golden-oak", label: "Golden Oak", hex: "#93612f", category: "hout", surchargePct: 0.18 },
  { value: "noten", label: "Noten", hex: "#4f3320", category: "hout", surchargePct: 0.18 },
  { value: "mahonie", label: "Mahonie", hex: "#6b2c22", category: "hout", surchargePct: 0.18 },
];

/** Profieldikte-factor per materiaal (aandeel van de kleinste maat in de tekening). */
export const PROFIEL_DIKTE: Record<string, number> = {
  kunststof: 0.075,
  hout: 0.07,
  aluminium: 0.045,
};

export type OptieToggle = {
  value: string;
  label: string;
  description: string;
  /** Vaste meerprijs per kozijn (incl. btw) — PLACEHOLDER */
  pricePerUnit: number;
};

export const CONFIG_OPTIES: OptieToggle[] = [
  { value: "hor", label: "Inzethor", description: "Per raam, afneembaar.", pricePerUnit: 55 },
  { value: "rc2", label: "Inbraakwerend beslag (RC2)", description: "Politiekeurmerk Veilig Wonen.", pricePerUnit: 95 },
  { value: "ventilatie", label: "Ventilatierooster", description: "Voor gezonde luchtcirculatie.", pricePerUnit: 75 },
];

export type UitvoeringOptie = {
  value: "montage" | "levering";
  label: string;
  description: string;
  /** Montagekosten per kozijn (incl. btw) — PLACEHOLDER */
  pricePerUnit: number;
  /** Offerteformulier-equivalent (fase 4 enum) */
  offerteType: string;
};

export const CONFIG_UITVOERING: UitvoeringOptie[] = [
  {
    value: "montage",
    label: "Inclusief montage",
    description: "Onze monteurs plaatsen de kozijnen vakkundig.",
    pricePerUnit: 175,
    offerteType: "montage",
  },
  {
    value: "levering",
    label: "Alleen levering (DIY)",
    description: "U plaatst zelf, wij leveren aan huis.",
    pricePerUnit: 0,
    offerteType: "levering",
  },
];

// ─── Draairichting, hang- en sluitwerk, ventilatie ───────────────────────────

/** Producttypes waarvoor een draairichting relevant is (draaiend deel). */
export const DRAAIRICHTING_TYPES = ["draaikiep", "valraam", "voordeur", "achterdeur", "tuindeur"];

export const CONFIG_DRAAIRICHTING = [
  { value: "links", label: "Draairichting links", description: "Scharnieren links (van buitenaf gezien)." },
  { value: "rechts", label: "Draairichting rechts", description: "Scharnieren rechts (van buitenaf gezien)." },
] as const;

/** Hang- en sluitwerk: kleur van grepen/scharnieren. */
export const CONFIG_HANGSLUIT = [
  { value: "zwart", label: "Zwart", description: "Mat zwart hang- en sluitwerk." },
  { value: "blank", label: "Blank geanodiseerd", description: "Zilverkleurig geanodiseerd." },
] as const;

/** Positie van het ventilatierooster in het glasvlak. */
export const CONFIG_VENTILATIE_POSITIE = [
  { value: "boven", label: "Bovenin het glasvlak" },
  { value: "onder", label: "Onderin het glasvlak" },
] as const;

// Afmetingsgrenzen (cm)
export const SIZE_LIMITS = {
  breedte: { min: 30, max: 600, default: 100 },
  hoogte: { min: 30, max: 300, default: 120 },
  aantal: { min: 1, max: 50, default: 1 },
};
