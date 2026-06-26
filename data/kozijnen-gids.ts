/**
 * Content voor de overkoepelende kozijnengids (/kozijnen).
 *
 * Volledig data-driven en losgekoppeld van de componenten. De prozaïsche
 * specificaties hieronder zijn in eigen woorden geschreven op basis van
 * publieke fabrikant-/leveranciersinformatie (Toeleveringonline e.a.); exacte
 * mm-maten komen single-source uit `data/configurator.ts` via `findProfiel`.
 *
 * ⚠️ Waar exacte technische waarden of garantietermijnen (nog) ontbreken, staat
 * een `TODO:`-waarde — die mag niet als feit worden gepresenteerd (CLAUDE.md).
 * Prijzen worden hier NIET genoemd; de vergelijkingstabel gebruikt enkel een
 * indicatieve prijsklasse (€ / €€ / €€€).
 */

export type SpecRow = {
  label: string;
  /** Mag "TODO: …" bevatten wanneer de exacte waarde nog ontbreekt. */
  waarde: string;
};

export type ProductGids = {
  id: string;
  /** Materiaalsleutel uit data/configurator.ts (kunststof | hout | aluminium). */
  materiaal: string;
  /** Profielsleutel uit data/configurator.ts voor de mm-maten (findProfiel). */
  profielValue?: string;
  titel: string;
  leverancier: string;
  leverancierUrl: string;
  /** Pad in /public; valt terug op een Placeholder als leeg. */
  afbeelding?: string;
  intro: string;
  /** Niet-dimensionele rubrieken; mm-maten komen uit findProfiel. */
  specs: SpecRow[];
};

// ─── Houten kozijnen ──────────────────────────────────────────────────────────

export const HOUT_PRODUCTEN: ProductGids[] = [
  {
    id: "mahonie",
    materiaal: "hout",
    profielValue: "mahonie",
    titel: "Mahonie houten kozijnen",
    leverancier: "Sapeli mahonie (hardhout)",
    leverancierUrl: "",
    afbeelding: "/profielen/mahonie.webp",
    intro:
      "Voor onze houten kozijnen werken wij met Sapeli mahonie: een warm, fijn van structuur hardhout met weinig houtporiën en nerven. Dat geeft een gladde, hoogwaardige afwerking en een stabiel kozijn dat jarenlang meegaat. Mahonie combineert een klassieke, natuurlijke uitstraling met de stevigheid die een goed kozijn nodig heeft.",
    specs: [
      {
        label: "Eigenschappen mahonie",
        waarde:
          "Sapeli mahonie hardhout — fijne nerf, weinig poriën, goede maatvastheid en een warme natuurlijke uitstraling. TODO: duurzaamheidsklasse + FSC-status bevestigen.",
      },
      {
        label: "Hang- en sluitwerk",
        waarde:
          "Beslag van o.a. AXA, GU, HABO, FUHR en Voslux. Draairaambeslag met remschaar en stormvaste vergrendeling; deuren met driepuntssluiting en kerntrekbeveiliging. Standaard aluminium F1, optioneel zwart (RAL 9005) of RVS. Voldoet aan het SKG**-keurmerk / Politiekeurmerk Veilig Wonen.",
      },
      {
        label: "Glas",
        waarde:
          "HR++ (U-waarde ± 1,1 W/m²K) of HR+++ triple (± 0,6 W/m²K). Houten glaslatten 17 × 17 mm. Doorvalveilig/gelaagd glas conform NEN 3569 en NEN 6702 leverbaar. Onbeglaasd geschikt tot ± 32 mm (triple tot ± 46 mm).",
      },
      {
        label: "Paneelvulling",
        waarde:
          "Geïsoleerd paneel: twee Trespa-platen (elk 3 mm) met een PIR-kern, volvlakverlijmd. Kerndikte 24 of 40 mm (U-waarde ± 1,1 resp. 0,6 W/m²K).",
      },
      {
        label: "Onderdorpels",
        waarde:
          "Houten onderdorpel (67 mm) of onderhoudsarme DTS TimberPlus (52 mm, biobased/circulair). Voor schuifpuien de Easy-Ent onderdorpel.",
      },
      {
        label: "Ventilatieroosters",
        waarde:
          "Zelfregulerende ventilatieroosters, opgenomen in het glasvlak. TODO: exacte typen/kleuren bevestigen.",
      },
      {
        label: "Scharnieren",
        waarde:
          "AXA opdek-veiligheidsscharnieren (Topcoat® verzinkt). Aantal scharnieren naar hoogte en gewicht, minimaal 3 per draaiend deel.",
      },
      {
        label: "Roeden",
        waarde: "TODO: roede-opties (opgeplakt / Wienersprosse / glas-in-lood) aanvullen.",
      },
      {
        label: "Garantie",
        waarde: "TODO: garantietermijnen houten kozijnen bevestigen (kozijn / beslag / beglazing / lakwerk).",
      },
      {
        label: "Detaillering",
        waarde:
          "Strakke profilering met fijne afwerking dankzij de gladde houtstructuur. Op maat geschilderd/gebeitst in de gewenste kleur. TODO: standaard profilering/afronding specificeren.",
      },
    ],
  },
];

