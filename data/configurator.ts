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

/**
 * Technische profielspecificaties (mm) — bron: Toeleveringonline / fabrikant.
 * Echte, verifieerbare maten (geen prijzen). De zichtbreedte (kozijnMm[0])
 * stuurt de profieldikte in de live tekening op ware schaal aan.
 */
export type ProfielSpecs = {
  /** Kozijnprofiel: zichtbreedte × inbouwdiepte in mm (bv. [90, 120]) */
  kozijnMm: [number, number];
  /** Inbouwdiepte in mm */
  inbouwdiepteMm: number;
  /** Raam-/vleugelprofiel: breedte × dikte in mm */
  raamMm?: [number, number];
  /** Deurprofiel (vrije omschrijving, mm) */
  deurMm?: string;
  /** Aanslag in mm */
  aanslagMm?: number;
  /** Glaslat-omschrijving */
  glaslat?: string;
  /** Aanvullende technische noot */
  noot?: string;
};

export type Profiel = {
  value: string;
  label: string;
  /** Korte merk-/voordeelregel voor de profieltegel */
  omschrijving?: string;
  /** Productbeeld/doorsnede (pad in /public). Bron: fabrikant/Toeleveringonline. */
  afbeelding?: string;
  specs?: ProfielSpecs;
};

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
      {
        value: "schuco-living",
        label: "Schüco Living",
        omschrijving: "Premium kunststof · 120 mm inbouwdiepte",
        specs: {
          kozijnMm: [90, 120],
          inbouwdiepteMm: 120,
          raamMm: [83, 82],
          deurMm: "76 mm (maatwerk); 110 × 82 mm naar buiten draaiend",
          aanslagMm: 20,
          glaslat: "Op maat van het glaspakket; onbeglaasd 29,5 × 28 mm",
          noot: "Tussenstijl 92 × 120 mm. Advies: stelkozijn 15–17 mm (speling 3–5 mm).",
        },
      },
      {
        value: "gealan-s9000",
        label: "Gealan S 9000",
        omschrijving: "Triple-dichting · 120 mm inbouwdiepte",
        afbeelding: "/profielen/gealan-s9000.webp",
        specs: {
          kozijnMm: [86, 120],
          inbouwdiepteMm: 120,
          raamMm: [82, 82.5],
          deurMm: "82,5 mm; 88 × 120 mm naar buiten draaiend",
          aanslagMm: 18,
          glaslat: "35 × 26 mm (24 mm glas)",
          noot: "Tussenstijl 94 × 120 mm. Drievoudige dichting.",
        },
      },
      {
        value: "schuco-easyslide",
        label: "Schüco EasySlide",
        omschrijving: "Schuifpui · 167 mm inbouwdiepte",
        afbeelding: "/profielen/schuco-easyslide.webp",
        specs: {
          kozijnMm: [60, 167],
          inbouwdiepteMm: 167,
          aanslagMm: 20,
          noot: "Schuifpui-systeem, RC2, thermische isolatie tot 1,5 W/m²K. Aluminium onderdorpel met thermische onderbreking.",
        },
      },
    ],
  },
  {
    value: "hout",
    label: "Hout",
    description: "Tijdloze uitstraling, duurzaam materiaal.",
    pricePerM2: 690,
    profielen: [
      {
        value: "mahonie",
        label: "Mahonie 67 × 114",
        omschrijving: "Hardhout · 114 mm inbouwdiepte",
        afbeelding: "/profielen/mahonie.webp",
        specs: {
          kozijnMm: [67, 114],
          inbouwdiepteMm: 114,
          raamMm: [69, 90],
          noot: "Tussenstijl/-dorpel 90 × 114 mm; schuifpui-kozijnhout 67 × 138 mm.",
        },
      },
      { value: "eu-naaldhout", label: "Europees naaldhout (FSC)", omschrijving: "Duurzaam naaldhout" },
    ],
  },
  {
    value: "aluminium",
    label: "Aluminium",
    description: "Slanke profielen, minimaal onderhoud.",
    pricePerM2: 820,
    profielen: [
      {
        value: "reynaers-sl38",
        label: "Reynaers SL 38",
        omschrijving: "Zeer slank · 52 mm zichtbreedte",
        afbeelding: "/profielen/reynaers-sl38.webp",
        specs: {
          kozijnMm: [52, 76],
          inbouwdiepteMm: 76,
          raamMm: [53.5, 86],
          deurMm: "82 × 86 mm",
          noot: "Tussenstijl/-dorpel 52 mm. Onderdorpel deur 18 mm (laag reliëf).",
        },
      },
      {
        value: "aluprof-mb79",
        label: "Aluprof MB-79N",
        omschrijving: "Thermisch onderbroken · 70 mm inbouwdiepte",
        afbeelding: "/profielen/aluprof/mb-79n-doorsnede-si.webp",
        specs: {
          kozijnMm: [75.5, 70],
          inbouwdiepteMm: 70,
          raamMm: [33.5, 79],
          deurMm: "69,5 × 70 mm",
          aanslagMm: 25,
          noot: "Tussenstijl/-dorpel 75,5 mm. Onderdorpel deur 10 mm (laag reliëf).",
        },
      },
      { value: "schuco-aws", label: "Schüco AWS 75", omschrijving: "Aluminium raamsysteem" },
    ],
  },
];

/** Zoekt het geselecteerde profiel binnen een materiaal. */
export function findProfiel(materiaal?: string, profiel?: string): Profiel | undefined {
  const mat = CONFIG_MATERIALEN.find((m) => m.value === materiaal);
  return mat?.profielen.find((p) => p.value === profiel);
}

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
