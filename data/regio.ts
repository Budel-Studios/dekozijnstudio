/**
 * Lokale SEO-landingspagina's — content per regio/plaats.
 *
 * Elke entry voedt één landingspagina (bv. /kozijnen-twente) via de
 * RegioPaginaTemplate. Belangrijk: content is per pagina UNIEK geschreven
 * (geen gedeelde alinea's) om dunne doorway-pages te voorkomen. Teksten
 * noemen doelkeywords natuurlijk; geen prijzen/bedragen behalve de vaste
 * inmeetservice (€ 49, CMS-instelbaar feit uit CLAUDE.md).
 *
 * Nieuwe plaats toevoegen = één entry hier + een dun page-bestand
 * (app/kozijnen-<plaats>/page.tsx) + sitemap-regel + footerlink.
 */

export type RegioPagina = {
  slug: string;
  naam: string;
  soort: "regio" | "plaats";
  metaTitle: string;
  metaDescription: string;
  heroTitel: string;
  heroLead: string;
  lokaleUsps: string[];
  /** Bediende plaatsen — getoond als chips onder "Werkgebied". */
  plaatsen: string[];
  /** Unieke lokale alinea's (2–3) — regio- of stadscontext. */
  lokaleContext: string[];
  /** Lokale FAQ — voedt zowel de FAQ-sectie als het FAQPage-schema. */
  faq: Array<{ question: string; answer: string }>;
};