// ─── Kunststof kozijnen ───────────────────────────────────────────────────────

export const KUNSTSTOF_PRODUCTEN: ProductGids[] = [
  {
    id: "gealan-s9000",
    materiaal: "kunststof",
    profielValue: "gealan-s9000",
    titel: "Gealan S 9000 NL",
    leverancier: "Gealan",
    leverancierUrl: "https://www.gealan.nl",
    afbeelding: "/profielen/gealan-s9000.webp",
    intro:
      "De Gealan S 9000 NL is een hoogwaardig kunststof profiel met een drievoudige dichting en uitstekende thermische eigenschappen. Een sterke prijs-kwaliteitkeuze voor zowel renovatie als nieuwbouw, met een breed scala aan kleuren.",
    specs: [
      {
        label: "Profiel",
        waarde:
          "Kunststof profiel met drievoudige dichting, KOMO-gecertificeerd. Tussenstijl 94 × 120 mm. TODO: aantal kamers + Uf-waarde bevestigen.",
      },
      {
        label: "Hang- en sluitwerk",
        waarde:
          "Verdekt liggend GU-beslag voor ramen; Hoppe Liège deurkrukken met kerntrekbeveiliging en driepuntssluiting. Standaard aluminium F1, optioneel zwart. SKG** / Politiekeurmerk Veilig Wonen.",
      },
      {
        label: "Kleuren",
        waarde:
          "Folie in glad, houtnerf of acryl. Binnen- en buitenzijde apart in te stellen. Het actuele kleurenpalet kies je in de configurator.",
      },
      {
        label: "Glas",
        waarde:
          "HR++ (4-16-4, U ± 1,1 W/m²K) of HR+++ triple (4-18-4-18-4, U ± 0,6 W/m²K). Glaslat 35 × 26 mm. Gelaagd/veiligheidsglas conform NEN 3569 en NEN 6702 leverbaar.",
      },
      {
        label: "Ventilatieroosters",
        waarde:
          "Zelfregulerende roosters die meebewegen met de luchtdruk, insectwerend. Kleuren: blank geanodiseerd (F1), wit (RAL 9010), crèmewit (RAL 9001) of antraciet (RAL 7016).",
      },
      {
        label: "Dorpels",
        waarde: "Onderdorpel op maat van de situatie. TODO: exacte dorpeltypen/materialen bevestigen.",
      },
      {
        label: "Roeden",
        waarde: "Roeden leverbaar. TODO: roede-typen (opgeplakt / Wienersprosse / tussen glas) bevestigen.",
      },
      {
        label: "Paneelvulling",
        waarde: "Geïsoleerde panelen leverbaar. TODO: diktes/kern bevestigen.",
      },
      {
        label: "Scharnieren",
        waarde:
          "Dr. Hahn KT-EV opdekscharnieren voor deuren (tot ± 120 kg, zesvoudig verstelbaar). Kleur passend bij het gekozen beslag (F1 of zwart).",
      },
      {
        label: "Garantie",
        waarde:
          "Kunststof kozijn 10 jaar, hang- en sluitwerk 2 jaar, beglazing en ventilatieroosters 10 jaar (bij correct gebruik en onderhoud).",
      },
      {
        label: "Detaillering",
        waarde:
          "KOMO-gecertificeerd op isolatie, geluid, sterkte en inbraakwerendheid. Strak profiel met drievoudige dichting voor optimaal comfort.",
      },
    ],
  },
  {
    id: "schuco",
    materiaal: "kunststof",
    profielValue: "schuco-living",
    titel: "Schüco (Living & EasySlide)",
    leverancier: "Schüco",
    leverancierUrl: "https://www.schueco.com/nl",
    // Schüco Living heeft nog geen eigen beeld → Placeholder. TODO: beeld toevoegen.
    afbeelding: undefined,
    intro:
      "Schüco staat voor Duitse topkwaliteit. Het Living-profiel is een 6-kamer kunststof systeem met 120 mm inbouwdiepte en een Uf-waarde tot 1,1 W/m²K — uitstekend geïsoleerd en degelijk afgewerkt. Voor schuifpuien leveren wij het Schüco EasySlide-systeem (RC2, inbouwdiepte 167 mm).",
    specs: [
      {
        label: "Profiel",
        waarde:
          "Schüco Living: 6-kamer kunststof, inbouwdiepte 120 mm, Uf tot ± 1,1 W/m²K, glaslat 29,5 × 28 mm, tussenstijl 92 × 120 mm. EasySlide schuifpui: inbouwdiepte 167 mm, 2-, 3- of 4-delig.",
      },
      {
        label: "Hang- en sluitwerk",
        waarde:
          "Ramen met Siegenia Titan AF beslag (SKG**); deuren met FKS-beslag en Winkhaus autoLock AV3 automatische driepuntsvergrendeling (SKG***). Aluminium F1 of zwart.",
      },
      {
        label: "Kleuren",
        waarde:
          "Folie in glad, houtnerf of metallic; binnen- en buitenzijde apart in te stellen. Het actuele kleurenpalet kies je in de configurator.",
      },
      {
        label: "Glas",
        waarde:
          "HR++ (U ± 1,1 W/m²K) of HR+++ triple (± 0,6 W/m²K), ook 1- of 2-zijdig gelaagd/veiligheidsglas (NEN 3569 / NEN 6702).",
      },
      {
        label: "Ventilatieroosters",
        waarde:
          "Zelfregulerende, insectwerende roosters in het glasvlak (blank geanodiseerd, wit RAL 9010 of crèmewit RAL 9001). Niet op de tussenstijl te plaatsen.",
      },
      {
        label: "Dorpels",
        waarde:
          "IsoStone onderdorpel: glasvezelversterkt, 50 mm, rot- en slijtvast, isolerend, standaard zwart. EasySlide met volledig aluminium, thermisch onderbroken dorpel.",
      },
      {
        label: "Roeden",
        waarde: "TODO: roede-opties bevestigen.",
      },
      {
        label: "Paneelvulling",
        waarde: "Geïsoleerde deurpanelen leverbaar. TODO: diktes/kern bevestigen.",
      },
      {
        label: "Scharnieren",
        waarde: "Bij het beslag inbegrepen, kleur passend bij de gekozen greep (F1 of zwart).",
      },
      {
        label: "Garantie",
        waarde:
          "Kunststof kozijn 10 jaar, hang- en sluitwerk 2 jaar, beglazing en ventilatieroosters 10 jaar (bij correct gebruik en onderhoud).",
      },
      {
        label: "Detaillering",
        waarde:
          "KOMO / Politiekeurmerk Veilig Wonen. EasySlide schuifpui met inbraakwerendheid RC2 en een thermische isolatie tot ± 1,5 W/m²K.",
      },
    ],
  },
];

