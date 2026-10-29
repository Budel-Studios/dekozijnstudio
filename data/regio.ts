/**
 * Lokale SEO-landingspagina's — content per regio/plaats.
 *
 * Elke entry voedt één landingspagina via de RegioPaginaTemplate: de regio-hub
 * op /werkgebied en plaatsen op /werkgebied/<slug>. Belangrijk: content is per pagina UNIEK geschreven
 * (geen gedeelde alinea's) om dunne doorway-pages te voorkomen. Teksten
 * noemen doelkeywords natuurlijk; geen prijzen/bedragen behalve de vaste
 * inmeetservice (€ 49, CMS-instelbaar feit uit CLAUDE.md).
 *
 * Nieuwe plaats toevoegen = één entry hier (soort "plaats"). Route, sitemap en
 * footerlink volgen automatisch. Alleen toevoegen met eigen lokaal bewijs
 * (docs/seo-strategie-2026-10.md, h10).
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
    slug: "twente",
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
    slug: "enschede",
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
  {
    slug: "hengelo",
    naam: "Hengelo",
    soort: "plaats",
    metaTitle: "Kozijnen in Hengelo | op maat, geleverd en vakkundig gemonteerd",
    metaDescription:
      "Kozijnen vervangen in Hengelo? Kunststof, houten en aluminium kozijnen op maat — van wederopbouwwoning tot Hasseler Es. Transparante prijzen incl. btw.",
    heroTitel: "Kozijnen in Hengelo — maatwerk voor elke bouwperiode",
    heroLead:
      "Hengelo is gebouwd in lagen: van het tuindorp en de wederopbouw tot de grote uitbreidingswijken. De Kozijnstudio levert en monteert kunststof, houten en aluminium kozijnen die daarbij passen — met transparante prijzen incl. btw en montage door eigen monteurs.",
    lokaleUsps: [
      "Vanuit Enschede in een kwartier ter plaatse",
      "Advies afgestemd op bouwperiode en gevelbeeld",
      "Elke offerte vooraf gespecificeerd, incl. btw",
      "Inmeetservice € 49 — volledig verrekend bij doorgang",
      "Meerdere kozijnen op één dag geplaatst",
      "Bouwkundige aanpassingen via moederbedrijf MTB Bouw",
    ],
    plaatsen: [
      "Binnenstad",
      "Tuindorp 't Lansink",
      "Hengelose Es",
      "Hasseler Es",
      "Groot Driene",
      "Klein Driene",
      "Slangenbeek",
      "Woolde",
      "Wilderinkshoek",
      "Beckum",
    ],
    lokaleContext: [
      "Hengelo laat als geen andere Twentse stad zien hoe bouwperiodes elkaar opvolgen. Het centrum is na de oorlog grotendeels herbouwd — wederopbouwwoningen met vaak grote, strakke gevelopeningen waar kunststof of aluminium kozijnen uitstekend tot hun recht komen. Tuindorp 't Lansink is juist een beschermd stadsgezicht met karakteristieke vroeg-twintigste-eeuwse architectuur: daar luistert de detaillering nauw en denken we mee over profielen die het oorspronkelijke gevelbeeld respecteren. Let op: in een beschermd stadsgezicht kan voor het wijzigen van kozijnen een omgevingsvergunning nodig zijn — we wijzen u daar tijdig op.",
      "In de grote uitbreidingswijken zoals de Hasseler Es en Slangenbeek staan veel woningen uit de jaren zeventig tot negentig die toe zijn aan hun tweede generatie kozijnen. Vaak is dat het moment om meteen de stap naar HR++ of triple glas te maken: minder stoken, meer comfort en mogelijk ISDE-subsidie. Tijdens de inmeetafspraak bekijken we de bouwkundige staat en krijgt u een offerte waarin kozijn, glas en montage stuk voor stuk zijn uitgesplitst.",
    ],
    faq: [
      {
        question: "In welke wijken van Hengelo werken jullie?",
        answer:
          "In heel Hengelo — van de binnenstad en Tuindorp 't Lansink tot de Hasseler Es, Groot Driene, Slangenbeek en Beckum. Ook in buurgemeenten zoals Borne, Delden en Enschede zijn we actief.",
      },
      {
        question: "Ik woon in Tuindorp 't Lansink — mag ik zomaar mijn kozijnen vervangen?",
        answer:
          "Tuindorp 't Lansink is een beschermd stadsgezicht; voor het wijzigen van kozijnen kan daar een omgevingsvergunning nodig zijn. Wij adviseren profielen die passen bij het oorspronkelijke gevelbeeld en raden aan de vergunningplicht vooraf bij de gemeente te checken — daar helpen we u bij.",
      },
      {
        question: "Wat kosten nieuwe kozijnen in Hengelo?",
        answer:
          "De prijs hangt af van materiaal, afmetingen, glas en montage. In onze configurator stelt u uw kozijn samen en ziet u direct een richtprijs incl. btw. De definitieve prijs volgt na de inmeetservice (€ 49, volledig verrekend bij doorgang).",
      },
      {
        question: "Mijn woning is uit de jaren 70 — wat levert kozijnvervanging op?",
        answer:
          "Woningen uit die periode hebben vaak nog de eerste kozijnen met enkel of vroeg dubbelglas. Nieuwe kozijnen met HR++ of triple glas schelen merkbaar in comfort, geluid en stookkosten, en bij glasvervanging komt u mogelijk in aanmerking voor ISDE-subsidie — wij rekenen de indicatie voor u mee.",
      },
      {
        question: "Hoe verloopt de montage?",
        answer:
          "Na de opmeting worden uw kozijnen op maat gemaakt (levertijd vanaf circa 8 weken). Onze monteurs plaatsen meerdere kozijnen per dag, zodat de montage doorgaans binnen één week klaar is — inclusief nette afwerking binnen en buiten.",
      },
    ],
  },
  {
    slug: "almelo",
    naam: "Almelo",
    soort: "plaats",
    metaTitle: "Kozijnen in Almelo | transparante prijzen, levering & montage",
    metaDescription:
      "Nieuwe kozijnen in Almelo en West-Twente: kunststof, hout of aluminium op maat. Eerlijk gespecificeerde prijzen incl. btw en hulp bij ISDE-subsidie.",
    heroTitel: "Kozijnen in Almelo — verduurzamen zonder verrassingen",
    heroLead:
      "Veel Almelose woningen dateren uit de textiel- en wederopbouwjaren en zijn toe aan beter geïsoleerde kozijnen. De Kozijnstudio levert en monteert kunststof, houten en aluminium kozijnen in heel Almelo en West-Twente — met een offerte waarin elke kostenpost vooraf zichtbaar is.",
    lokaleUsps: [
      "Actief in heel Almelo én West-Twente (Wierden, Rijssen, Vriezenveen)",
      "Sterk in verduurzaming van naoorlogse woningen",
      "Prijzen incl. btw, per onderdeel gespecificeerd",
      "Inmeetservice € 49 — volledig verrekend bij doorgang",
      "ISDE-indicatie standaard meegerekend bij HR++/triple glas",
      "Eén planning voor kozijnen én bouwkundig werk (MTB Bouw)",
    ],
    plaatsen: [
      "Centrum",
      "De Riet",
      "Nieuwstraatkwartier",
      "Sluitersveld",
      "Schelfhorst",
      "Windmolenbroek",
      "Ossenkoppelerhoek",
      "Aalderinkshoek",
      "Aadorp",
      "Bornerbroek",
    ],
    lokaleContext: [
      "Almelo groeide groot met de textielindustrie, en dat zie je terug in de woningvoorraad: karakteristieke arbeiderswoningen rond het centrum, ruime volkswijken uit de wederopbouw en grote uitbreidingen zoals Schelfhorst en Windmolenbroek uit de jaren zeventig en tachtig. Juist in deze woningen valt met nieuwe kozijnen veel te winnen — oude kozijnen met enkel of verouderd dubbelglas zijn er de grootste warmtelekken. Wij adviseren per woning wat verstandig is: compleet vervangen, en welk materiaal en glas daarbij past.",
      "Transparantie is daarbij ons uitgangspunt. U ziet in de offerte precies wat het kozijn kost, wat het glas kost en wat de montage kost — alles incl. btw. Komt uw project in aanmerking voor ISDE-subsidie, dan rekenen we de indicatie direct mee, en voor bouwkundig werk zoals het vergroten van een opening of een nieuwe latei schakelen we ons moederbedrijf MTB Bouw in. Zo houdt u één aanspreekpunt, ook in Wierden, Rijssen en Vriezenveen.",
    ],
    faq: [
      {
        question: "Werken jullie in heel Almelo?",
        answer:
          "Ja — van het centrum en het Nieuwstraatkwartier tot Schelfhorst, Windmolenbroek, Aadorp en Bornerbroek. Ook West-Twente rekenen we tot ons werkgebied: Wierden, Rijssen, Vriezenveen en omliggende dorpen.",
      },
      {
        question: "Wat kost kozijnvervanging in Almelo?",
        answer:
          "Dat verschilt per woning en wens. Onze richtprijzen zijn altijd incl. btw en per onderdeel uitgesplitst — bekijk de prijzenpagina of gebruik de configurator voor een directe indicatie. Na de inmeetservice (€ 49, verrekend bij doorgang) volgt de definitieve offerte.",
      },
      {
        question: "Mijn rijwoning uit de jaren 60 is tochtig — helpen nieuwe kozijnen?",
        answer:
          "In de meeste gevallen merkbaar. Naoorlogse rijwoningen verliezen veel warmte via verouderde kozijnen en beglazing. Nieuwe kozijnen met HR++ of triple glas verbeteren comfort en geluidsisolatie en verlagen het energieverbruik — tijdens de inmeetafspraak beoordelen we uw specifieke situatie.",
      },
      {
        question: "Kan ik subsidie krijgen op nieuwe kozijnen in Almelo?",
        answer:
          "Bij vervanging van enkel- of dubbelglas door HR++ of triple glas komt u mogelijk in aanmerking voor de landelijke ISDE-subsidie. De voorwaarden wijzigen jaarlijks; wij rekenen een actuele indicatie voor u mee en leveren de gegevens voor de aanvraag aan.",
      },
      {
        question: "Doen jullie ook het metsel- en breekwerk?",
        answer:
          "Ja. Via ons moederbedrijf MTB Bouw verzorgen we openingen vergroten, lateien, metselwerk en binnenafwerking — in dezelfde planning als de kozijnmontage, met één verantwoordelijke partij.",
      },
    ],
  },
  {
    slug: "oldenzaal",
    naam: "Oldenzaal",
    soort: "plaats",
    metaTitle: "Kozijnen in Oldenzaal | maatwerk in kunststof, hout & aluminium",
    metaDescription:
      "Kozijnen op maat in Oldenzaal en Noordoost-Twente: kunststof, hout of aluminium, geleverd en gemonteerd. Heldere prijzen incl. btw. Vraag een offerte aan.",
    heroTitel: "Kozijnen in Oldenzaal — van Boeskoolstad tot buitengebied",
    heroLead:
      "Van de historische binnenstad rond de Plechelmusbasiliek tot De Thij en De Graven Es: De Kozijnstudio levert en monteert kozijnen in heel Oldenzaal en Noordoost-Twente. Kunststof, hout of aluminium — altijd op maat en met heldere prijzen incl. btw.",
    lokaleUsps: [
      "Ook actief in Losser, De Lutte, Denekamp en Weerselo",
      "Passende profielen voor karakteristieke panden in de binnenstad",
      "Transparant prijsoverzicht incl. btw, geen verrassingen",
      "Inmeetservice € 49 — volledig verrekend bij doorgang",
      "Montage door eigen monteurs, meerdere kozijnen per dag",
      "Ook bouwkundig werk via MTB Bouw — één aanspreekpunt",
    ],
    plaatsen: [
      "Binnenstad",
      "De Thij",
      "Zuid-Berghuizen",
      "De Essen",
      "De Graven Es",
      "De Lutte",
      "Losser",
      "Denekamp",
      "Weerselo",
      "Rossum",
    ],
    lokaleContext: [
      "Oldenzaal — de Boeskoolstad — heeft een compacte historische kern met daaromheen duidelijk herkenbare uitbreidingsringen: Zuid-Berghuizen en De Thij uit de naoorlogse decennia, De Essen daarna en De Graven Es als jongste wijk. Elke ring vraagt om een eigen aanpak. Bij panden in en rond de binnenstad adviseren we profielen met een klassieke, verdiepte detaillering; in de jongere wijken kiezen bewoners vaker voor strakke kunststof of aluminium kozijnen met maximale isolatie.",
      "Daarnaast is Oldenzaal onze uitvalsbasis richting Noordoost-Twente: Losser, De Lutte, Denekamp, Weerselo en Rossum horen volop bij het werkgebied. In het landelijke buitengebied — met veel vrijstaande woningen en erven — is de combinatie van een onderhoudsarm kunststof kozijn met houtnerf-afwerking populair: de warme uitstraling van hout, zonder het schilderwerk. We laten tijdens de inmeetafspraak graag voorbeelden zien.",
    ],
    faq: [
      {
        question: "Werken jullie ook buiten Oldenzaal, in Noordoost-Twente?",
        answer:
          "Zeker. Naast alle Oldenzaalse wijken bedienen we onder meer Losser, De Lutte, Denekamp, Weerselo, Rossum en het omliggende buitengebied.",
      },
      {
        question: "Welke kozijnen passen bij een karakteristiek pand in de binnenstad?",
        answer:
          "Voor oudere en beeldbepalende panden adviseren we houten kozijnen of kunststof profielen met een verdiept, klassiek aanzicht — eventueel met roedes — zodat het gevelbeeld intact blijft terwijl u moderne isolatie krijgt. We stemmen het ontwerp af op de stijl van uw pand.",
      },
      {
        question: "Wat kosten nieuwe kozijnen in Oldenzaal?",
        answer:
          "Dat hangt af van materiaal, maatvoering, glaskeuze en montage. Stel uw kozijn samen in de configurator voor een directe richtprijs incl. btw, of vraag een offerte aan. De inmeetservice kost € 49 en wordt bij doorgang volledig verrekend.",
      },
      {
        question: "Wij wonen landelijk — is hout dan de beste keuze?",
        answer:
          "Hout past mooi bij landelijke architectuur, maar vraagt periodiek schilderwerk. Veel bewoners in het buitengebied kiezen daarom voor kunststof kozijnen met houtnerf-folie: nauwelijks onderhoud met een warme uitstraling. We leggen beide opties met plussen en minnen naast elkaar.",
      },
      {
        question: "Hoe lang duurt het van offerte tot geplaatste kozijnen?",
        answer:
          "Na de opmeting gaan uw kozijnen in maatwerkproductie; reken op een levertijd vanaf circa 8 weken. De montage zelf is doorgaans binnen één week afgerond, omdat we meerdere kozijnen per dag plaatsen.",
      },
    ],
  },
  {
    slug: "haaksbergen",
    naam: "Haaksbergen",
    soort: "plaats",
    metaTitle: "Kozijnen in Haaksbergen | voor dorp, erf en buitengebied",
    metaDescription:
      "Kozijnen in Haaksbergen, Buurse en Sint Isidorushoeve: kunststof, hout of aluminium op maat, incl. montage. Transparante prijzen incl. btw uit de regio.",
    heroTitel: "Kozijnen in Haaksbergen — dorps karakter, moderne isolatie",
    heroLead:
      "In de Ster van Twente staan veel vrijstaande en twee-onder-een-kapwoningen met royale raampartijen — en in het buitengebied karakteristieke erven. De Kozijnstudio levert en monteert er kozijnen op maat, vanuit onze thuisbasis in Enschede om de hoek.",
    lokaleUsps: [
      "Thuisbasis Enschede — snel ter plaatse, korte lijnen",
      "Ervaring met grote raampartijen en schuifpuien",
      "Ook in Buurse, Sint Isidorushoeve en het buitengebied",
      "Prijzen vooraf gespecificeerd, altijd incl. btw",
      "Inmeetservice € 49 — volledig verrekend bij doorgang",
      "Constructieve aanpassingen via MTB Bouw geregeld",
    ],
    plaatsen: [
      "Haaksbergen-centrum",
      "Buurse",
      "Sint Isidorushoeve",
      "Boekelo",
      "Usselo",
      "Beckum",
      "Hengevelde",
      "Goor",
      "Diepenheim",
      "Markelo",
    ],
    lokaleContext: [
      "Haaksbergen woont ruim: veel vrijstaande woningen en twee-onder-een-kappers met grote gevelopeningen, en een uitgestrekt buitengebied richting Buurse en Sint Isidorushoeve met boerderijen en erven. Grote raampartijen stellen hogere eisen aan kozijnen — aan de constructie, het glasgewicht en de isolatie. Wij zijn daarop ingericht: van brede schuifpuien tot complete gevelpartijen, inclusief het constructieve werk dat daar via MTB Bouw bij komt kijken.",
      "Voor karakteristieke panden en erven in het buitengebied denken we mee over de uitstraling: houten kozijnen voor een authentiek beeld, of onderhoudsarm kunststof met houtnerf-afwerking als u niet elke paar jaar wilt schilderen. En omdat Enschede letterlijk naast de deur ligt, zijn de lijnen kort — van inmeetafspraak tot montage werken we met hetzelfde team uit de regio.",
    ],
    faq: [
      {
        question: "Komen jullie ook in Buurse en Sint Isidorushoeve?",
        answer:
          "Ja, het hele werkgebied van de gemeente Haaksbergen hoort erbij — inclusief het buitengebied. Ook omliggende plaatsen zoals Boekelo, Beckum, Hengevelde en Goor bedienen we regelmatig.",
      },
      {
        question: "Kunnen jullie een brede schuifpui in een bestaande gevel plaatsen?",
        answer:
          "Ja. Vaak moet daarvoor de gevelopening worden vergroot en een nieuwe latei worden geplaatst — dat constructieve werk verzorgt ons moederbedrijf MTB Bouw, in dezelfde planning als de montage van de pui. U houdt één aanspreekpunt.",
      },
      {
        question: "Wat past bij een boerderij of landelijk erf?",
        answer:
          "Traditioneel is dat hout, maar kunststof kozijnen met houtnerf-folie zijn een populair alternatief: dezelfde warme uitstraling, nauwelijks onderhoud. Tijdens de inmeetafspraak bekijken we de stijl van uw pand en laten we voorbeelden van beide zien.",
      },
      {
        question: "Wat kosten nieuwe kozijnen in Haaksbergen?",
        answer:
          "De prijs is afhankelijk van materiaal, afmetingen, glas en montage. In de configurator ziet u direct een richtprijs incl. btw voor uw samenstelling; de definitieve prijs volgt na de inmeetservice (€ 49, volledig verrekend bij doorgang).",
      },
      {
        question: "Hoe snel kunnen jullie plaatsen?",
        answer:
          "Maatwerk kozijnen hebben een levertijd vanaf circa 8 weken na de opmeting. De montage plannen we aansluitend in en is doorgaans binnen één week gereed — meerdere kozijnen per dag, zodat uw woning niet onnodig lang open ligt.",
      },
    ],
  },
];

export function regioBySlug(slug: string): RegioPagina | undefined {
  return REGIO_PAGINAS.find((r) => r.slug === slug);
}

/** Public path of a regio page: the hub lives at /werkgebied, places below it. */
export function regioPad(r: Pick<RegioPagina, "slug" | "soort">): string {
  return r.soort === "regio" ? "/werkgebied" : `/werkgebied/${r.slug}`;
}

/** Place pages (soort "plaats") — used for static params, sitemap and footer. */
export const PLAATS_PAGINAS = REGIO_PAGINAS.filter((r) => r.soort === "plaats");
