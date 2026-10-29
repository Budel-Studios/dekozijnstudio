/**
 * Price data — single source of truth for all price displays.
 * RULES (CLAUDE.md):
 *  - All consumer prices MUST be incl. btw.
 *  - "Vanaf" (indicative) prices must be flagged with `from: true`.
 *  - No prices may be hardcoded inside UI components — import from here.
 *  - Update here when rates change; components auto-update.
 *
 * Prices marked `placeholder: true` are indicative and must be replaced
 * with real rates before going live.
 */

export type PriceEntry = {
  label: string;
  price: string;
  from?: boolean;
  note?: string;
  placeholder?: boolean;
};

export type PriceCategory = {
  id: string;
  title: string;
  rows: PriceEntry[];
  footnote?: string;
};

// ─── Betaalmodel ─────────────────────────────────────────────────────────────

/**
 * Aandeel van de KOZIJNPRIJS dat als aanbetaling wordt gevraagd bij opdracht,
 * voor de maatwerkproductie. Naar de klant altijd zo benoemen: "aanbetaling
 * voor maatwerkproductie". Het restant (resterend kozijndeel + montage) wordt
 * bij oplevering voldaan.
 */
export const AANBETALING_KOZIJN_AANDEEL = 0.8;

// ─── Vaste bekende prijzen ───────────────────────────────────────────────────

export const inmeetservice: PriceEntry = {
  label: "Inmeetservice",
  price: "€ 49",
  note: "Volledig verrekend bij doorgang van de opdracht.",
};

// ─── Montagetarieven (indicatief — CMS-driven in productie) ─────────────────

export const montageCategories: PriceCategory[] = [
  {
    id: "montage-basis",
    title: "Montage — indicatieve tarieven",
    rows: [
      {
        label: "Standaard raam of draaikiepraam",
        price: "op aanvraag",
        from: true,
        note: "Afhankelijk van maat, situatie en bouwkundige staat.",
        placeholder: true,
      },
      {
        label: "Voordeur of achterdeur",
        price: "op aanvraag",
        from: true,
        placeholder: true,
      },
      {
        label: "Schuifpui of vouwwand",
        price: "op aanvraag",
        from: true,
        placeholder: true,
      },
      {
        label: "Levering zonder montage (DIY)",
        price: "op aanvraag",
        from: true,
        note: "Levering inclusief montage-instructieset.",
        placeholder: true,
      },
    ],
    footnote:
      "Richtprijzen incl. btw. Exacte kosten worden vermeld in uw persoonlijke offerte na de inmeetservice (€ 49, verrekend bij doorgang). Prijzen zijn afhankelijk van de specifieke situatie, het gekozen profiel en eventuele bouwkundige aanpassingen.",
  },
  {
    id: "bouwkundig",
    title: "Bouwkundige aanpassingen — indicatieve meerprijs",
    rows: [
      {
        label: "Opening vergroten (inclusief latei)",
        price: "op aanvraag",
        from: true,
        placeholder: true,
      },
      {
        label: "Metselwerk aanpassen of aanvullen",
        price: "op aanvraag",
        from: true,
        placeholder: true,
      },
      {
        label: "Binnenafwerking stuc/dorpel",
        price: "op aanvraag",
        from: true,
        placeholder: true,
      },
    ],
    footnote:
      "Bouwkundige aanpassingen worden uitgevoerd door MTB Bouw. Altijd incl. btw.",
  },
];

// ─── Investering-overzicht (voor de prijzenpagina) ───────────────────────────

export const investmentExample: PriceEntry[] = [
  { label: "Kozijnen (materiaal + productie)", price: "op aanvraag", from: true, placeholder: true },
  { label: "Montage", price: "op aanvraag", from: true, placeholder: true },
  { label: "Inmeetservice", price: "€ 49", note: "Verrekend bij doorgang" },
  { label: "Eventuele bouwkundige aanpassingen", price: "op aanvraag", from: true, placeholder: true },
  { label: "ISDE-subsidie (indicatief)", price: "zie subsidie-pagina", note: "Afhankelijk van oppervlak en situatie", placeholder: true },
];
