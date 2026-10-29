import Link from "next/link";
import { LegalLayout } from "@/components/legal/legal-layout";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { MODULES } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cookiebeleid",
  description:
    "De Kozijnstudio plaatst geen tracking- of analysecookies. Lees welke opslag in je browser de website wel gebruikt, waarvoor, en hoe je die zelf wist.",
  path: "/cookiebeleid",
});

/* Keep in sync with lib/project-cart.ts, lib/track.ts and the /bedankt confirmation. */
export default function CookiebeleidPage() {
  return (
    <LegalLayout
      title="Cookiebeleid"
      intro="We houden het eenvoudig: de website plaatst geen tracking-, analyse- of advertentiecookies."
      path="/cookiebeleid"
      lastUpdated="oktober 2026"
    >
      <h2>1. Wat zijn cookies?</h2>
      <p>
        Cookies zijn kleine tekstbestanden die een website op je apparaat kan zetten. Een website
        kan ook gegevens bewaren in de opslag van je browser (local storage of session storage).
        Dat werkt vergelijkbaar, maar de gegevens blijven op je eigen apparaat.
      </p>

      <h2>2. Welke cookies gebruiken we?</h2>
      <p>
        Op dit moment gebruiken we <strong>geen tracking-, analyse- of advertentiecookies</strong>.
        We volgen je niet op deze website of op andere websites, en er is geen analysetool actief.
        Daarom vragen we je ook niet om toestemming voor cookies.
      </p>
      <p>
        De website houdt bij welke knoppen worden gebruikt, zoals het starten van het formulier.
        Die informatie blijft in je browser en wordt nergens naartoe gestuurd.
      </p>

      <h2>3. Opslag in je browser</h2>
      <p>Voor een paar functies bewaart de website gegevens in je eigen browser:</p>
      <ul>
        {MODULES.configurator && (
          <li>
            <strong>Je project uit de configurator</strong> (local storage). Zo blijven de kozijnen
            die je samenstelt bewaard en kun je later verder. Dit blijft op je apparaat totdat je
            de kozijnen uit je project verwijdert of je browsergegevens wist. Wij ontvangen het pas
            als je je project zelf verstuurt.
          </li>
        )}
        <li>
          <strong>De bevestiging na je aanvraag</strong> (session storage). Na het versturen van
          het formulier bewaart je browser kort een samenvatting van je aanvraag, zonder
          contactgegevens, om die op de bevestigingspagina te tonen. Die verdwijnt als je het
          tabblad sluit.
        </li>
      </ul>
      <p>
        Deze opslag is nodig voor functies waar je zelf om vraagt. Je kunt hem altijd wissen via de
        instellingen van je browser.
      </p>

      <h2>4. Als er iets verandert</h2>
      <p>
        Gaan we later analyse- of andere cookies gebruiken, dan vragen we eerst je toestemming
        voordat die cookies worden geplaatst, en passen we dit cookiebeleid aan.
      </p>

      <h2>5. Vragen?</h2>
      <p>
        Heb je een vraag over dit cookiebeleid? Mail naar{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>. Hoe we verder met je gegevens
        omgaan, lees je in onze <Link href="/privacy">privacyverklaring</Link>.
      </p>
    </LegalLayout>
  );
}
