# Releasechecklist De Kozijnstudio (stand 29-10-2026)

Gebaseerd op `docs/seo-strategie-2026-10.md` h17 en h19. Alleen wat de livegang nog tegenhoudt of beperkt.

## Blokkeert de livegang
- [ ] **Definitief domein kiezen.** Code gebruikt `NEXT_PUBLIC_SITE_URL` (standaard `https://www.kozijnstudio.com`); `data/company.ts` noemt nog `www.dekozijnstudio.nl`. Kies één domein, zet het in Vercel en laat de andere variant (en www/zonder www) met één redirect doorverwijzen.
- [ ] **SMTP in Vercel instellen**: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `OFFERTE_TO_EMAIL`, `OFFERTE_FROM_EMAIL`. Zonder deze waarden toont het formulier een foutmelding (geen schijnsucces). Daarna een testaanvraag mét foto doen op productie.
- [ ] **Btw-identificatienummer** aanvullen in `data/company.ts` (staat nog als placeholder, wordt niet getoond).
- [ ] **Juridische pagina's** (privacy, algemene voorwaarden, cookiebeleid, voorwaarden aanbrengbonus) laten toetsen; open punten: e-mailprovider + verwerkersovereenkomsten, Vercel-regio, bewaartermijnen, geldigheid/betaaltermijn/annulering/garantie.
- [ ] **Previews beschermen** (Vercel Deployment Protection) en controleren dat productie géén noindex of wachtwoordmuur heeft.
- [ ] **Search Console**: domein verifiëren, `sitemap.xml` indienen, URL-inspectie op home, /kunststof-kozijnen, /kosten, /kozijnen-vervangen, /montage.

## Feitenregister (`data/feiten.ts`) — bevestigen of laten staan
Elk feit hieronder is nu verborgen. Bevestigen = status op `verified` + `bron` + `gecontroleerd`.
- [ ] Inmeetservice € 49, verrekend bij opdracht
- [ ] Levertijd vanaf ± 8 weken
- [ ] Montage meestal binnen één week, meerdere kozijnen per dag
- [ ] Montage door het team van MTB Bouw (of wie voert het uit?)
- [ ] Montageprijslijst actueel (`data/montage-prijslijst.json`) + btw-tarief via administratie → dan verschijnen de tarieven op /kosten
- [ ] Montagescope per onderdeel (`data/montage-scope.ts`) → dan verschijnt de kolom "In je voorstel" op /montage
- [ ] Profielen (Schüco, Gealan, Aluprof, Reynaers, mahonie) — staan nu wél in configurator en kozijnengids omdat die actief zijn
- [ ] Reactietermijn en offertetermijn

## Inhoud die nog ontbreekt (site werkt zonder, maar het plan vraagt erom)
- [ ] **Twee of drie echte projecten** met toestemming, eigen foto's (buiten, binnen, detail, voor) en de juiste uitvoerende partij → `data/projecten.ts`. Dan gaan /projecten en de projectpagina's vanzelf live.
- [ ] **Eén tot drie gecontroleerde calculaties** (geanonimiseerd) → `data/prijsvoorbeelden.ts` (raam, gevel, schuifpui).
- [ ] **Echte projectfoto voor de homepage-hero** (de huidige is een sfeerbeeld, geen eigen werk).
- [ ] **Namen, rollen en foto's** voor /over-ons ("De mensen achter De Kozijnstudio").
- [ ] **ISDE-bedragen**: pas tonen na overnemen van de actuele RVO-tarieven en `isdeBerekening.tarievenGecontroleerd = true`.
- [ ] **Werkgebied**: bevestig dat je in alle genoemde plaatsen en dorpen werkt (o.a. Goor, Diepenheim, Markelo, Bornerbroek, Losser, De Lutte) en controleer de wijknamen.
- [ ] **Plaatspagina's** krijgen pas echt bewijs met een gedocumenteerd project per plaats (strategie h10).
- [ ] **Glaswaarden** in de kennisartikelen (Ug HR++ ≈ 1,0–1,2, triple ≈ 0,5–0,7) laten controleren door de productverantwoordelijke.

## Google Bedrijfsprofiel (strategie h10)
- [ ] Nagaan of er al een profiel is en wie het beheert; beoordelen of De Kozijnstudio naast MTB Bouw zelfstandig in aanmerking komt.
- [ ] Websiteknop met `?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
- [ ] Reviewproces: iedereen na afronding om een eerlijke ervaring vragen, nooit met beloning (ook niet via de aanbrengbonus).

## Meten (strategie h13)
- [ ] Analytics pas toevoegen mét passende privacy-/toestemmingsinrichting; de events (`form_start`, `generate_lead`, `click_phone`, `click_whatsapp`) staan al klaar in `window.dataLayer`, zonder persoonsgegevens.
- [ ] Interne registratie van `qualified_lead`, `quote_sent`, `won_project` (CRM of eenvoudige tabel).

## Getest op 29-10-2026 (lokale productiebuild)
- Build, lint en typecheck schoon; 56 routes.
- Crawl vanaf home: geen dode interne links; elke pagina één H1, eigen title en description, absolute self-canonical, OG-beeld; geen dubbele titles of descriptions.
- Sitemap: 43 URL's, alle HTTP 200; flowpagina's, uitgeschakelde modules en interne pagina's ontbreken terecht.
- Redirects: alle oude URL's één 308 naar het juiste doel. Uitgeschakelde routes (/diy, /projecten, /styleguide, /hero-opties) en onbekende plaatsen: echte 404. /project en /bedankt: noindex.
- Structured data: geldige JSON-LD, geen FAQPage en geen eigen ratings.
- Publieke tekst: geen u-vorm, € 49, levertijd, "eigen monteurs", keurmerken, TODO of placeholders.
- Formulier (mobiel en desktop): stapvalidatie, focus naar de stapkop, foto verkleind en als bijlage ontvangen via lokale SMTP, /bedankt met samenvatting, `generate_lead` pas na bevestiging. Met SMTP uit: nette foutmelding, geen succes, geen lead-event.
- **Niet getest:** echte productie-SMTP, Vercel-deploy, Core Web Vitals/PageSpeed op productie, schermlezer, Safari/iOS (HEIC-foto's).
