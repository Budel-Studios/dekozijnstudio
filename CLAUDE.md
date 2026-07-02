# CLAUDE.md — De Kozijnstudio

> Projectgeheugen voor Claude Code. Lees dit aan het begin van elke sessie. Bevat bedrijf, merk, stack, conventies en harde regels.

## Bedrijf
- **Naam:** De Kozijnstudio (onderdeel van **MTB Bouw**).
- **Tagline:** "De meest transparante kozijnleverancier van Nederland." *(merkclaim — onderbouwbaar houden of verdedigbaar herformuleren i.v.m. misleidende-reclameregels)*
- **Missie:** de kozijnenmarkt is ondoorzichtig; wij maken prijzen en proces volledig transparant en ontzorgen compleet.
- **Werkgebied:** start in Twente & Oost-Nederland, architectuur schaalbaar naar landelijk.
- **Doelen:** 1) leads genereren, 2) vertrouwen opbouwen, 3) klanten informeren.

## Drie pijlers (rode draad door site, branding en UX)
1. **Transparante prijzen** — kozijn-, montage-, materiaal- en bouwkundige kosten + subsidie + compleet investeringsoverzicht. Geen verborgen kosten of marges.
2. **Compleet ontzorgen** — via MTB Bouw ook bouwkundig werk: montage, levering-only, DIY-support, openingen vergroten, constructieve aanpassingen, metselwerk, lateien, binnenafwerking, renovatie. Eén bedrijf, één planning, één verantwoordelijkheid.
3. **Samen besparen** — lage overhead via AI/automatisering/slimme workflows; besparing terug naar klant. Referral: 3% per nieuwe klant, tot 25% cashback op eigen project (verwijst naar aparte voorwaarden).

## HARDE REGELS (altijd toepassen)
- **Taal:** alle UI-teksten en content in **Nederlands (nl-NL)**. Code, bestandsnamen en commentaar in Engels.
- **Prijzen:** consumentenprijzen **incl. btw**, "vanaf"/indicatie altijd duidelijk gelabeld. Prijzen, prijstabellen en montagetarieven **data/CMS-driven**, nooit hardcoded in componenten.
- **Subsidie (ISDE e.d.):** CMS-driven, voorzien van datum + disclaimer + link naar RVO. **Geen bedragen hardcoden** (regels wijzigen jaarlijks).
- **Referral:** mechaniek uitleggen, maar bedragen/voorwaarden via een los, makkelijk aanpasbaar voorwaarden-document; geen financiële claims als feit.
- **Geen verzonnen content:** ontbrekende prijzen, foto's, cijfers en levertijden als duidelijke placeholder markeren.
- **IP:** Kozijn.nl en concurrenten alleen als inspiratie/structuur gebruiken — originele teksten en eigen design, niets kopiëren.

## Merk & design system (premium, minimal, vertrouwd)
Stijl: modern, minimalistisch, premium, Scandinavisch, Apple-achtige eenvoud. Veel witruimte, grote beelden, glas-en-hout-esthetiek. Géén agressieve salestaal; heldere uitleg. **Let op: dit is een ánder, strakker merk dan MTB Bouw (heritage/workwear).**

Design-tokens (Tailwind/CSS — stem af op het echte logo):
| Token | Hex (voorstel) | Gebruik |
|---|---|---|
| `ink` (antraciet) | `#23272A` | Tekst, donkere secties |
| `paper` | `#FFFFFF` / `#F7F6F3` | Achtergronden |
| `wood` (natuurlijk hout) | `#C9A36B` | Warme accenten, beeldkaders |
| `forest` (donkergroen) | `#2F4A3C` | Accent, CTA's |
| `mist` | `#E7E5E0` | Lijnen, vlakken |
| `lime` (MTB Bouw) | `#ABE000` | Subtiele merksignatuur — alleen als vlak/streepje/punt of als tekst op donkere achtergrond (te laag contrast op wit) |