// ─── Aluminium kozijnen ───────────────────────────────────────────────────────

export const ALUMINIUM_PRODUCTEN: ProductGids[] = [
  {
    id: "reynaers-sl38",
    materiaal: "aluminium",
    profielValue: "reynaers-sl38",
    titel: "Reynaers SL 38",
    leverancier: "Reynaers Aluminium",
    leverancierUrl: "https://www.reynaers.nl",
    afbeelding: "/profielen/reynaers-sl38.webp",
    intro:
      "De Reynaers SL 38 is een bijzonder slank aluminium gevelsysteem met een zichtbreedte van slechts 52 mm — strak, modern en met veel glas. KOMO-gecertificeerd en hoogwaardig afgewerkt.",
    specs: [
      {
        label: "Profiel",
        waarde:
          "Slank aluminium gevelkozijn, cubic vormgeving, KOMO-gecertificeerd. Tussenstijl/-dorpel 52 mm. TODO: thermische onderbreking + Uf-waarde bevestigen.",
      },
      {
        label: "Coating",
        waarde:
          "Standaard geanodiseerd (20 µm); voor kust- of industrielocaties (< 10 km van de kust) 25 µm. TODO: poedercoating-/RAL-opties en dual-color bevestigen (in configurator).",
      },
      {
        label: "Hang- en sluitwerk",
        waarde:
          "Reynaers-beslag, aluminium F1. Driepuntssluiting met kerntrekbeveiliging en cilinder (30/45) bij deuren. SKG** / Politiekeurmerk Veilig Wonen.",
      },
      {
        label: "Scharnieren",
        waarde:
          "Sobinco opdek-rollenbandscharnieren, RVS met zelfsmerende bussen, tot ± 250 kg deurgewicht. Kleur aluminium F1.",
      },
      {
        label: "Glas",
        waarde:
          "HR++ (4-20-4, U ± 1,1 W/m²K) of HR+++ triple (± 0,6 W/m²K). Gelaagd/veiligheidsglas conform NEN 3569 en NEN 6702 leverbaar.",
      },
      {
        label: "Ventilatieroosters",
        waarde:
          "Thermisch onderbroken, insectwerende roosters in het glasvlak. Kleuren: blank geanodiseerd (F1), wit (RAL 9010), zwart (RAL 9005).",
      },
      {
        label: "Dorpels",
        waarde: "Aluminium onderdorpel met laag reliëf (18 mm), voldoet aan het Bouwbesluit.",
      },
      {
        label: "Garantie",
        waarde:
          "Aluminium kozijn 5 jaar, hang- en sluitwerk 2 jaar, beglazing 5 jaar (bij correct gebruik en onderhoud).",
      },
      {
        label: "Detaillering",
        waarde:
          "Zeer slanke zichtbreedte (52 mm) voor maximale lichtinval. TODO: RC-klasse en maximale afmetingen/gewicht uit de detailbladen bevestigen.",
      },
    ],
  },
  {
    id: "aluprof-mb79n",
    materiaal: "aluminium",
    profielValue: "aluprof-mb79",
    titel: "Aluprof MB-79N",
    leverancier: "Aluprof",
    leverancierUrl: "https://aluprof.com/nl",
    afbeelding: "/profielen/aluprof/mb-79n-doorsnede-si.webp",
    intro:
      "De Aluprof MB-79N is een modern, thermisch onderbroken aluminium systeem met 70 mm inbouwdiepte. Geschikt voor grote, slanke kozijnen met uitstekende isolatie en een hoogwaardige afwerking.",
    specs: [
      {
        label: "Profiel",
        waarde:
          "Thermisch onderbroken aluminium, inbouwdiepte 70 mm, aanslag 25 mm, tussenstijl/-dorpel 75,5 mm. Verstevigingsprofielen voor grote maten. TODO: Uf-waarde bevestigen.",
      },
      {
        label: "Coating",
        waarde:
          "Geanodiseerd (25 µm) of structuurcoating voor een luxe uitstraling. TODO: RAL-opties en dual-color bevestigen (in configurator).",
      },
      {
        label: "Hang- en sluitwerk",
        waarde:
          "Aluprof-beslag, aluminium F1. Ramen met verdekt liggend beslag; deuren met driepuntssluiting en kerntrekbeveiliging, standaard voorgemonteerd. SKG** / Politiekeurmerk Veilig Wonen.",
      },
      {
        label: "Scharnieren",
        waarde:
          "WALA opdek-rollenbandscharnieren, RVS, tot ± 250 kg deurgewicht, onderhoudsvrij. Kleur aluminium F1.",
      },
      {
        label: "Glas",
        waarde:
          "HR++ (U ± 1,1 W/m²K) of HR+++ triple (± 0,6 W/m²K), ook 1- of 2-zijdig gelaagd/veiligheidsglas (NEN 3569 / NEN 6702).",
      },
      {
        label: "Ventilatieroosters",
        waarde:
          "Zelfregulerende, insectwerende roosters in het glasvlak. Kleuren: zwart (RAL 9005), donkergrijs (RAL 7021), antracietgrijs (RAL 7016).",
      },
      {
        label: "Dorpels",
        waarde: "Aluminium onderdorpel met laag reliëf (10 mm), voldoet aan het Bouwbesluit.",
      },
      {
        label: "Garantie",
        waarde:
          "Aluminium kozijn 5 jaar, hang- en sluitwerk 2 jaar, beglazing 5 jaar (bij correct gebruik en onderhoud).",
      },
      {
        label: "Detaillering",
        waarde:
          "Modern systeem dat ook bij grote afmetingen slank blijft dankzij verstevigingsprofielen. TODO: RC-klasse en maximale afmetingen/gewicht uit de detailbladen bevestigen.",
      },
    ],
  },
];

