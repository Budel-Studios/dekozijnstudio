/**
 * Content voor de overkoepelende kozijnengids (/kozijnen).
 *
 * Volledig data-driven en losgekoppeld van de componenten. De specificaties
 * hieronder zijn in eigen woorden geschreven op basis van publieke
 * fabrikant-/leveranciersinformatie (Toeleveringonline e.a.); exacte mm-maten
 * komen single-source uit `data/configurator.ts` via `findProfiel`.
 *
 * Publicatieregels (docs/schrijfwijzer.md, data/feiten.ts):
 *  - Geen keurmerken (KOMO, SKG, Politiekeurmerk), U-/Uf-waarden, RC-klassen,
 *    draaggewichten of garantietermijnen in publieke tekst zolang er geen
 *    productbron + bevestiging is.
 *  - Zulke gegevens staan hieronder als interne notitie achter `TODO:` in een
 *    `waarde`. `components/kozijnen/product-specs.tsx` knipt alles vanaf
 *    "TODO" weg en verbergt een rij als er niets overblijft — de notities zijn
 *    dus de checklist voor de eigenaar en worden nooit getoond.
 *  - Prijzen worden hier NIET genoemd; de vergelijkingstabel gebruikt enkel een
 *    indicatieve prijsklasse (€ / €€ / €€€).
 */

