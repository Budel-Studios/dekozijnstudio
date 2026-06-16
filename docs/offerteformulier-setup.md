# Offerteformulier — e-mail instellen (SMTP)

Het offerteformulier (`/offerte-aanvragen`) stuurt elke aanvraag rechtstreeks
naar je mailbox via SMTP. Er wordt **niets opgeslagen** in een database — de
e-mail is het record. Je factureert apart via je boekhoudsysteem.

## 1. SMTP-gegevens verzamelen

Je hebt de SMTP-gegevens van je e-mailhosting nodig (de MTB-mailbox). Die vind
je bij je hostingprovider of in je mailclient onder "uitgaande e-mail (SMTP)":

| Gegeven | Voorbeeld | Env-variabele |
|---|---|---|
| SMTP-server | `smtp.jouwprovider.nl` | `SMTP_HOST` |
| Poort | `587` (of `465`) | `SMTP_PORT` |
| Gebruikersnaam | `info@dekozijnstudio.nl` | `SMTP_USER` |
| Wachtwoord | (mailbox-wachtwoord) | `SMTP_PASS` |
| Afzender | `info@dekozijnstudio.nl` | `OFFERTE_FROM_EMAIL` |
| Ontvanger | `offertes@dekozijnstudio.nl` | `OFFERTE_TO_EMAIL` |

## 2. `.env.local` aanmaken

1. Kopieer `.env.example` naar `.env.local` in de projectmap.
2. Vul je gegevens in.
3. Sla op en herstart de dev-server (`npm run dev`).

`.env.local` staat in `.gitignore` en wordt nooit gecommit — je wachtwoord
blijft lokaal/op de server.

## 3. Poort & beveiliging

- **Poort 587** (aanbevolen): STARTTLS. Laat `SMTP_SECURE` leeg of zet op `false`.
- **Poort 465**: directe SSL/TLS. Zet `SMTP_SECURE=true` (gebeurt automatisch).

## 4. Aflevering (belangrijk!)

Voor betrouwbare aflevering (niet in spam):

- Gebruik een **afzenderadres op je eigen domein** (`@dekozijnstudio.nl`),
  niet een gratis adres als Gmail.
- Zorg dat je domein **SPF**- en **DKIM**-records heeft. Je hostingprovider
  kan hierbij helpen.
- De `reply-to` van elke aanvraag is automatisch het e-mailadres van de klant,
  zodat je direct kunt antwoorden.

## 5. Testen

1. Open `http://localhost:3000/offerte-aanvragen`.
2. Doorloop de wizard en verstuur een test-aanvraag.
3. Controleer je inbox (`OFFERTE_TO_EMAIL`).

Komt er niets binnen? Kijk in de serverlog (terminal) — bij ontbrekende of
onjuiste SMTP-config wordt daar een melding gelogd.

## Bij livegang

Zet dezelfde environment-variabelen in je hostingomgeving (bijv. Vercel →
Project → Settings → Environment Variables). Gebruik geen `.env.local` in
productie; voer de waarden in via de hosting.