// ─── Vergelijkingstabel (kwalitatief, géén bedragen) ─────────────────────────

export type VergelijkRij = {
  product: string;
  materiaal: string;
  uitstraling: string;
  onderhoud: string;
  isolatie: string;
  /** Indicatieve prijsklasse — nooit een bedrag. */
  prijsklasse: "€" | "€€" | "€€€";
  levensduur: string;
  geschiktVoor: string;
};

export const VERGELIJK_RIJEN: VergelijkRij[] = [
  {
    product: "Mahonie hout",
    materiaal: "Hout",
    uitstraling: "Warm, natuurlijk, klassiek",
    onderhoud: "Periodiek schilderen/beitsen",
    isolatie: "Goed (HR++ / HR+++)",
    prijsklasse: "€€€",
    levensduur: "Decennia bij goed onderhoud",
    geschiktVoor: "Klassieke en monumentale woningen",
  },
  {
    product: "Gealan S 9000 NL",
    materiaal: "Kunststof",
    uitstraling: "Strak, veel kleuren/folies",
    onderhoud: "Onderhoudsarm",
    isolatie: "Zeer goed (3 dichtingen)",
    prijsklasse: "€€",
    levensduur: "Tot 50 jaar of meer",
    geschiktVoor: "Renovatie en nieuwbouw, scherpe prijs",
  },
  {
    product: "Schüco",
    materiaal: "Kunststof",
    uitstraling: "Strak, premium afwerking",
    onderhoud: "Onderhoudsarm",
    isolatie: "Zeer goed (6-kamer, Uf ± 1,1)",
    prijsklasse: "€€",
    levensduur: "Tot 50 jaar of meer",
    geschiktVoor: "Wie premium kunststof en schuifpuien wil",
  },
  {
    product: "Reynaers SL 38",
    materiaal: "Aluminium",
    uitstraling: "Zeer slank en modern (52 mm)",
    onderhoud: "Nagenoeg onderhoudsvrij",
    isolatie: "Goed (HR++ / HR+++)",
    prijsklasse: "€€€",
    levensduur: "Tot 50 jaar of meer",
    geschiktVoor: "Moderne woningen, maximale lichtinval",
  },
  {
    product: "Aluprof MB-79N",
    materiaal: "Aluminium",
    uitstraling: "Modern, slank, strak",
    onderhoud: "Nagenoeg onderhoudsvrij",
    isolatie: "Zeer goed (thermisch onderbroken)",
    prijsklasse: "€€€",
    levensduur: "Tot 50 jaar of meer",
    geschiktVoor: "Grote kozijnen, moderne nieuwbouw",
  },
];

