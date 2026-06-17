/**
 * Mega menu data — one entry per header dropdown group.
 * Descriptions and trust points are nl-NL placeholders for fase 1;
 * real copy arrives in fase 2. Trust points communicate the three brand
 * pillars (transparent prices, full service, together saving) immediately.
 */

export type MegaLink = {
  label: string;
  href: string;
  description: string;
};

export type MegaColumn = {
  heading: string;
  links: MegaLink[];
};

export type MegaGroup = {
  label: string;
  /** Flat link list (gebruikt als `columns` niet is opgegeven). */
  links?: MegaLink[];
  /** Optioneel: gelabelde subkolommen (bijv. Type kozijn / Per materiaal). */
  columns?: MegaColumn[];
  trustPoints: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const megaGroups: MegaGroup[] = [
  {
    label: "Kozijnen",
    columns: [
      {
        heading: "Type kozijn",
        links: [
          { label: "Ramen", href: "/producten/ramen", description: "Draaikiep-, vaste en valramen." },
          { label: "Deuren", href: "/producten/deuren", description: "Voor-, achter- en tuindeuren." },
          { label: "Schuif & harmonica", href: "/producten/schuifpuien", description: "Schuifpuien en vouwwanden." },
        ],
      },
      {
        heading: "Per materiaal",
        links: [
          { label: "Houten kozijnen", href: "/houten-kozijnen", description: "Tijdloos en duurzaam." },
          { label: "Kunststof kozijnen", href: "/kunststof-kozijnen", description: "Onderhoudsvriendelijk." },
          { label: "Aluminium kozijnen", href: "/aluminium-kozijnen", description: "Slank, minimaal onderhoud." },
        ],
      },
    ],
    trustPoints: [
      "Prijs altijd incl. btw, geen verborgen kosten",
      "Levering vanaf ± 8 weken na opmeting",
      "Inmeetservice € 49 — volledig verrekend",
      "Compleet ontzorgd via MTB Bouw",
    ],
    ctaLabel: "Alle producten bekijken",
    ctaHref: "/producten",
  },
  {
    label: "Diensten",
    links: [
      {
        label: "Montage",
        href: "/montage",
        description:
          "Vakkundige plaatsing door onze eigen monteurs — placeholder.",
      },
      {
        label: "Zelf plaatsen (DIY)",
        href: "/diy",
        description:
          "Levering aan huis met stap-voor-stap begeleiding — placeholder.",
      },
      {
        label: "Bouwkundige aanpassingen",
        href: "/bouwkundige-aanpassingen",
        description:
          "Opening vergroten, latei, metselwerk — alles onder één dak.",
      },
      {
        label: "MTB Bouw — renovatie & verbouw",
        href: "/mtb-bouw",
        description:
          "Ons moederbedrijf en betrouwbare bouwpartner voor groter werk.",
      },
    ],
    trustPoints: [
      "Eén bedrijf, één planning, één aanspreekpunt",
      "Montage doorgaans binnen één week",
      "Meerdere kozijnen per dag — minimale overlast",
      "Bouwkundig werk via MTB Bouw",
    ],
    ctaLabel: "Bekijk diensten",
    ctaHref: "/montage",
  },
];
