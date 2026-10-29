# Schrijfwijzer De Kozijnstudio (vanaf 29-10-2026)

Geldt voor alle publieke teksten: pagina's, data-bestanden, kennisartikelen, formulieren, e-mails aan klanten. Bron: de SEO-strategie (privé, in het claude.ai-project KozijnStudio: `claude/seo-strategie-2026-10.md`) (intern, nooit publiceren).

## Toon
- **Je-vorm.** "je" als standaard, "jouw" waar het nadruk of bezit verduidelijkt ("jouw woning"), "jij" spaarzaam. Nooit "u/uw".
- Let op de inversie: *kunt u* → **kun je**, *wilt u* → **wil je**, *heeft u* → **heb je**, *bent u* → **ben je**, *zoekt u* → **zoek je**, *weet u* → **weet je**. Zonder inversie: *u kunt* → **je kunt**, *u heeft* → **je hebt**, *u bent* → **je bent**.
- Rustig, concreet, menselijk. Geen agressieve verkooptaal, geen superlatieven ("dé kozijnleverancier", "de beste", "de goedkoopste"), geen "gratis".
- Begin een uitleg met het directe antwoord; daarna de toelichting.
- Merknaam: **De Kozijnstudio** (midden in een zin: "bij De Kozijnstudio").
- Primaire actie overal: **Vraag een voorstel** → `/offerte`. Het woord "offerte" mag in lopende tekst blijven.

## Claims — alleen wat bevestigd is
Het feitenregister staat in `data/feiten.ts`. Zolang een feit `needs_confirmation` is, komt het **niet** in publieke tekst. Nu nog onbevestigd:
- Inmeetservice € 49 / verrekening → niet noemen. Wel mag: "Voordat er iets besteld wordt, meten we bij je thuis in." Kosten van inmeten: "Wat het inmeten kost, hoor je vooraf."
- Levertijd (vanaf ± 8 weken) en montageduur (binnen één week, meerdere kozijnen per dag) → niet noemen. Wel: "De planning stemmen we met je af; de levertijd staat in je voorstel."
- Montage door MTB Bouw / "eigen monteurs" → niet claimen. Wel: "We regelen de montage." Bouwkundig werk via MTB Bouw mag wél (MTB Bouw is een bouwbedrijf; De Kozijnstudio is een handelsnaam van MTB Bouw B.V.).
- Reactietermijnen ("binnen één werkdag", "binnen vijf werkdagen") → niet noemen. Wel: "We nemen contact met je op."
- Keurmerken en prestaties (KOMO, SKG**, Politiekeurmerk, Uf-/Ug-waarden, RC-klassen, "onderhoudsvrij", dealerstatus) → weglaten, tenzij het een algemeen begrip uitlegt zonder te claimen dat ons product het heeft.
- Subsidie: geen bedragen, geen "wij rekenen je subsidie uit", geen garantie op toekenning. Verwijs naar RVO (`/subsidie` voor uitleg).
- Geen verzonnen projecten, reviews, sterren, ervaringsjaren, vestigingen, showroom, garantietermijnen of klantaantallen.
- Profielmerken (Schüco, Gealan, Aluprof, Reynaers, mahonie) staan in de configurator en kozijnengids omdat die actief blijven; in marketingtekst daarbuiten niet als belofte gebruiken ("we leveren altijd Schüco").

## Geen zichtbare placeholders
Geen "[…]", "TODO", "placeholder", "volgt", "Lorem ipsum" of `<Placeholder>`-vlakken met "foto volgt" in publieke pagina's. Ontbreekt iets: laat het onderdeel weg.

## URL's (na de migratie)
`/kosten` (was /prijzen) · `/subsidie` (was /isde-subsidie) · `/kennis` en `/kennis/<slug>` (was /kennisbank) · `/werkgebied` en `/werkgebied/<plaats>` (was /kozijnen-twente, /kozijnen-<plaats>) · `/offerte` = aanvraagformulier · `/project` = projectmandje uit de configurator · nieuw: `/kozijnen-vervangen`, `/werkwijze`. Niet linken: `/diy`, `/projecten` (staan uit), `/kozijnen-enschede` (bestaat niet meer; de homepage bedient Enschede).

## Structured data
Geen `FAQPage`-schema meer (Google toont geen FAQ-resultaten meer). Vragen en antwoorden blijven gewoon zichtbaar op de pagina. Geen review- of rating-schema voor het eigen bedrijf.