// ─── Keuzehulp ────────────────────────────────────────────────────────────────

export const KEUZEHULP: Array<{ situatie: string; advies: string }> = [
  {
    situatie: "Klassieke woning of warme, natuurlijke uitstraling",
    advies: "Kies voor mahonie houten kozijnen — tijdloos en authentiek.",
  },
  {
    situatie: "Betaalbaar en onderhoudsarm",
    advies: "Kunststof (Gealan S 9000 NL of Schüco) — uitstekende prijs-kwaliteit en nauwelijks onderhoud.",
  },
  {
    situatie: "Modern en strak",
    advies: "Aluminium (Reynaers SL 38 of Aluprof MB-79N) — slanke profielen en veel glas.",
  },
  {
    situatie: "Beste isolatie / premium afwerking",
    advies: "Afhankelijk van profiel én glas: combineer een goed geïsoleerd profiel met HR+++ triple glas.",
  },
];

// ─── Leveranciers (officiële websites) ───────────────────────────────────────

export const LEVERANCIERS: Array<{ naam: string; url: string; intro: string }> = [
  {
    naam: "Gealan",
    url: "https://www.gealan.nl",
    intro:
      "Duitse fabrikant van hoogwaardige kunststof profielsystemen met een sterke focus op isolatie en duurzaamheid.",
  },
  {
    naam: "Schüco",
    url: "https://www.schueco.com/nl",
    intro:
      "Internationaal toonaangevend in raam-, deur- en gevelsystemen in kunststof en aluminium, bekend om kwaliteit en innovatie.",
  },
  {
    naam: "Reynaers Aluminium",
    url: "https://www.reynaers.nl",
    intro:
      "Specialist in slanke, duurzame aluminium raam-, deur- en schuifsystemen voor woning- en utiliteitsbouw.",
  },
  {
    naam: "Aluprof",
    url: "https://aluprof.com/nl",
    intro:
      "Europese aluminiumfabrikant met moderne, thermisch onderbroken systemen voor ramen, deuren en gevels.",
  },
];

