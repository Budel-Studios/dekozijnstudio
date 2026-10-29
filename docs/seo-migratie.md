# URL-migratie 29 oktober 2026

Uitgevoerd op basis van `docs/seo-strategie-2026-10.md` (h5, h6, h12). Keuze eigenaar: URL's uit het plan overnemen, met permanente redirects. Alle redirects staan in `next.config.ts` (308, door zoekmachines behandeld als 301) en wijzen direct naar het inhoudelijke equivalent, zonder ketens.

| Oud | Nieuw | Toelichting |
|---|---|---|
| /prijzen | /kosten | Kostenpagina met prijsopbouw en vergelijkchecklist |
| /isde-subsidie | /subsidie | Eén blijvende subsidie-URL; jaartallen in de inhoud bijwerken |
| /kennisbank | /kennis | Kennisoverzicht |
| /kennisbank/:slug | /kennis/:slug | Slugs ongewijzigd |
| /kozijnen-twente | /werkgebied | Regio-hub |
| /kozijnen-hengelo | /werkgebied/hengelo | Plaatspagina |
| /kozijnen-almelo | /werkgebied/almelo | Plaatspagina |
| /kozijnen-oldenzaal | /werkgebied/oldenzaal | Plaatspagina |
| /kozijnen-haaksbergen | /werkgebied/haaksbergen | Plaatspagina |
| /kozijnen-enschede | / | Homepage bedient nu "kozijnen Enschede" (unieke Enschede-context staat op de homepage) |
| /offerte-aanvragen | /offerte | Aanvraagformulier "Vraag een voorstel" (3 stappen) |
| /referral | /aanbrengbonus | Oude route bestond al niet meer; redirect voor eventuele oude links |
| /offerte (projectmandje) | /project | Flowpagina, noindex. Geen redirect: /offerte is nu het formulier |

## Nieuw
- `/kozijnen-vervangen`, `/werkwijze` (P0)
- `/bedankt` (noindex, niet in sitemap)
- `/projecten/<slug>` (template; route geeft 404 zolang `data/projecten.ts` leeg is)

## Uit de publieke build (echte 404, buiten menu en sitemap)
- `/diy` — module uit (`MODULES.diy` in `lib/site.ts`) tot voorwaarden en verantwoordelijkheden vastliggen
- `/projecten` — geen echte cases; aan zodra `data/projecten.ts` gevuld is
- `/styleguide`, `/hero-opties` — interne designpagina's, alleen zichtbaar in development

## Controleren na livegang
1. Search Console: sitemap opnieuw indienen, URL-inspectie op de kernpagina's.
2. De oude URL's hierboven testen op één redirect naar de nieuwe URL (geen keten, geen 404).
3. Na een paar weken in Search Console nagaan of de oude URL's uit de index verdwijnen en de nieuwe worden opgepakt.