> **REBRAND 2026 (actief — vervangt bovenstaande tabel):** donkergroen + lime + mint, Swiss grotesque, **volledig hoekig**, glasmorfisme-accenten. Tokennamen zijn behouden, alleen de waarden hermapt in `app/globals.css`:
> | Token | Nieuw | Gebruik |
> |---|---|---|
> | `ink` | `#15302B` (donkergroen) | tekst & donkere secties |
> | `paper` | `#FFFFFF` | kaarten / glas |
> | `paper-soft` / `mint` | `#E6F1E8` | **pagina-basis** (body) & rustige secties |
> | `lime` | `#ABE000` (MTB-lime) | accent + **primaire CTA** (tekst = `ink`); hover `lime-hover` `#9BCC00` |
> | `forest` | `#1E4A3C` | links / secundaire accenten |
> | `wood` | `#5C7568` (salie) | voorheen hout → gedempt groen accent (eyebrow-tekst) |
> | `mist` | `#CBDDD0` | mint-grijze lijnen |
>
> - **Font:** Hanken Grotesk via `next/font` (vrij alternatief voor Suisse Int'l; `--font-grotesk` → `--font-sans`/`--font-display`). Suisse Int'l kan later self-hosted.
> - **Hoekig:** alle radius-tokens `0px` + globale regel `[class*="rounded"]{border-radius:0!important}`.
> - **CTA:** primaire knop = lime met donkergroene tekst.

Typografie: strakke, moderne sans (bv. `Inter` of `Geist` voor body; een verfijnde display-sans voor koppen). Ruime line-height, duidelijke type-schaal.

## Tech & conventies
- **Next.js (App Router) + TypeScript + TailwindCSS.** Server Components voor content/SEO-pagina's.
- **Supabase** voor data/auth/storage (offertes, portaal, configurator-data, referral) — toe te voegen vanaf fase 4.
- Herbruikbare componenten, mobile-first responsive, WCAG AA toegankelijk (semantische HTML, alt, focus, contrast).
- SEO: per-page metadata, Open Graph, JSON-LD (`Organization`/`LocalBusiness`, `FAQPage`, `Article` voor kennisbank), sitemap.xml, robots.txt, schone URL-slugs (nl).
- Performance: `next/image`, lazy-loading, statische generatie waar mogelijk.
- CMS-ready: content (kennisbank, prijzen, subsidie) via MDX content-collecties óf Supabase-tabellen — losgekoppeld van de componenten.
- Schaalbaar voor latere modules: klantlogin, configurator, projecttracking, document-upload, planning, referral-dashboard, AI-chatbot, online inmeten, subsidiecalculator.

## SEO-doelkeywords
kozijnen · kunststof kozijnen · houten kozijnen · aluminium kozijnen · schüco kozijnen · gealan kozijnen · kozijnen plaatsen · kozijnen prijzen · kozijnen twente · kozijnen oost nederland · isde subsidie kozijnen · kozijnen offerte

## Producten (referentie)
- Materialen: PVC, hout, aluminium.
- Profielen: Schüco (primair), Gealan, Aluprof, Reynaers, Meranti (hout).
- Producten: vaste ramen, draaikiepramen, voordeuren, achterdeuren, schuifpuien/-systemen, complete beglazing.

## Vaste feiten (CMS-instelbaar)
- Inmeetservice: €49, volledig verrekend bij doorgang.
- Levertijd: vanaf ± 8 weken. Montage doorgaans binnen één week; meerdere kozijnen per dag om overlast te beperken.
- Betaling: kleine aanbetaling voor maatwerk, montage achteraf.

## Sitemap
Home · Over ons · Kunststof kozijnen · Houten kozijnen · Aluminium kozijnen · Montage · DIY · Bouwkundige aanpassingen · ISDE-subsidie · Prijzen · Referral · Projecten · Kennisbank · FAQ · Contact · Offerte aanvragen · (later) Klantportaal · (later) Configurator.

## Fasering (zie aparte fase-prompts)
1. Design system + sitemap + wireframes. 2. Marketingwebsite. 3. CMS + kennisbank. 4. Offerteflow + klantportaal. 5. Configurator. 6. Referral-dashboard + AI-assistent.
**Bouw per fase; niet alles in één keer. Stop aan het eind van elke fase en wacht op review.**

---

## Gemaakte keuzes & status (bijwerken per fase)

### Omgeving
- Projectlocatie: `C:\dev\dekozijnstudio` (bewust buiten OneDrive i.v.m. node_modules sync/locks).
- Node.js LTS (v24) + npm. Next.js 16 (App Router), React 19, **TailwindCSS v4** (CSS-based `@theme` in `app/globals.css`, géén `tailwind.config.js`).
- Let op: dit is Next.js 16 met breaking changes — zie `AGENTS.md` / `node_modules/next/dist/docs/` voor afwijkingen t.o.v. oudere versies.

### Fase 1 — afgerond (fundament)
- **Design-tokens** in `app/globals.css` onder `@theme` (kleuren ink/paper/paper-soft/wood/forest/mist + **lime `#ABE000` = MTB Bouw merkaccent**, type-schaal `display-sm|display|display-lg`, radius `card|pill`, shadow `soft`). Light-only merk (geen dark mode).
- **MTB-lime gebruikt als subtiel accent** (keuze gebruiker): logo-puntje (header + footer), lime streepje in elke `Eyebrow` (`components/ui/eyebrow.tsx`), en de tekstselectie-highlight. NB: lime heeft te laag contrast als tekst op wit → alleen als vlak/streepje/punt of op donkere achtergrond. CTA-kleur blijft `forest`.
- **Fonts** via `next/font`: **Inter** (body, `--font-inter` → `font-sans`), **Sora** (display/koppen, `--font-sora` → `font-display`).
- **Componentbibliotheek** in `components/`:
  - `ui/`: `Button` (primary/secondary/ghost · sm/md/lg · polymorf link/button), `Container`, `Section` (tone paper/soft/ink), `Card` (+Eyebrow/Title/Body), `Breadcrumbs`, `FAQ` (native `<details>`, geen client-JS), `PriceTable` (shell, data-driven rows, "vanaf" + incl. btw), `Hero` (shell), `Placeholder` + `PlaceholderTag`.
  - `site-header.tsx` (client; volledige sitemap, desktop dropdowns + mobiel menu), `site-footer.tsx`, `wireframe-stub.tsx`, `icons.tsx`.
- **Navigatie/sitemap** als single source of truth in `lib/navigation.ts`. Placeholder-copy in `lib/placeholder.ts`. Helper `cn` in `lib/utils.ts`.
- **Routes**: alle sitemap-pagina's als stubs (`/`, `/over-ons`, `/kunststof|houten|aluminium-kozijnen`, `/montage`, `/diy`, `/bouwkundige-aanpassingen`, `/isde-subsidie`, `/prijzen`, `/referral`, `/projecten`, `/kennisbank`, `/faq`, `/contact`, `/offerte-aanvragen`) + **`/styleguide`** (toont alle tokens en componenten).
- **NIET in fase 1** (volgt later): echte copy, echte prijzen, per-page SEO-metadata/OG/JSON-LD, sitemap.xml/robots.txt, CMS, Supabase/backend.

### Fase 2 — afgerond (marketingwebsite)
- Alle 16 marketingpagina's uitgebouwd met echte nl-NL copy.
- Per-page `metadata` (title, description, canonical, OG), Organization JSON-LD sitebreed, FAQPage JSON-LD op /faq.
- `data/prices.ts` (prijsdata, nooit hardcoded in components), `data/subsidie.ts` (ISDE-info, gedateerd juni 2025, disclaimer + RVO-link).
- `sitemap.xml` + `robots.txt` via Next.js App Router (`app/sitemap.ts`, `app/robots.ts`).
- Header herbouwd: glassmorphism floating header, ink top-bar met lime trust-dots, mega menu met trust-signalen (keuze gebruiker), lime underline-animatie, mobiel accordion-menu.
- Mega-menu data in `lib/mega-menu.ts`.

### Fase 3 — afgerond (CMS + kennisbank)
- **Content-laag**: MDX-bestanden in `content/kennisbank/*.mdx`, gelezen via `lib/content.ts` (gray-matter, fs). Swap-baar naar Supabase in fase 4+. How-to staat als comment in `lib/content.ts`.
- **Packages**: `next-mdx-remote` (RSC), `gray-matter`, `@tailwindcss/typography`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`.
- **8 kennisbank-artikelen** (nl-NL, SEO-geoptimaliseerd): wat-kosten-kozijnen, pvc-hout-aluminium, isde-subsidie-kozijnen, zelf-kozijnen-plaatsen, levensduur-kozijnen, hr-plus-plus-triple-glas, montageproces, bouwkundige-aanpassingen-kozijnen.
- **Artikel-template** (`app/kennisbank/[slug]/page.tsx`): MDXRemote rendering, TOC sidebar (desktop, `components/kennisbank/article-toc.tsx`), Article JSON-LD + BreadcrumbList JSON-LD, gerelateerde artikelen (`components/kennisbank/related-articles.tsx`), in-article CTA box.
- **Kennisbank-index** (`app/kennisbank/page.tsx`) is volledig dynamisch — lees `getAllArticles()` uit content-laag, gegroepeerd per categorie.
- **TOC-extractie**: `lib/toc.ts` — parst `## / ###` headings, genereert IDs conform github-slugger (matcht rehype-slug output).
- **Article JSON-LD**: `articleSchema()` toegevoegd aan `lib/jsonld.ts`.
- **Typography**: `@tailwindcss/typography` geladen via `@plugin` in globals.css, custom prose-overrides voor brand-kleuren (lime bullets, forest links, Sora headings).
- Nieuw artikel toevoegen: maak `content/kennisbank/<slug>.mdx` met verplichte frontmatter (title, description, date, category, related, readTime, keywords). Pagina verschijnt automatisch.

### Fase 4 — afgerond (offerteflow, vereenvoudigd)
- **Scope-wijziging (keuze gebruiker):** GEEN Supabase, GEEN klantlogin/portaal, GEEN checkout. Alleen een meerstaps offerteformulier dat per **SMTP** naar de mailbox mailt. Facturatie gebeurt apart via het boekhoudsysteem.
- **Wizard** (`components/offerte/offerte-wizard.tsx`, client): 6 stappen — product → maat/aantal → uitvoering → bouwkundig → contact → samenvatting. Per-stap validatie, progress-bar (lime), successcherm. Honeypot-veld tegen spam.
- **Validatie**: zod v4 schema in `lib/offerte-schema.ts` (gedeeld client + server). AVG: minimale data + verplicht privacy-akkoord.
- **Verzending**: `lib/email.ts` (Nodemailer, `import "server-only"`), aangeroepen via server action `app/offerte-aanvragen/actions.ts`. Reply-to = e-mail van de klant. Nette HTML-mail in brand-stijl. Niets wordt opgeslagen — de e-mail is het record.
- **Config** via env (`.env.example` → `.env.local`): `SMTP_HOST/PORT/SECURE/USER/PASS`, `OFFERTE_FROM_EMAIL`, `OFFERTE_TO_EMAIL`. Zonder config: server action logt reden en geeft nette foutmelding. Setup-gids: `docs/offerteformulier-setup.md`.
- **Packages toegevoegd**: `nodemailer`, `@types/nodemailer`, `zod`, `server-only`.
- **Nog te doen door gebruiker**: `.env.local` invullen met SMTP-gegevens om live te versturen; daarna testen via `/offerte-aanvragen`.

### Fase 5 — afgerond (kozijnconfigurator)
- **Eigen module/route** `/configurator` (`components/configurator/configurator.tsx`, client). 7 stappen: materiaal+profiel → producttype → afmetingen → glas → afwerking+opties → uitvoering → resultaat. Voortgangsbalk (lime) + **live samenvatting-sidebar** met meelopende richtprijs.
- **Config-driven prijsmodel**: data in `data/configurator.ts` (PLACEHOLDER richtprijzen, incl. btw — vervangen vóór livegang), pure berekening in `lib/configurator-price.ts` (basis = materiaal × producttype-factor, + glas/m², + afwerking-%, + opties/stuk, + montage/stuk, × aantal). Richtprijs met prominente disclaimer (niet bindend; echte prijs na inmeting).
- **Koppeling met offerteflow (fase 4)**: `lib/configurator-handoff.ts` schrijft een handoff-object (prefill + leesbare samenvatting incl. richtprijs) naar `sessionStorage` (key `kozijn-configuratie`). De offerte-wizard leest dit on mount, prefilt materiaal/producttype/aantal/uitvoering, toont een "configuratie geladen"-banner, en stuurt de volledige samenstelling mee in de e-mail (nieuw optioneel veld `configuratie` in `lib/offerte-schema.ts`, gerenderd in `lib/email.ts`). GEEN Supabase (conform fase 4-scope).
- **Navigatie**: `/configurator` toegevoegd aan header (direct links) + footer (infoLinks) + sitemap.

#### Fase 5+ — live tekening & kleuren (uitbreiding, keuze gebruiker, Kozijn.nl-stijl)
- **Live SVG-tekening** `components/configurator/kozijn-preview.tsx`: schematisch 2D-aanzicht dat live meebeweegt met de configuratie. Reflecteert producttype (indeling + opening-symbolen: draaikiep-driehoeken, schuifpui-pijl, vouwwand-panelen, deurpaneel+greep), materiaal (**profieldikte** via `PROFIEL_DIKTE` in data — aluminium dunner, kunststof/hout dikker), afmetingen (verhouding + maatlijnen in cm), en kleur (profielkleur). Staat in de sticky sidebar; op mobiel bovenaan (CSS `order`).
- **Kleurenpalet met echte swatches**: `CONFIG_AFWERKING` vervangen door **`CONFIG_KLEUREN`** in `data/configurator.ts` — elk met `hex`, `ral`, `category` (standaard/ral/hout) en `surchargePct`. De config-stap "Afwerking" heet nu "Kleur" en toont kleurrondjes gegroepeerd per categorie. Veld `KozijnConfig.afwerking` → **`kleur`** (in price + handoff + component bijgewerkt).
- Supabase blijft offline (keuze gebruiker): "eerst alles offline, later bekijken of een database nodig is".

#### Productcatalogus / "webshop" (keuze gebruiker, Kozien.nl-model)
- **Doel**: laagdrempelige webshop-achtige instap die doorlinkt naar de configurator (geen checkout/betaling).
- **Preset-data** in `data/preset-configuraties.ts`: ~50 voorgeconfigureerde samenstellingen, gegroepeerd in families (Vast glas, Draaikiepraam, Openslaande ramen, Valramen, Tuindeuren, Voordeuren, Achterdeur, Schuifpuien) met een `categorie` (ramen/deuren/schuifpuien). Elke preset is een **layout-boom** (`Cell`) + een `configType` (dichtstbijzijnde CONFIG_PRODUCTTYPES-waarde voor prijs + "Stel samen"). **"Vanaf"-prijzen** via `presetVanafPrice()` (computePrice met kunststof · HR++ · wit · zonder montage op standaardmaat) — richtprijs incl. btw, PLACEHOLDER met disclaimer. Géén hardcoded prijzen.
- **Compositie-tekening** (`components/configurator/preset-preview.tsx`): recursieve SVG-renderer die elke layout-boom tekent (zijlichten, bovenlichten, meerdere vlakken, dubbele draaikiep, deuren) op een **vast canvas zonder maatlijnen** → alle kaartplaatjes even groot. De configurator zelf gebruikt nog `kozijn-preview.tsx` (enkelvoudig, mét maatlijnen).
- **Productkaart** (`components/catalog/preset-card.tsx`): `PresetPreview` in een vaste-hoogte beeldvak + naam + "vanaf"-prijs. Klik → `/configurator?type=<configType>`.
- **Routes**: `/producten` (hub met 3 categoriesecties) + `/producten/[categorie]` (ramen/deuren/schuifpuien, SSG). 
- **Deep-link voorselectie**: `app/configurator/page.tsx` is nu async, leest `searchParams.type`, valideert tegen CONFIG_PRODUCTTYPES en geeft `initialProducttype` door; `Configurator` toont dan een "Gekozen product"-banner en preselecteert het type. (configurator-route is hierdoor dynamic ƒ).
- **Homepage**: `components/catalog/featured-products.tsx` ("Meest gekozen / Populaire producten") met de `featured`-producten.
- **Navigatie**: productcategorieën toegevoegd aan het **Kozijnen mega menu** (`lib/mega-menu.ts`, CTA → /producten) + footer `productLinks` + sitemap.
- **Geen verzonnen reviews/sterren** (CLAUDE-regel) — bewust weggelaten.

#### MTB Bouw-verwijzing (keuze gebruiker: sterk + eigen pagina)
- **Doel**: De Kozijnstudio sterk positioneren als onderdeel van **MTB Bouw** (moederbedrijf + betrouwbare bouwpartner voor renovatie/verbouw). Uitgelichte diensten (keuze gebruiker): **Verbouw & Renovatie** en **Aan- & Uitbouw**. Diensten ontleend aan mtbbouw.com — geen verzonnen claims.
- **Content-data**: `data/mtb-bouw.ts` (MTB_URL, featured services, volledige dienstenlijst, klantvoordelen).
- **Herbruikbaar blok**: `components/mtb-bouw-band.tsx` met `tone`-prop (paper/soft/ink, incl. dark-variant). Geplaatst op **home** (tone ink), **montage** en **bouwkundige-aanpassingen** (tone paper) — telkens vóór de slot-CTA.
- **Eigen pagina** `/mtb-bouw` (`app/mtb-bouw/page.tsx`): partnerschap, uitgelichte diensten + volledige lijst (pills), klantvoordelen, CTA's naar mtbbouw.com en offerte.
- **Navigatie**: toegevoegd aan Diensten mega menu (`lib/mega-menu.ts`), footer companyLinks, en de **footer-brandkolom** met een echte link-box naar /mtb-bouw + mtbbouw.com. Op /over-ons een extra "Over het partnerschap"-knop. Sitemap bijgewerkt.

#### Checkout-offerte `/offerte` + dynamische montage + ISDE (keuze gebruiker)
- **Doel**: checkout-achtige offertepagina (kozien.nl-logica, eigen uitvoering) met volledig prijsoverzicht. **Geen betaling** — verstuurt per SMTP (zoals fase 4). Coëxisteert met het korte formulier (`/offerte-aanvragen` blijft als 'snelle offerte').
- **Flow**: configurator-CTA routet nu naar **`/offerte`** (i.p.v. /offerte-aanvragen). Handoff (`lib/configurator-handoff.ts`) bevat nu ook de volledige `config` (KozijnConfig) naast prefill + summary, via sessionStorage.
- **Onderhoudbare montage-prijslijst**: **`data/montage-prijslijst.json`** (door eigenaar zelf te bewerken; admin-scherm later met backend). Prijzen **excl. btw**; site toont **incl. btw**. Doc: `docs/montage-prijslijst-onderhoud.md`. Logica in `lib/montage.ts` (laden, `montagePrefill(config)` slim voorinvullen uit configuratie, `computeMontage`).
- **Berekening**: `lib/checkout.ts` — `computeCheckout(config, aantallen)` combineert productprijs (configurator, excl. configurator-montage) + montage (prijslijst) + **ISDE**. Btw consistent: subtotaal/btw/totaal, alles incl. btw getoond met "waarvan btw".
- **ISDE-sectie (automatisch)**: `computeIsde(config)` o.b.v. glas-m² × tarief uit `data/subsidie.ts` → `isdeBerekening` (PLACEHOLDER tarieven `ratePerM2` hr-plus/triple, `minM2`, gedateerd + disclaimer + RVO-link). Alleen bij HR++/triple. **Verwijst altijd naar MTB Bouw** voor de wettelijke combinatie-eis (andere isolatiemaatregelen) — link naar /mtb-bouw. Toont minimum-drempelwaarschuwing.
- **UI**: `components/offerte/checkout.tsx` (client) — 4 secties (product / montage / ISDE / gegevens) + sticky prijsoverzicht. Klant past montage-aantallen aan (voorin­gevuld). Skeleton in productblok tot config uit sessionStorage geladen is (geen hydration-mismatch).
- **Verzending**: server action `app/offerte/actions.ts` → `sendCheckoutEmail` in `lib/email.ts` (herberekent server-side, nette HTML-mail met klant + configuratie + montage-regels + uren + volledig prijsoverzicht). `/offerte` is `robots: noindex` (flow-pagina).

#### Project-mandje, montage in configurator, betaalsplitsing & Aanbrengbonus (keuze gebruiker)
- **Montage volledig in de configurator**: nieuwe stap "Montage" (volledige prijslijst-regels, vooringevuld via `montagePrefill`, bevroren zodra de klant iets aanpast). DIY/levering → geen montage. Gedeelde componenten: `components/offerte/montage-editor.tsx` en `components/offerte/price-summary.tsx` (gebruikt in configurator én /offerte). Configurator-zijbalk toont nu het **volledige live prijsoverzicht**.
- **/offerte = "Jouw project" (mandje)**: toont kozijn + montage per onderdeel + ISDE + volledig prijsoverzicht. Handoff (`configurator-handoff.ts`) draagt nu ook `montageAantallen` mee.
- **Betaalmodel** (`computeCheckout` in `lib/checkout.ts`): **bruto** (product + montage incl. btw, = wat aan ons betaald wordt), **ISDE** als aparte RVO-teruggave → **netto investering**. **Aanbetaling** = `AANBETALING_KOZIJN_AANDEEL` (0.8) × kozijnprijs (in `data/prices.ts`; intern ≈ inkoopprijs, NOOIT zo naar klant communiceren — alleen "maatwerkproductie"). **Restant bij oplevering** = bruto − aanbetaling. Email (`sendCheckoutEmail`) toont bruto/netto/aanbetaling/restant.
- **Referral → "Aanbrengbonus"**: route `/referral` hernoemd naar **`/aanbrengbonus`** (oude verwijderd). Nadruk: draag **binnen 12 maanden** (aanbrengjaar) iemand aan → 3% per klant, tot 25% cashback. Bijgewerkt: navigatie (companyLinks), sitemap, home-pijler.
- **Mega menu hover definitief gefixt**: `onMouseLeave`/`onMouseEnter` staan nu op het hele `<header>` (paneel is DOM-kind van header → hoveren ervan triggert nooit sluiten). Directe links sluiten het paneel bij hover. Plus klik-om-te-openen op de triggers (touch-vriendelijk) en sluiten bij navigatie. Sluit-vertraging 160 ms als extra marge.
- NB: na het verwijderen van een route de stale typecache opruimen (`.next/types`, `.next/dev/types`) en dev-server herstarten, anders faalt `next build` op een verwijzing naar de oude route.

#### Juridische pagina's (concept, te toetsen)
- **Pagina's**: `/privacy` (AVG-privacyverklaring), `/algemene-voorwaarden`, `/cookiebeleid`, `/aanbrengbonus-voorwaarden`. Gedeelde lay-out `components/legal/legal-layout.tsx` met **concept-disclaimer** (juridisch te toetsen vóór livegang) + prose-styling.
- **Bedrijfsgegevens** centraal in `data/company.ts` — PLACEHOLDER-velden (KvK, adres, e-mail, telefoon) tussen [haken], nog invullen. `LEGAL_LAST_UPDATED` voor de datum.
- **Koppelingen**: footer-onderbalk toont nu de juridische links (`legalLinks` in `navigation.ts`); privacy-consent in offerte-wizard én checkout linkt naar `/privacy`; aanbrengbonus-pagina linkt naar de voorwaarden. Sitemap bijgewerkt.
- **Belangrijk**: dit zijn concepten met placeholders — geen verzonnen juridische feiten als definitief; laat toetsen door een jurist en vul bedrijfsgegevens in.

#### Lokale SEO-landingspagina's (regio)
- **Routes**: `/kozijnen-twente` (regio) en `/kozijnen-enschede` (plaats) — statisch, gericht op "kozijnen twente"-achtige zoektermen.
- **Data-driven**: alle content per pagina in `data/regio.ts` (`REGIO_PAGINAS`); gedeelde template `components/regio/regio-pagina.tsx` (hero, lokale USP's, werkgebied-chips, materialen, unieke lokale context, FAQ + FAQPage/Breadcrumb JSON-LD, CTA).
- **Anti-doorway-regel**: lokale alinea's en FAQ zijn per pagina uniek geschreven — nooit gedeelde lappen tekst hergebruiken bij nieuwe plaatsen.
- **Nieuwe plaats toevoegen** = entry in `data/regio.ts` + dun page-bestand `app/kozijnen-<plaats>/page.tsx` + regel in `app/sitemap.ts` + link in `werkgebiedLinks` (`lib/navigation.ts`, footer "Werkgebied").
- Projectfoto's per regio zijn nog Placeholder — echte foto's volgen.

@AGENTS.md
