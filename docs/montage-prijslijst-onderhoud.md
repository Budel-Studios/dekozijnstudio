# Montage-prijslijst onderhouden

De dynamische montageprijzen in de offerte-checkout komen uit één bestand:

**`data/montage-prijslijst.json`**

Je kunt dit bestand zelf aanpassen — geen programmeerkennis nodig. Na opslaan en
herstarten van de site (of na een nieuwe build) zijn de wijzigingen direct actief.

> Later kan hier een afgeschermd admin-scherm voor komen; dat vereist een
> database/login (nu houden we alles offline).

## Velden per regel

| Veld | Betekenis |
|---|---|
| `id` | Unieke code (niet wijzigen voor bestaande regels; gebruik kleine letters en streepjes). |
| `label` | De tekst die de klant ziet. |
| `eenheid` | `stuk`, `m2` (per m²) of `m1` (per strekkende meter). |
| `prijs` | Prijs per eenheid **excl. btw**. De site toont automatisch incl. btw. |
| `uren` | Indicatieve arbeidsuren per eenheid (voor jouw planning; niet zichtbaar voor de klant, wél in de offerte-mail). |
| `categorie` | Groep in het overzicht: `Demontage`, `Bouwkundig`, `Plaatsing`, `Afwerking` of `Overig`. |
| `optioneel` | `true` = standaard op 0 (klant vinkt zelf aan). `false` = wordt waar mogelijk vooringevuld. |
| `eenmalig` | `true` = maximaal 1 per project (bijv. inmeetservice). |
| `toelichting` | Optionele extra uitleg onder de regel. |

## Algemene instellingen (bovenin het bestand)

- `btwPercentage` — bijv. `21`.
- `prijzenExclBtw` — `true` (de prijzen in de lijst zijn excl. btw).
- `laatstBijgewerkt` — datum, bijv. `"2025-06-08"`.

## Voorbeeld: een regel toevoegen

```json
{
  "id": "horren-plaatsen",
  "label": "Inzethor plaatsen",
  "eenheid": "stuk",
  "prijs": 45,
  "uren": 0.5,
  "categorie": "Overig",
  "optioneel": true
}
```

Plak dit als nieuw object in de `"regels"`-lijst (let op de komma's tussen de regels).

## Let op

- Prijzen zijn **excl. btw** — vul de kale tarieven in.
- Wijzig de `id` van bestaande regels niet (de voorinvul-logica verwijst ernaar).
- Geldig JSON houden: dubbele aanhalingstekens, komma's tussen regels, geen komma na de laatste regel.
