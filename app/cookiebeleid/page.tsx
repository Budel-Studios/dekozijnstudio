import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description:
    "Het cookiebeleid van De Kozijnstudio: welke cookies en lokale opslag wij gebruiken en waarom.",
  alternates: { canonical: "/cookiebeleid" },
};

export default function CookiebeleidPage() {
  return (
    <LegalLayout
      title="Cookiebeleid"
      intro="Wij houden het bewust eenvoudig: onze website plaatst geen tracking- of advertentiecookies."
    >
      <h2>1. Wat zijn cookies?</h2>
      <p>
        Cookies zijn kleine tekstbestanden die een website op uw apparaat kan opslaan.
        Daarnaast kan een website &lsquo;lokale opslag&rsquo; in uw browser gebruiken voor
        functionele doeleinden.
      </p>

      <h2>2. Welke cookies gebruiken wij?</h2>
      <p>
        Op dit moment plaatsen wij <strong>geen tracking-, analytische of
        advertentiecookies</strong>. Er worden dus geen persoonsgegevens via cookies
        verzameld en er is geen toestemming vereist.
      </p>

      <h2>3. Functionele opslag</h2>
      <p>
        De configurator gebruikt tijdelijke opslag in uw eigen browser (session storage)
        om uw samenstelling door te geven aan de offertepagina. Deze gegevens blijven op
        uw apparaat, worden niet naar ons verzonden en verdwijnen wanneer u de browser
        sluit.
      </p>

      <h2>4. Wijzigingen in de toekomst</h2>
      <p>
        Mochten wij later analytische of andere cookies gaan gebruiken, dan vragen wij
        vooraf uw toestemming via een cookiebanner en werken wij dit beleid bij.
      </p>

      <h2>5. Vragen?</h2>
      <p>Heeft u vragen over dit cookiebeleid? Neem contact met ons op via {company.email}.</p>
    </LegalLayout>
  );
}