export const REGIO_PAGINAS: RegioPagina[] = [
  {
    slug: "kozijnen-twente",
    naam: "Twente",
    soort: "regio",
    metaTitle: "Kozijnen in Twente | kunststof, hout & aluminium op maat",
    metaDescription:
      "Kozijnen kopen in Twente? Kunststof, houten en aluminium kozijnen op maat, incl. montage door eigen monteurs. Transparante prijzen incl. btw. Vraag een offerte aan.",
    heroTitel: "Kozijnen in Twente — op maat, transparant en dichtbij",
    heroLead:
      "De Kozijnstudio is dé kozijnleverancier van Twente. Kunststof, houten en aluminium kozijnen op maat, geplaatst door eigen monteurs uit de regio — met transparante prijzen incl. btw en één aanspreekpunt via ons moederbedrijf MTB Bouw.",
    lokaleUsps: [
      "Eigen monteurs uit Twente — korte lijnen, snel ter plaatse",
      "Transparante prijzen incl. btw, geen verborgen kosten",
      "Inmeetservice € 49 — volledig verrekend bij doorgang",
      "Montage doorgaans binnen één week, meerdere kozijnen per dag",
      "Bouwkundig werk (openingen vergroten, lateien) via MTB Bouw",
      "ISDE-subsidie: wij rekenen de indicatie voor u mee",
    ],
    plaatsen: [
      "Enschede",
      "Hengelo",
      "Almelo",
      "Oldenzaal",
      "Losser",
      "Haaksbergen",
      "Borne",
      "Rijssen",
      "Wierden",
      "Denekamp",
    ],
    lokaleContext: [
      "Twente kent een gevarieerde woningvoorraad: van karakteristieke boerderijen en jaren-30-woningen tot naoorlogse rijwoningen en moderne nieuwbouw. Dat vraagt om maatwerk per woning — een monumentaal pand in het buitengebied stelt andere eisen aan kozijnen dan een tussenwoning in de stad. Omdat wij uit de regio komen, kennen we deze bouwstijlen door en door en adviseren we welk materiaal en profiel bij uw woning past.",
      "Doordat ons werkgebied compact is, plannen we efficiënt: inmeten, leveren en monteren gebeurt door hetzelfde team, en bij meerdere kozijnen plaatsen we er meerdere per dag om de overlast te beperken. Voor bouwkundige aanpassingen — een opening vergroten, een nieuwe latei of metselwerk — schakelen we naadloos ons moederbedrijf MTB Bouw in. Eén bedrijf, één planning, één verantwoordelijkheid.",
    ],
    faq: [
      {
        question: "In welke plaatsen in Twente plaatsen jullie kozijnen?",
        answer:
          "In heel Twente, waaronder Enschede, Hengelo, Almelo, Oldenzaal, Losser, Haaksbergen, Borne, Rijssen en omliggende dorpen. Ook net buiten Twente denken we graag mee — neem gerust contact op.",
      },
      {
        question: "Wat kosten nieuwe kozijnen in Twente?",
        answer:
          "Dat hangt af van materiaal, afmeting, glas en montage. Wij werken met transparante richtprijzen incl. btw — bekijk de prijzenpagina of stel uw kozijn samen in de configurator voor een directe indicatie. De definitieve prijs volgt na de inmeetservice (€ 49, verrekend bij doorgang).",
      },
      {
        question: "Hoe snel kunnen jullie in Twente leveren en monteren?",
        answer:
          "De levertijd van maatwerk kozijnen is vanaf circa 8 weken na de opmeting. De montage zelf duurt doorgaans minder dan een week; meerdere kozijnen plaatsen we op één dag.",
      },
      {
        question: "Doen jullie ook het bouwkundige werk?",
        answer:
          "Ja. Via ons moederbedrijf MTB Bouw verzorgen wij ook openingen vergroten, lateien, metselwerk en binnenafwerking — alles in één planning en met één aanspreekpunt.",
      },
      {
        question: "Kan ik ISDE-subsidie krijgen op kozijnen in Twente?",
        answer:
          "Bij vervanging van enkel- of dubbelglas door HR++ of triple glas kunt u in aanmerking komen voor de landelijke ISDE-subsidie. De regels worden jaarlijks bijgesteld; wij vermelden altijd een indicatie op basis van de actuele voorwaarden en helpen bij de aanvraag.",
      },
    ],
  },
  {
    slug: "kozijnen-enschede",
    naam: "Enschede",
    soort: "plaats",
    metaTitle: "Kozijnen in Enschede | op maat geleverd en gemonteerd",
    metaDescription:
      "Nieuwe kozijnen in Enschede: kunststof, hout of aluminium, op maat en vakkundig gemonteerd. Eerlijke prijzen incl. btw en hulp bij ISDE-subsidie. Plan een inmeetafspraak.",
    heroTitel: "Kozijnen in Enschede — voor elke woning en elke wijk",
    heroLead:
      "Van jaren-30-woning tot nieuwbouw: De Kozijnstudio levert en monteert kunststof, houten en aluminium kozijnen in heel Enschede. Eerlijke prijzen incl. btw, vakkundige montage en hulp bij de ISDE-subsidie.",
    lokaleUsps: [
      "Actief in alle Enschedese wijken en Glanerbrug",
      "Advies op maat per woningtype — van vooroorlogs tot nieuwbouw",
      "Prijzen altijd incl. btw, vooraf gespecificeerd",
      "Inmeetservice € 49 — volledig verrekend bij doorgang",
      "Eén aanspreekpunt, ook voor bouwkundig werk (MTB Bouw)",
      "Hulp bij ISDE-subsidie, incl. indicatieberekening",
    ],
    plaatsen: [
      "Centrum",
      "Roombeek",
      "Twekkelerveld",
      "Stadsveld",
      "Hogeland",
      "Velve-Lindenhof",
      "Wesselerbrink",
      "Stroinkslanden",
      "Glanerbrug",
      "Lonneker",
    ],
    lokaleContext: [
      "Enschede heeft een bijzonder gemengde woningvoorraad. In vooroorlogse wijken staan veel karakteristieke jaren-20- en jaren-30-woningen met houten kozijnen en fijne roedeverdelingen — daar luistert de detaillering nauw en is hout of een kunststof profiel met authentieke uitstraling vaak de beste keuze. In de naoorlogse wijken in Zuid domineren rijwoningen waar onderhoudsarme kunststof kozijnen met HR++ of triple glas het meeste comfort- en energievoordeel opleveren.",
      "In nieuwere delen van de stad en bij moderne (ver)bouwprojecten kiezen bewoners juist vaak voor strakke aluminium kozijnen met veel glas. Welke situatie u ook heeft: we komen langs voor de inmeetservice, bekijken de bouwkundige staat ter plekke en maken een offerte waarin elk onderdeel — kozijn, glas, montage en eventueel bouwkundig werk — apart en incl. btw is gespecificeerd.",
    ],
    faq: [
      {
        question: "Plaatsen jullie kozijnen in heel Enschede?",
        answer:
          "Ja, in alle wijken — van het centrum en Roombeek tot Wesselerbrink, Stroinkslanden, Glanerbrug en Lonneker. Ook buurgemeenten zoals Hengelo, Oldenzaal, Losser en Haaksbergen horen bij ons werkgebied.",
      },
      {
        question: "Welke kozijnen passen bij een jaren-30-woning in Enschede?",
        answer:
          "Bij vooroorlogse woningen adviseren we vaak houten kozijnen (mahonie) of een kunststof profiel met verdiept, authentiek aanzicht en eventueel roeden — zo blijft het karakter van de gevel behouden terwijl u profiteert van moderne isolatie.",
      },
      {
        question: "Wat kost het vervangen van kozijnen in Enschede?",
        answer:
          "De prijs hangt af van materiaal, afmetingen, glaskeuze en montage. Onze richtprijzen staan incl. btw op de prijzenpagina en in de configurator. Na de inmeetservice (€ 49, verrekend bij doorgang) ontvangt u een volledig gespecificeerde offerte.",
      },
      {
        question: "Moet mijn muuropening aangepast worden — kan dat ook?",
        answer:
          "Ja. Openingen vergroten, een nieuwe latei plaatsen of metselwerk herstellen doen we via ons moederbedrijf MTB Bouw, in dezelfde planning als de kozijnmontage.",
      },
      {
        question: "Helpen jullie met de ISDE-subsidie in Enschede?",
        answer:
          "Ja. Vervangt u enkel- of dubbelglas door HR++ of triple glas, dan komt u mogelijk in aanmerking voor de landelijke ISDE-subsidie. Wij leveren de benodigde gegevens (zoals meldcodes en specificaties) aan en rekenen vooraf een indicatie voor u mee.",
      },
    ],
  },
];

export function regioBySlug(slug: string): RegioPagina | undefined {
  return REGIO_PAGINAS.find((r) => r.slug === slug);
}
