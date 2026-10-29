/**
 * Werkgebied — content for the regio hub (/werkgebied) and the place pages
 * (/werkgebied/<slug>), rendered by RegioPaginaTemplate.
 *
 * Rules (docs/schrijfwijzer.md + docs/seo-strategie-2026-10.md, h5 and h10):
 *  - Je-vorm, calm tone, no superlatives.
 *  - Only verified claims (data/feiten.ts). No inspection price, delivery or
 *    installation times, reaction times, "own fitters" or subsidy amounts.
 *  - Every page is written UNIQUELY: never reuse paragraphs, USPs or FAQ
 *    answers between pages (doorway / scaled-content risk).
 *  - A place page is a service area served from Enschede, never a branch.
 *    Make that explicit in the hero lead.
 *  - No invented local projects, addresses or customer stories.
 *  - No Enschede page: the homepage serves "kozijnen Enschede".
 *  - metaTitle is the FULL title incl. " | De Kozijnstudio" (the route files
 *    use `title: { absolute: metaTitle }`).
 *
 * Adding a place = one entry here (soort "plaats"). Route, sitemap and footer
 * link follow automatically. Only add a place with real local evidence and
 * genuinely local information (h10, "Wanneer een eigen plaatspagina zin heeft").
 */

import { isdeInfo } from "@/data/subsidie";
import { company } from "@/data/company";
import { isVerified } from "@/data/feiten";

/** Visit policy — only shown while the claim is verified in data/feiten.ts. */
const BEZOEK = isVerified("bezoekOpAfspraak")
  ? ` Wil je langskomen? Een bezoek aan de ${company.adres} in ${company.plaats} kan alleen op afspraak.`
  : "";

export type RegioPagina = {
  slug: string;
  naam: string;
  soort: "regio" | "plaats";
  /** Full title, ending in " | De Kozijnstudio". */
  metaTitle: string;
  /** ~140–160 characters, je-vorm, unique per page. */
  metaDescription: string;
  heroTitel: string;
  heroLead: string;
  /**
   * Hub: what you can expect from us. Place: what we pay attention to in this
   * place. Short lines, unique per page.
   */
  lokaleUsps: string[];
  /** Places (hub) or neighbourhoods/villages (place) — shown as chips. */
  plaatsen: string[];
  /** Unique local paragraphs (2–3). */
  lokaleContext: string[];
  /** Visible FAQ on the page (no FAQPage schema). */
  faq: Array<{ question: string; answer: string }>;
};

