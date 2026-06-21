# De Kozijnstudio

> De website van **De Kozijnstudio** (onderdeel van **MTB Bouw**) — de meest transparante kozijnleverancier van Nederland.

Een premium, minimalistische marketing- en informatiesite voor kozijnen (kunststof, hout, aluminium), montage en bouwkundige aanpassingen. De drie pijlers: **transparante prijzen**, **compleet ontzorgen** en **samen besparen**.

Werkgebied: start in Twente & Oost-Nederland, architectuur schaalbaar naar landelijk.

## Tech-stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19**
- **TypeScript**
- **[Tailwind CSS 4](https://tailwindcss.com)** + `@tailwindcss/typography`
- **MDX** content (`next-mdx-remote`, `gray-matter`, `remark-gfm`) voor kennisbank/content-collecties
- **Zod** voor formulier- en datavalidatie
- **Nodemailer** voor offerte-/contactmail
- Server Components voor content- en SEO-pagina's

## Lokaal draaien

Vereist Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Doel |
|---|---|
| `npm run dev` | Development-server |
| `npm run build` | Productie-build |
| `npm run start` | Productie-server (na build) |
| `npm run lint` | ESLint |

## Projectstructuur

```
app/         Routes, layouts en pagina's (App Router)
components/  Herbruikbare UI-componenten
content/     MDX-content (kennisbank e.d.)
data/        Data/CMS-driven content (prijzen, tarieven, subsidie)
lib/         Helpers en utilities
public/      Statische assets
docs/        Projectdocumentatie
```

## Conventies

- **UI-taal:** Nederlands (nl-NL). Code, bestandsnamen en commentaar in het Engels.
- **Prijzen, tarieven en subsidie zijn data/CMS-driven** — nooit hardcoded in componenten. Consumentenprijzen incl. btw, "vanaf"/indicatie duidelijk gelabeld.
- Mobile-first, WCAG AA toegankelijk; per-page SEO-metadata, Open Graph en JSON-LD.

Zie [`CLAUDE.md`](CLAUDE.md) voor het volledige projectgeheugen (merk, design-tokens, harde regels en fasering).

## Fasering

1. Design system + sitemap + wireframes
2. Marketingwebsite
3. CMS + kennisbank
4. Offerteflow + klantportaal
5. Configurator
6. Referral-dashboard + AI-assistent

## Deploy

De site is bedoeld voor deployment op **[Vercel](https://vercel.com)**, gekoppeld aan deze GitHub-repo (automatische deploys per push naar `main`).

---

© De Kozijnstudio / MTB Bouw. Privé-repository — alle rechten voorbehouden.
