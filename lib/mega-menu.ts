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

export type MegaGroup = {
  label: string;
  links: MegaLink[];
  trustPoints: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const megaGroups: MegaGroup[] = [
  {
    label: "Kozijnen",
    links: [
      {
        label: "Ramen",
        href: "/producten/ramen",
        description: "Draaikiep-, vaste en valramen — direct samenstellen.",
      },
      {
        label: "Deuren",
        href: "/producten/deuren",
        description: "Voordeuren, achterdeuren en tuindeuren op maat.",
      },
      {
        label: "Schuifpuien",
        href: "/producten/schuifpuien",
        description: "Schuifpuien en vouwwanden voor maximaal licht.",
      },
      {
        label: "Kunststof kozijnen",
        href: "/kunststof-kozijnen",
        description: "Onderhoudsvriendelijk en energiezuinig.",
      },
      {
        label: "Houten kozijnen",
        href: "/houten-kozijnen",
        description: "Tijdloze uitstraling, duurzaam materiaal.",
      },
      {
        label: "Aluminium kozijnen",
        href: "/aluminium-kozijnen",
        description: "Slanke profielen, minimaal onderhoud.",
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