export type SpecRow = {
  label: string;
  /** Mag eindigen op "TODO: …" (interne notitie, wordt niet getoond). */
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
  /** Pad in /public; zonder beeld wordt het beeldvak weggelaten. */
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
      "Sapeli mahonie is een warm, fijn gestructureerd hardhout met weinig poriën. Het laat zich glad afwerken en blijft goed op maat. Daardoor past het bij een klassieke uitstraling en bij kozijnen die strak geprofileerd moeten worden.",
    specs: [
      {
        label: "Eigenschappen mahonie",
        waarde:
          "Hardhout met een fijne nerf en weinig poriën, goed maatvast, met een warme natuurlijke kleur. TODO: duurzaamheidsklasse + FSC-status bevestigen.",
      },
      {
        label: "Hang- en sluitwerk",
        waarde:
          "Beslag van onder meer AXA, GU, HABO, FUHR en Voslux. Draairamen met remschaar en stormvaste vergrendeling; deuren met driepuntssluiting en kerntrekbeveiliging. Standaard aluminium F1, optioneel zwart (RAL 9005) of rvs. TODO: keurmerk (eerder genoemd: SKG** / Politiekeurmerk Veilig Wonen) alleen tonen met productbron.",
      },
      {
        label: "Glas",
        waarde:
          "HR++ of triple glas, met houten glaslatten van 17 × 17 mm. Gelaagd veiligheidsglas is mogelijk. De glassponning is geschikt voor glas tot ± 32 mm dik (voor triple tot ± 46 mm). TODO: U-waarden (eerder: HR++ ± 1,1 en triple ± 0,6 W/m²K) en NEN 3569 / NEN 6702 alleen tonen met productbron.",
      },
      {
        label: "Paneelvulling",
        waarde:
          "Geïsoleerd paneel: twee Trespa-platen van 3 mm met een PIR-kern, volvlak verlijmd. Kerndikte 24 of 40 mm. TODO: U-waarden (eerder ± 1,1 resp. 0,6 W/m²K) alleen tonen met productbron.",
      },
      {
        label: "Onderdorpels",
        waarde:
          "Houten onderdorpel (67 mm) of een onderhoudsarme DTS TimberPlus-dorpel (52 mm, biobased). Voor schuifpuien de Easy-Ent onderdorpel.",
      },
      {
        label: "Ventilatieroosters",
        waarde:
          "Zelfregulerende ventilatieroosters, opgenomen in het glasvlak. TODO: exacte typen/kleuren bevestigen.",
      },
      {
        label: "Scharnieren",
        waarde:
          "AXA opdek-veiligheidsscharnieren (Topcoat® verzinkt). Het aantal hangt af van hoogte en gewicht, met minimaal drie per draaiend deel.",
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
          "Strakke profilering met een fijne afwerking dankzij de gladde houtstructuur. Geschilderd of gebeitst in de kleur die je kiest. TODO: standaard profilering/afronding specificeren.",
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
      "De Gealan S 9000 NL is een kunststof profiel met drie dichtingen en 120 mm inbouwdiepte. Het wordt gebruikt bij renovatie en nieuwbouw en is er in veel kleuren en folies, ook met een houtnerf.",
    specs: [
      {
        label: "Profiel",
        waarde:
          "Kunststof profiel met drievoudige dichting. Tussenstijl 94 × 120 mm. TODO: KOMO-certificaat, aantal kamers en Uf-waarde bevestigen met productbron.",
      },
      {
        label: "Hang- en sluitwerk",
        waarde:
          "Verdekt liggend GU-beslag voor ramen; Hoppe Liège-deurkrukken met kerntrekbeveiliging en driepuntssluiting. Standaard aluminium F1, optioneel zwart. TODO: keurmerk (eerder genoemd: SKG** / Politiekeurmerk Veilig Wonen) alleen tonen met productbron.",
      },
      {
        label: "Kleuren",
        waarde:
          "Folie in glad, houtnerf of acryl. Binnen- en buitenzijde kunnen een andere kleur krijgen. Het actuele kleurenpalet kies je in de configurator.",
      },
      {
        label: "Glas",
        waarde:
          "HR++ (opbouw 4-16-4) of triple glas (4-18-4-18-4). Glaslat 35 × 26 mm. Gelaagd veiligheidsglas is mogelijk. TODO: U-waarden (eerder: ± 1,1 en ± 0,6 W/m²K) en NEN 3569 / NEN 6702 alleen tonen met productbron.",
      },
      {
        label: "Ventilatieroosters",
        waarde:
          "Zelfregulerende roosters die meebewegen met de luchtdruk, insectwerend. Kleuren: blank geanodiseerd (F1), wit (RAL 9010), crèmewit (RAL 9001) of antraciet (RAL 7016).",
      },
      {
        label: "Dorpels",
        waarde: "Onderdorpel passend bij de situatie. TODO: exacte dorpeltypen/materialen bevestigen.",
      },
      {
        label: "Roeden",
        waarde: "Roeden zijn mogelijk. TODO: roede-typen (opgeplakt / Wienersprosse / tussen glas) bevestigen.",
      },
      {
        label: "Paneelvulling",
        waarde: "Geïsoleerde panelen zijn mogelijk. TODO: diktes/kern bevestigen.",
      },
      {
        label: "Scharnieren",
        waarde:
          "Dr. Hahn KT-EV opdekscharnieren voor deuren, in zes richtingen verstelbaar. Kleur passend bij het gekozen beslag (F1 of zwart). TODO: draaggewicht (eerder genoemd: ± 120 kg) alleen tonen met productbron.",
      },
      {
        label: "Garantie",
        waarde:
          "TODO: garantietermijnen bevestigen (eerder genoemd: kozijn 10 jaar, hang- en sluitwerk 2 jaar, beglazing en ventilatieroosters 10 jaar, bij correct gebruik en onderhoud).",
      },
      {
        label: "Detaillering",
        waarde:
          "Strak profiel met drie dichtingen tegen tocht en vocht. TODO: KOMO-certificering (isolatie, geluid, sterkte, inbraakwerendheid) alleen tonen met productbron.",
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
    // Schüco Living heeft nog geen eigen beeld; het beeldvak wordt dan weggelaten.
    afbeelding: undefined,
    intro:
      "Schüco Living is een kunststof systeem met zes kamers en 120 mm inbouwdiepte. Voor schuifpuien is er het Schüco EasySlide-systeem, met een inbouwdiepte van 167 mm.",
    specs: [
      {
        label: "Profiel",
        waarde:
          "Schüco Living: kunststof met zes kamers, inbouwdiepte 120 mm, glaslat 29,5 × 28 mm, tussenstijl 92 × 120 mm. EasySlide schuifpui: inbouwdiepte 167 mm, 2-, 3- of 4-delig. TODO: Uf-waarde (eerder genoemd: tot ± 1,1 W/m²K) alleen tonen met productbron.",
      },
      {
        label: "Hang- en sluitwerk",
        waarde:
          "Ramen met Siegenia Titan AF-beslag; deuren met FKS-beslag en Winkhaus autoLock AV3, een automatische driepuntsvergrendeling. Aluminium F1 of zwart. TODO: keurmerken (eerder genoemd: SKG** ramen, SKG*** deuren) alleen tonen met productbron.",
      },
      {
        label: "Kleuren",
        waarde:
          "Folie in glad, houtnerf of metallic; binnen- en buitenzijde kunnen een andere kleur krijgen. Het actuele kleurenpalet kies je in de configurator.",
      },
      {
        label: "Glas",
        waarde:
          "HR++ of triple glas, ook enkel- of dubbelzijdig gelaagd veiligheidsglas. TODO: U-waarden (eerder: ± 1,1 en ± 0,6 W/m²K) en NEN 3569 / NEN 6702 alleen tonen met productbron.",
      },
      {
        label: "Ventilatieroosters",
        waarde:
          "Zelfregulerende, insectwerende roosters in het glasvlak (blank geanodiseerd, wit RAL 9010 of crèmewit RAL 9001). Niet op de tussenstijl te plaatsen.",
      },
      {
        label: "Dorpels",
        waarde:
          "IsoStone onderdorpel: glasvezelversterkt, 50 mm, rot- en slijtvast, isolerend, standaard zwart. EasySlide met een volledig aluminium, thermisch onderbroken dorpel.",
      },
      {
        label: "Roeden",
        waarde: "TODO: roede-opties bevestigen.",
      },
      {
        label: "Paneelvulling",
        waarde: "Geïsoleerde deurpanelen zijn mogelijk. TODO: diktes/kern bevestigen.",
      },
      {
        label: "Scharnieren",
        waarde: "Onderdeel van het beslag, in de kleur van de gekozen greep (F1 of zwart).",
      },
      {
        label: "Garantie",
        waarde:
          "TODO: garantietermijnen bevestigen (eerder genoemd: kozijn 10 jaar, hang- en sluitwerk 2 jaar, beglazing en ventilatieroosters 10 jaar, bij correct gebruik en onderhoud).",
      },
      {
        label: "Detaillering",
        waarde:
          "TODO: KOMO / Politiekeurmerk Veilig Wonen en EasySlide RC2 + isolatie tot ± 1,5 W/m²K alleen tonen met productbron.",
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
      "De Reynaers SL 38 is een slank aluminium systeem met een zichtbreedte van 52 mm en een strakke, cubic vormgeving. Smalle profielen laten veel glas over en geven een moderne uitstraling.",
    specs: [
      {
        label: "Profiel",
        waarde:
          "Slank aluminium kozijn met cubic vormgeving. Tussenstijl en -dorpel 52 mm. TODO: KOMO-certificaat, thermische onderbreking en Uf-waarde bevestigen met productbron.",
      },
      {
        label: "Coating",
        waarde:
          "Standaard geanodiseerd (20 µm); binnen 10 km van de kust of bij industrie 25 µm. TODO: poedercoating-/RAL-opties en dual-color bevestigen (in configurator).",
      },
      {
        label: "Hang- en sluitwerk",
        waarde:
          "Reynaers-beslag, aluminium F1. Deuren met driepuntssluiting, kerntrekbeveiliging en cilinder (30/45). TODO: keurmerk (eerder genoemd: SKG** / Politiekeurmerk Veilig Wonen) alleen tonen met productbron.",
      },
      {
        label: "Scharnieren",
        waarde:
          "Sobinco opdek-rollenbandscharnieren in rvs met zelfsmerende bussen. Kleur aluminium F1. TODO: draaggewicht (eerder genoemd: ± 250 kg) alleen tonen met productbron.",
      },
      {
        label: "Glas",
        waarde:
          "HR++ (opbouw 4-20-4) of triple glas. Gelaagd veiligheidsglas is mogelijk. TODO: U-waarden (eerder: ± 1,1 en ± 0,6 W/m²K) en NEN 3569 / NEN 6702 alleen tonen met productbron.",
      },
      {
        label: "Ventilatieroosters",
        waarde:
          "Thermisch onderbroken, insectwerende roosters in het glasvlak. Kleuren: blank geanodiseerd (F1), wit (RAL 9010), zwart (RAL 9005).",
      },
      {
        label: "Dorpels",
        waarde:
          "Aluminium onderdorpel met laag reliëf (18 mm). TODO: 'voldoet aan het Bouwbesluit' alleen tonen met productbron (Bouwbesluit is sinds 2024 vervangen door het Bbl).",
      },
      {
        label: "Garantie",
        waarde:
          "TODO: garantietermijnen bevestigen (eerder genoemd: kozijn 5 jaar, hang- en sluitwerk 2 jaar, beglazing 5 jaar, bij correct gebruik en onderhoud).",
      },
      {
        label: "Detaillering",
        waarde:
          "Slanke zichtbreedte van 52 mm, waardoor er relatief veel glas overblijft. TODO: RC-klasse en maximale afmetingen/gewicht uit de detailbladen bevestigen.",
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
      "De Aluprof MB-79N is een thermisch onderbroken aluminium systeem met 70 mm inbouwdiepte. Met verstevigingsprofielen blijft het ook bij grotere kozijnen slank.",
    specs: [
      {
        label: "Profiel",
        waarde:
          "Thermisch onderbroken aluminium, inbouwdiepte 70 mm, aanslag 25 mm, tussenstijl en -dorpel 75,5 mm. Verstevigingsprofielen voor grote maten. TODO: Uf-waarde bevestigen met productbron.",
      },
      {
        label: "Coating",
        waarde:
          "Geanodiseerd (25 µm) of een structuurlak. TODO: RAL-opties en dual-color bevestigen (in configurator).",
      },
      {
        label: "Hang- en sluitwerk",
        waarde:
          "Aluprof-beslag, aluminium F1. Ramen met verdekt liggend beslag; deuren met driepuntssluiting en kerntrekbeveiliging, voorgemonteerd. TODO: keurmerk (eerder genoemd: SKG** / Politiekeurmerk Veilig Wonen) alleen tonen met productbron.",
      },
      {
        label: "Scharnieren",
        waarde:
          "WALA opdek-rollenbandscharnieren in rvs. Kleur aluminium F1. TODO: draaggewicht (eerder genoemd: ± 250 kg) alleen tonen met productbron.",
      },
      {
        label: "Glas",
        waarde:
          "HR++ of triple glas, ook enkel- of dubbelzijdig gelaagd veiligheidsglas. TODO: U-waarden (eerder: ± 1,1 en ± 0,6 W/m²K) en NEN 3569 / NEN 6702 alleen tonen met productbron.",
      },
      {
        label: "Ventilatieroosters",
        waarde:
          "Zelfregulerende, insectwerende roosters in het glasvlak. Kleuren: zwart (RAL 9005), donkergrijs (RAL 7021), antracietgrijs (RAL 7016).",
      },
      {
        label: "Dorpels",
        waarde:
          "Aluminium onderdorpel met laag reliëf (10 mm). TODO: 'voldoet aan het Bouwbesluit' alleen tonen met productbron (Bouwbesluit is sinds 2024 vervangen door het Bbl).",
      },
      {
        label: "Garantie",
        waarde:
          "TODO: garantietermijnen bevestigen (eerder genoemd: kozijn 5 jaar, hang- en sluitwerk 2 jaar, beglazing 5 jaar, bij correct gebruik en onderhoud).",
      },
      {
        label: "Detaillering",
        waarde:
          "Blijft ook bij grotere afmetingen slank dankzij verstevigingsprofielen. TODO: RC-klasse en maximale afmetingen/gewicht uit de detailbladen bevestigen.",
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
  /** Feitelijke opbouw van het profiel (maten uit data/configurator.ts). */
  opbouw: string;
  /** Indicatieve prijsklasse — nooit een bedrag. */
  prijsklasse: "€" | "€€" | "€€€";
  geschiktVoor: string;
};

export const VERGELIJK_RIJEN: VergelijkRij[] = [
  {
    product: "Mahonie hout",
    materiaal: "Hout",
    uitstraling: "Warm en natuurlijk, klassiek te profileren",
    onderhoud: "Periodiek schilderen of beitsen",
    opbouw: "Hardhout, 114 mm inbouwdiepte",
    prijsklasse: "€€€",
    geschiktVoor: "Klassieke woningen, bestaande houten kozijnen namaken",
  },
  {
    product: "Gealan S 9000 NL",
    materiaal: "Kunststof",
    uitstraling: "Strak, veel kleuren en houtnerffolies",
    onderhoud: "Weinig: schoonmaken, beslag en rubbers nalopen",
    opbouw: "Drie dichtingen, 120 mm inbouwdiepte",
    prijsklasse: "€€",
    geschiktVoor: "Renovatie en nieuwbouw als het budget zwaar weegt",
  },
  {
    product: "Schüco",
    materiaal: "Kunststof",
    uitstraling: "Strak, veel kleuren en folies",
    onderhoud: "Weinig: schoonmaken, beslag en rubbers nalopen",
    opbouw: "Living: zes kamers, 120 mm; EasySlide: 167 mm",
    prijsklasse: "€€",
    geschiktVoor: "Kunststof ramen, deuren en schuifpuien",
  },
  {
    product: "Reynaers SL 38",
    materiaal: "Aluminium",
    uitstraling: "Zeer slank en modern, 52 mm zichtbreedte",
    onderhoud: "Weinig: coating schoonmaken, beslag nalopen",
    opbouw: "Slank systeem, 76 mm inbouwdiepte",
    prijsklasse: "€€€",
    geschiktVoor: "Moderne woningen met veel glas",
  },
  {
    product: "Aluprof MB-79N",
    materiaal: "Aluminium",
    uitstraling: "Modern en strak",
    onderhoud: "Weinig: coating schoonmaken, beslag nalopen",
    opbouw: "Thermisch onderbroken, 70 mm inbouwdiepte",
    prijsklasse: "€€€",
    geschiktVoor: "Grotere kozijnen en moderne architectuur",
  },
];

// ─── Keuzehulp ────────────────────────────────────────────────────────────────

export const KEUZEHULP: Array<{ situatie: string; advies: string }> = [
  {
    situatie: "Klassieke woning of een warme, natuurlijke uitstraling",
    advies:
      "Kijk naar hout. Het laat zich klassiek profileren en kan bestaande houten kozijnen goed volgen. Reken wel op periodiek schilderwerk.",
  },
  {
    situatie: "Weinig onderhoud en een overzichtelijk budget",
    advies:
      "Kijk naar kunststof. Het vraagt weinig onderhoud en is er in veel kleuren, ook met een houtnerf.",
  },
  {
    situatie: "Modern en strak, met veel glas",
    advies:
      "Kijk naar aluminium. Slanke profielen laten veel glas over, ook bij grote puien.",
  },
  {
    situatie: "Zo goed mogelijk isoleren",
    advies:
      "Kijk naar het geheel: profiel, glas en de aansluiting op de muur. Triple glas isoleert beter dan HR++, maar is dikker en zwaarder. Het profiel moet daarop berekend zijn.",
  },
];

// ─── Leveranciers (officiële websites) ───────────────────────────────────────

export const LEVERANCIERS: Array<{ naam: string; url: string; intro: string }> = [
  {
    naam: "Gealan",
    url: "https://www.gealan.nl",
    intro: "Duitse fabrikant van kunststof profielsystemen voor ramen en deuren.",
  },
  {
    naam: "Schüco",
    url: "https://www.schueco.com/nl",
    intro: "Duitse fabrikant van raam-, deur- en gevelsystemen in kunststof en aluminium.",
  },
  {
    naam: "Reynaers Aluminium",
    url: "https://www.reynaers.nl",
    intro: "Belgische fabrikant van aluminium raam-, deur- en schuifsystemen.",
  },
  {
    naam: "Aluprof",
    url: "https://aluprof.com/nl",
    intro: "Poolse fabrikant van aluminium systemen voor ramen, deuren en gevels.",
  },
];

// ─── Veelgestelde vragen (alleen zichtbaar; geen FAQPage-schema) ─────────────

export const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: "Welk kozijn vraagt het minste onderhoud?",
    answer:
      "Kunststof en aluminium vragen het minste onderhoud: af en toe schoonmaken en het beslag en de rubbers nalopen. Hout heeft periodiek schilder- of beitswerk nodig. Hoe vaak, hangt af van de verf, de kleur en hoeveel zon en regen het kozijn krijgt.",
  },
  {
    question: "Wat is het verschil tussen HR++ en triple glas?",
    answer:
      "HR++ is dubbel isolatieglas en bij veel woningen de gangbare keuze. Triple glas heeft drie glasbladen, isoleert beter en is dikker en zwaarder. Het kozijn moet daarop berekend zijn. Welk glas je krijgt en welke isolatiewaarde daarbij hoort, staat in de specificatie van je voorstel.",
  },
  {
    question: "Welk materiaal past het beste bij mijn woning?",
    answer:
      "Dat hangt af van de uitstraling die je zoekt, hoeveel onderhoud je wilt doen en je budget. Hout past vaak bij een klassieke woning, kunststof bij wie weinig onderhoud wil, aluminium bij een moderne gevel met veel glas. Hoe goed een kozijn isoleert, hangt vooral af van de combinatie van profiel, glas en de aansluiting op de muur.",
  },
  {
    question: "Waar werken jullie?",
    answer:
      "We werken vanuit Enschede in Twente. De montage regelen we. Is er bouwkundig werk nodig, zoals een opening vergroten, dan doet MTB Bouw dat. De Kozijnstudio is een handelsnaam van MTB Bouw B.V.",
  },
  {
    question: "Kom ik met nieuwe kozijnen in aanmerking voor subsidie?",
    answer:
      "Misschien. Vervang je bestaand glas door HR++ of triple glas en voldoen je woning en het werk aan de voorwaarden van RVO, dan kun je ISDE-subsidie aanvragen. Niet elk nieuw kozijn komt automatisch in aanmerking. Kijk voor de actuele voorwaarden en bedragen op rvo.nl.",
  },
  {
    question: "Welke profielen kan ik kiezen?",
    answer:
      "In de configurator en in deze gids staan profielen van Gealan en Schüco (kunststof), Reynaers en Aluprof (aluminium) en mahonie (hout). Welk profiel bij jouw woning past, bespreken we bij je voorstel.",
  },
  {
    question: "Hoe lang gaan kozijnen mee?",
    answer:
      "Dat hangt af van het materiaal, de ligging en het onderhoud. Bij hout is op tijd schilderen het belangrijkst. Bij kunststof en aluminium bepalen vooral het beslag, de rubbers en de aansluitingen hoe goed een kozijn blijft werken.",
  },
];