export const REGIO_PAGINAS: RegioPagina[] = [
  {
    slug: "twente",
    naam: "Twente",
    soort: "regio",
    metaTitle: "Kozijnen in Twente en ons werkgebied | De Kozijnstudio",
    metaDescription:
      "De Kozijnstudio werkt vanuit Enschede in Twente. Bekijk ons werkgebied en bespreek de mogelijkheden voor jouw adres en project.",
    heroTitel: "Vanuit Enschede aan het werk in Twente",
    heroLead:
      "De Kozijnstudio werkt vanuit Enschede. Van daaruit leveren we kunststof, houten en aluminium kozijnen in Twente en regelen we de montage. Twijfel je of jouw adres bij ons werkgebied hoort? Vraag het ons gerust.",
    lokaleUsps: [
      "We werken vanuit Enschede; ons werkgebied is Twente",
      "Voordat er iets besteld wordt, meten we bij je thuis in",
      "Een voorstel waarin kozijn, glas, montage en eventueel bouwkundig werk apart staan",
      "We regelen de montage van je kozijnen",
      "Bouwkundig werk, zoals een opening vergroten of een nieuwe latei, via MTB Bouw",
      "Uitleg over subsidie, met een verwijzing naar de actuele voorwaarden bij RVO",
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
      "Twente heeft geen eenvormige woningvoorraad. In de steden staan vooroorlogse arbeiderswoningen en tuindorpen naast naoorlogse rijwoningen en uitbreidingswijken; in het buitengebied vind je boerderijen, erven en veel vrijstaande huizen. Welk kozijn verstandig is, hangt daardoor meer af van je woning dan van je postcode: de bouwperiode, de staat van de gevel en wat je zelf belangrijk vindt, zoals uitstraling, onderhoud of isolatie.",
      "We hebben geen vestigingen buiten Enschede. Ook Hengelo, Almelo, Oldenzaal en Haaksbergen bedienen we vanaf daar; op hun eigen pagina lees je wat er aan de woningen opvalt. Woon je in een andere plaats in Twente of net daarbuiten, neem dan contact op. Dan bespreken we of we jouw project kunnen oppakken.",
    ],
    faq: [
      {
        question: "In welke plaatsen werken jullie?",
        answer:
          "Ons werkgebied is Twente, vanuit Enschede. Denk aan Enschede, Hengelo, Almelo, Oldenzaal, Losser, Haaksbergen, Borne, Rijssen, Wierden en Denekamp, en de dorpen daaromheen. Woon je net buiten Twente? Vraag het ons; dan kijken we samen of het voor jouw project haalbaar is.",
      },
      {
        question: "Hebben jullie een vestiging in Hengelo, Almelo of Oldenzaal?",
        answer: `Nee. We werken vanuit Enschede, en die plaatsen horen bij ons werkgebied. Voor het inmeten komen we bij je thuis.${BEZOEK}`,
      },
      {
        question: "Wat kosten nieuwe kozijnen?",
        answer:
          "Dat hangt af van je woning en je keuzes: het materiaal, de maten en de indeling, het glas, en het werk in je woning, zoals demontage, afwerking en eventueel bouwkundig werk. Op de pagina Kosten lees je wat de prijs bepaalt. Met de configurator krijg je een indicatie voor een samenstelling. De prijs voor jouw situatie staat in je voorstel, na het inmeten.",
      },
      {
        question: "Doen jullie ook het bouwkundige werk?",
        answer:
          "Ja, als je woning dat vraagt. De Kozijnstudio is een handelsnaam van MTB Bouw B.V., een bouwbedrijf. Een opening vergroten, een nieuwe latei plaatsen, metselwerk herstellen of de binnenafwerking: dat kan MTB Bouw uitvoeren. In je voorstel staat het bouwkundige werk apart, zodat je ziet wat waarvoor is.",
      },
      {
        question: "Hoe gaat het verder na mijn aanvraag?",
        answer:
          "We nemen contact met je op om je wensen en je woning te bespreken. Voordat er iets besteld wordt, meten we bij je thuis in; wat het inmeten kost, hoor je vooraf. Daarna krijg je een voorstel. De planning stemmen we met je af; de levertijd staat in je voorstel.",
      },
      {
        question: "Kan ik subsidie krijgen op nieuwe kozijnen?",
        answer:
          "Dat kan, als je woning en het werk aan de voorwaarden van de ISDE voldoen. Die regeling is er voor isolatieglas, en in combinatie met dat glas ook voor isolerende deuren en panelen. Op de pagina Subsidie lees je waar je op let. De actuele voorwaarden en bedragen staan bij RVO.",
      },
    ],
  },
  {
    slug: "hengelo",
    naam: "Hengelo",
    soort: "plaats",
    metaTitle: "Kozijnen in Hengelo | De Kozijnstudio",
    metaDescription:
      "Nieuwe kozijnen in Hengelo? Lees waar je op let bij een wederopbouwpand, een huis in Tuindorp 't Lansink of een woning uit de jaren 70. Vraag een voorstel aan.",
    heroTitel: "Kozijnen in Hengelo, passend bij de bouwperiode van je woning",
    heroLead:
      "We werken vanuit Enschede; Hengelo hoort bij ons werkgebied. De stad is in lagen gebouwd, van tuindorp en wederopbouw tot grote uitbreidingswijken, en dat zie je terug in de gevels. Hier lees je waar je op let bij nieuwe kozijnen voor een woning in Hengelo.",
    lokaleUsps: [
      "De bouwperiode van je woning: tuindorp, wederopbouw of uitbreidingswijk",
      "Het gevelbeeld in Tuindorp 't Lansink, een beschermd stadsgezicht",
      "Eerst nagaan of een omgevingsvergunning nodig is, dan pas bestellen",
      "De verhouding tussen profiel en glas bij strakke, regelmatige gevels",
      "Bij een tweede generatie kozijnen: meteen het glas heroverwegen",
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
      "Hengelo laat goed zien hoe bouwperiodes elkaar opvolgen. Het centrum werd in oktober 1944 bij bombardementen grotendeels verwoest en is daarna volgens een wederopbouwplan opnieuw opgezet. Panden uit die tijd hebben vaak een strakke, regelmatige gevel. Bij nieuwe kozijnen telt daar vooral de verhouding: hoe breed het profiel is, hoe het glas is verdeeld en waar de delen zitten die open kunnen. Kunststof, hout en aluminium kunnen alle drie, elk met een eigen uitstraling.",
      "Tuindorp 't Lansink is het tegenovergestelde. Het werd begin twintigste eeuw aangelegd op initiatief van de familie Stork en is sinds 2003 een beschermd stadsgezicht. De detaillering van de gevels hoort daar bij het beschermde beeld. Wil je er kozijnen vervangen, zoek dan eerst uit of je een omgevingsvergunning nodig hebt en welke eisen de gemeente stelt. Wij denken mee over profielen en indelingen die bij het oorspronkelijke beeld passen.",
      "In uitbreidingswijken als de Hasseler Es, Groot Driene en Slangenbeek staan veel woningen uit de tweede helft van de twintigste eeuw. Daar zitten soms nog de eerste kozijnen in, of kozijnen die al eens zijn vervangen maar met glas dat niet meer van deze tijd is. Vervang je ze nu, kijk dan ook naar het glas: HR++ of triple, en wat het extra gewicht betekent voor het profiel en de delen die open kunnen.",
    ],
    faq: [
      {
        question: "Komen jullie in heel Hengelo?",
        answer:
          "Ja. Hengelo hoort bij ons werkgebied, van de binnenstad en 't Lansink tot de Hasseler Es, Groot Driene, Slangenbeek en Beckum. We hebben geen vestiging in Hengelo: je hebt contact met ons in Enschede, en voor het inmeten komen we bij je thuis.",
      },
      {
        question: "Ik woon in Tuindorp 't Lansink. Mag ik mijn kozijnen zomaar vervangen?",
        answer:
          "Niet zonder het eerst na te gaan. 't Lansink is een beschermd stadsgezicht, en daar kan voor het veranderen van kozijnen een omgevingsvergunning nodig zijn, zeker als het materiaal, de profilering of de indeling verandert. Check dit via het Omgevingsloket of bij de gemeente Hengelo voordat je iets bestelt. Wij helpen je met een kozijn dat bij het oorspronkelijke gevelbeeld past.",
      },
      {
        question: "Mijn woning is uit de jaren 70. Wat levert vervangen op?",
        answer:
          "In een deel van de woningen uit die tijd zitten nog de eerste kozijnen, soms met vroeg dubbelglas. Nieuwe kozijnen met HR++- of triple glas voelen meestal merkbaar comfortabeler: minder koude bij het raam en minder tocht. Hoeveel je op energie bespaart, hangt af van je woning en hoe je stookt; dat kunnen we vooraf niet beloven. Voor isolatieglas bestaat een landelijke regeling, de ISDE; de voorwaarden staan bij RVO.",
      },
      {
        question: "Kan ik bij nieuwe kozijnen de indeling van mijn ramen veranderen?",
        answer:
          "Meestal wel. Nieuwe kozijnen zijn een goed moment om de indeling te heroverwegen: een raam dat open kan om te luchten of schoon te maken, een vast raam waar je toch nooit aankomt, of juist een bovenlicht. Let er wel op dat de gevel rustig blijft, zeker in een rij woningen waar de buren hun oorspronkelijke indeling houden.",
      },
    ],
  },
  {
    slug: "almelo",
    naam: "Almelo",
    soort: "plaats",
    metaTitle: "Kozijnen in Almelo en West-Twente | De Kozijnstudio",
    metaDescription:
      "Kozijnen vervangen in Almelo of West-Twente? Lees hoe je een oudere woning stap voor stap verduurzaamt met nieuwe kozijnen en glas, en vraag een voorstel aan.",
    heroTitel: "Kozijnen in Almelo: verduurzamen met een duidelijk plan",
    heroLead:
      "We werken vanuit Enschede; Almelo en West-Twente horen bij ons werkgebied. Veel woningen hier stammen uit de textieltijd en de naoorlogse jaren. Nieuwe kozijnen zijn dan vaak een logische stap in het verduurzamen. We helpen je kiezen wat bij jouw woning past.",
    lokaleUsps: [
      "Waar je woning nu warmte verliest: glas, kozijn of aansluiting op de muur",
      "Ventilatie: een beter afgesloten woning moet goed kunnen luchten",
      "In één keer of in fases, met een profiel en kleur die blijven aansluiten",
      "Karakteristieke details bij oudere woningen rond het centrum",
      "Ook in West-Twente: Wierden, Rijssen en Vriezenveen",
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
      "Almelo groeide vanaf het eind van de negentiende eeuw mee met de textielindustrie. Rond het centrum staan nog woningen uit die tijd, daaromheen naoorlogse wijken en grotere uitbreidingen zoals Schelfhorst en Windmolenbroek. Wat ze vaak gemeen hebben: de kozijnen en het glas zijn het zwakke punt in de isolatie, zeker als er nog enkel glas of vroeg dubbelglas in zit. Bij de oudere woningen let je daarnaast op details als de profilering en de verdeling van het glas, zodat de gevel zijn karakter houdt.",
      "Verduurzamen met nieuwe kozijnen heeft een keerzijde die je vooraf wilt kennen. Oude kozijnen laten vaak ongemerkt lucht door; nieuwe kozijnen sluiten veel beter. Daarom hoort bij het plan ook de vraag hoe je woning ventileert: via roosters in de kozijnen, of via een ventilatiesysteem dat al in huis zit. Zo voorkom je condens en een bedompt binnenklimaat.",
    ],
    faq: [
      {
        question: "Werken jullie ook in Wierden, Rijssen en Vriezenveen?",
        answer:
          "Ja. Naast Almelo zelf, met dorpen als Aadorp en Bornerbroek, horen ook Wierden, Rijssen en Vriezenveen bij ons werkgebied. We werken vanuit Enschede. Twijfel je over jouw adres, stuur ons dan een bericht.",
      },
      {
        question: "Mijn rijwoning uit de jaren 60 is tochtig. Helpen nieuwe kozijnen?",
        answer:
          "Vaak wel, maar kijk verder dan het glas. Tocht ontstaat bij oudere woningen ook door ramen en deuren die niet meer goed sluiten en door kieren tussen het kozijn en de muur. Bij nieuwe kozijnen wordt die aansluiting opnieuw gemaakt en afgedicht. Bij het inmeten bekijken we jouw situatie, zodat je weet wat je kunt verwachten.",
      },
      {
        question: "Moet ik alle kozijnen in één keer vervangen?",
        answer:
          "Nee, dat kan ook in fases, bijvoorbeeld eerst de achtergevel en later de voorkant. In één keer betekent één keer overlast en één keer afwerken; in fases spreid je de kosten. Kies je voor fases, leg dan vooraf het profiel, de kleur en het glas vast, zodat de volgende ronde netjes aansluit.",
      },
      {
        question: "Kan ik in Almelo subsidie krijgen op nieuwe kozijnen?",
        answer:
          "De ISDE is een landelijke regeling, dus in Almelo gelden dezelfde voorwaarden als overal. Of je in aanmerking komt, hangt af van je woning, het glastype, het oppervlak en wie het werk uitvoert. Vraag daarnaast bij de gemeente Almelo na of er lokale regelingen voor verduurzaming zijn.",
      },
    ],
  },
  {
    slug: "oldenzaal",
    naam: "Oldenzaal",
    soort: "plaats",
    metaTitle: "Kozijnen in Oldenzaal en Noordoost-Twente | De Kozijnstudio",
    metaDescription:
      "Kozijnen in Oldenzaal of Noordoost-Twente? Lees waar je op let bij een pand in de binnenstad, bij roeden en bij de bereikbaarheid, en vraag een voorstel aan.",
    heroTitel: "Kozijnen in Oldenzaal, van binnenstad tot Noordoost-Twente",
    heroLead:
      "We werken vanuit Enschede; Oldenzaal en de dorpen in Noordoost-Twente horen bij ons werkgebied. Rond de Plechelmusbasiliek staan panden waar de detaillering telt, in de wijken daaromheen heb je meer vrijheid. Op deze pagina lees je waar je op let.",
    lokaleUsps: [
      "Klassieke detaillering bij panden in en rond de binnenstad",
      "Roeden en een indeling die bij de oorspronkelijke gevel passen",
      "Bereikbaarheid in smalle straten: steiger, hoogwerker en parkeren",
      "In de woonwijken: een profiel dat past bij de rest van de straat",
      "Ook in Losser, De Lutte, Denekamp, Weerselo en Rossum",
    ],
    plaatsen: [
      "Binnenstad",
      "De Thij",
      "Berghuizen",
      "De Essen",
      "Graven Es",
      "De Lutte",
      "Losser",
      "Denekamp",
      "Weerselo",
      "Rossum",
    ],
    lokaleContext: [
      "Oldenzaal heeft een compacte historische binnenstad rond de Plechelmusbasiliek. Bij oudere en beeldbepalende panden daar valt een kozijn snel op: de profilering, de verdeling van het glas en de kleur bepalen samen of de gevel klopt. Hout ligt dan voor de hand, maar een kunststof profiel met een verdiept, klassiek aanzicht kan ook passen. Welke keuze verstandig is, hangt af van het pand en van wat de gemeente op die plek toestaat.",
      "Werken in een binnenstad vraagt ook om praktische voorbereiding. Hoe komen de kozijnen bij de gevel, is er ruimte voor een steiger of hoogwerker, en mag de straat tijdelijk worden gebruikt? Voor een steiger of container op de openbare weg vraagt de gemeente soms een melding of vergunning. Daarom kijken we bij het inmeten niet alleen naar de maten, maar ook naar de straat.",
      "Buiten de binnenstad speelt het historische gevelbeeld meestal een kleinere rol. In de woonwijken rond het centrum en in de dorpen richting Losser, De Lutte en Denekamp draait de keuze vaker om isolatie, onderhoud en wat bij de rest van de straat past. Ook die dorpen bedienen we vanuit Enschede.",
    ],
    faq: [
      {
        question: "Werken jullie ook buiten Oldenzaal, in Noordoost-Twente?",
        answer:
          "Ja. Naast de wijken van Oldenzaal horen onder meer Losser, De Lutte, Denekamp, Weerselo, Rossum en het buitengebied daaromheen bij ons werkgebied. We werken vanuit Enschede en hebben geen vestiging in Oldenzaal.",
      },
      {
        question: "Welke kozijnen passen bij een karakteristiek pand in de binnenstad?",
        answer:
          "Bij oudere en beeldbepalende panden liggen houten kozijnen of kunststof profielen met een verdiept, klassiek aanzicht voor de hand, eventueel met roeden. Zo blijft het gevelbeeld intact terwijl je beter isoleert. In en rond een historische binnenstad kan de gemeente eisen stellen aan het uiterlijk; vraag dat bij de gemeente Oldenzaal na voordat je bestelt.",
      },
      {
        question: "Kan ik roeden terugbrengen in mijn ramen?",
        answer:
          "Dat kan vaak, ook als ze bij een eerdere vervanging zijn verdwenen. Bij echte roeden is het glas verdeeld in losse ruiten. Bij opliggende roeden zitten de roeden op één doorlopende ruit, wat voor de isolatie meestal gunstiger is. Welke uitvoering bij het gekozen profiel mogelijk is, bespreken we bij het advies.",
      },
    ],
  },
  {
    slug: "haaksbergen",
    naam: "Haaksbergen",
    soort: "plaats",
    metaTitle: "Kozijnen in Haaksbergen | De Kozijnstudio",
    metaDescription:
      "Kozijnen of een schuifpui in Haaksbergen, Buurse of Sint Isidorushoeve? Lees waar je op let bij grote raampartijen en erven, en vraag een voorstel aan.",
    heroTitel: "Kozijnen in Haaksbergen: ruim wonen, grote ramen",
    heroLead:
      "We werken vanuit Enschede, en Haaksbergen ligt daar direct naast. Het hoort bij ons werkgebied, net als Buurse, Sint Isidorushoeve en het buitengebied. Hier staan veel vrijstaande woningen met grote raampartijen, en daar komt bij nieuwe kozijnen net wat meer bij kijken.",
    lokaleUsps: [
      "Grote raampartijen: glasgewicht, indeling en zon",
      "Schuifpuien: past de pui in de bestaande opening of wordt die groter?",
      "Erven en boerderijen: hout of kunststof met houtnerf",
      "Bouwkundig werk bij een nieuwe opening, via MTB Bouw",
      "Ook in de kerkdorpen Buurse en Sint Isidorushoeve",
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
      "Haaksbergen woont ruim. In het dorp en de kerkdorpen staan veel vrijstaande woningen en twee-onder-een-kappers, vaak met grote raampartijen of een schuifpui naar de tuin. Groot glas stelt eisen: het is zwaar, zeker als triple glas, en het profiel en het hang- en sluitwerk moeten dat gewicht dragen. Ook de zon telt mee. Grote ramen op het zuiden of westen laten in de zomer veel warmte binnen; zonwerend glas of buitenzonwering kan dan helpen.",
      "In het buitengebied richting Buurse en Sint Isidorushoeve staan boerderijen en woningen op erven, waar vaak een warme, traditionele uitstraling bij past. Hout geeft die het meest direct, maar moet periodiek worden geschilderd. Kunststof met een houtnerfstructuur oogt ook warm en hoeft niet geschilderd te worden, al zie je van dichtbij dat het geen hout is. We leggen beide opties met hun voor- en nadelen naast elkaar.",
    ],
    faq: [
      {
        question: "Komen jullie ook in Buurse, Sint Isidorushoeve en het buitengebied?",
        answer:
          "Ja. Haaksbergen grenst aan de gemeente Enschede, waar we vandaan werken. De kerkdorpen en het buitengebied horen bij ons werkgebied, net als plaatsen in de buurt zoals Boekelo, Beckum en Hengevelde.",
      },
      {
        question: "Kan ik een raam vervangen door een schuifpui?",
        answer:
          "Vaak wel. Meestal verdwijnt dan het muurtje onder het raam en wordt de opening soms ook breder. Daarvoor is bouwkundig werk nodig, zoals een nieuwe latei; dat kan MTB Bouw uitvoeren. Of je voor de nieuwe opening een vergunning nodig hebt, hangt af van de plek in de gevel en de regels van de gemeente. Check dat via het Omgevingsloket voordat je bestelt.",
      },
      {
        question: "Past een nieuwe schuifpui in de opening van mijn oude pui?",
        answer:
          "Als de maat en de constructie het toelaten wel. Let erop dat een nieuw systeem een andere inbouwdiepte of onderdorpel kan hebben, en dat de aansluiting op de vloer en de drempel aandacht vraagt. Bij het inmeten zien we of de pui past, of dat er aan de opening iets moet gebeuren.",
      },
      {
        question: "Telt glas in een nieuwe aanbouw mee voor subsidie?",
        answer: `Nee, volgens de voorwaarden van RVO zoals wij die op ${isdeInfo.gecontroleerd} hebben gecontroleerd. De ISDE gaat over bestaand glasoppervlak; glas in een nieuwe aanbouw, dakkapel of garage telt niet mee. Vervang je ook glas in de bestaande woning, dan kan dat deel wel in aanmerking komen. Controleer de actuele voorwaarden altijd op rvo.nl.`,
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