// ─── FAQ (voedt zowel de FAQ-sectie als het FAQPage-schema) ──────────────────

export const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: "Welk kozijn is het meest onderhoudsarm?",
    answer:
      "Kunststof en aluminium kozijnen zijn nagenoeg onderhoudsvrij: af en toe schoonmaken volstaat. Houten (mahonie) kozijnen vragen periodiek schilder- of beitswerk, maar gaan bij goed onderhoud decennia mee.",
  },
  {
    question: "Wat is het verschil tussen HR++ en HR+++ (triple) glas?",
    answer:
      "HR++ is dubbel glas met een U-waarde van ongeveer 1,1 W/m²K en de standaardkeuze voor de meeste woningen. HR+++ (triple) glas heeft drie glasbladen, isoleert beter (± 0,6 W/m²K) en dempt meer geluid. Beide komen in aanmerking voor ISDE-subsidie bij vervanging van enkel- of dubbelglas.",
  },
  {
    question: "Welk materiaal past het beste bij mijn woning?",
    answer:
      "Mahonie past bij een klassieke, warme uitstraling; kunststof is betaalbaar en onderhoudsarm; aluminium is strak en modern met slanke profielen. De beste isolatie hangt af van de combinatie van profiel en glas. Onze keuzehulp en een vrijblijvend adviesgesprek helpen u verder.",
  },
  {
    question: "Leveren en plaatsen jullie kozijnen in Twente en Enschede?",
    answer:
      "Ja. De Kozijnstudio levert en monteert kozijnen in heel Twente en Oost-Nederland, waaronder Enschede, Hengelo en Almelo. We werken vanuit één planning en één aanspreekpunt, samen met moederbedrijf MTB Bouw voor eventueel bouwkundig werk.",
  },
  {
    question: "Komen nieuwe kozijnen in aanmerking voor ISDE-subsidie?",
    answer:
      "Bij het vervangen van enkel- of dubbelglas door HR++ of HR+++ glas kunt u in aanmerking komen voor de ISDE-subsidie. De hoogte wordt jaarlijks door de overheid vastgesteld; wij vermelden altijd een indicatieve subsidie op basis van de actuele regels.",
  },
  {
    question: "Welke merken profielen gebruiken jullie?",
    answer:
      "Kunststof: Gealan S 9000 NL en Schüco. Aluminium: Reynaers SL 38 en Aluprof MB-79N. Hout: mahonie. Zo combineren we voor elk type woning de juiste uitstraling, isolatie en prijs.",
  },
  {
    question: "Hoe lang gaan kozijnen mee?",
    answer:
      "Kunststof en aluminium kozijnen gaan doorgaans 50 jaar of langer mee. Houten kozijnen van mahonie gaan bij periodiek onderhoud eveneens vele decennia mee.",
  },
];
