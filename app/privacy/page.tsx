import Link from "next/link";
import { LegalLayout } from "@/components/legal/legal-layout";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { MODULES } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacyverklaring",
  description:
    "Welke gegevens De Kozijnstudio verwerkt als je een voorstel aanvraagt of contact opneemt, waarvoor we ze gebruiken, hoe lang we ze bewaren en wat je rechten zijn.",
  path: "/privacy",
});

/*
 * Facts in this page follow the code as of 29-10-2026:
 * - /offerte: components/offerte/voorstel-form.tsx → app/offerte/actions.ts →
 *   lib/email.ts sendVoorstelEmail (photos as attachments, nothing stored).
 * - /project: components/offerte/checkout.tsx → app/project/actions.ts →
 *   sendProjectEmail (+ PDF attachment, nothing stored).
 * - Browser storage: lib/project-cart.ts (localStorage "kozijn-project"),
 *   /bedankt confirmation (sessionStorage "voorstel-bevestiging", no contact data).
 * - lib/track.ts only pushes to window.dataLayer; no analytics tool, no cookies.
 * - Hosting: Vercel (lib/site.ts). Update this page when any of that changes.
 */
export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacyverklaring"
      intro="Hier lees je welke gegevens we verwerken als je een voorstel aanvraagt of contact met ons opneemt, waarvoor we ze gebruiken en welke rechten je hebt."
      path="/privacy"
      lastUpdated="oktober 2026"
    >
      <h2>1. Wie zijn wij?</h2>
      <p>
        {company.naam} is een handelsnaam van {company.entiteit}. {company.entiteit} is
        verantwoordelijk voor de verwerking van je persoonsgegevens zoals beschreven in deze
        privacyverklaring. MTB Bouw en De Kozijnstudio zijn dus hetzelfde bedrijf.
      </p>
      <ul>
        <li>KvK: {company.kvk}</li>
        <li>
          Adres: {company.adres}, {company.postcodePlaats}
        </li>
        <li>
          E-mail: <a href={`mailto:${company.email}`}>{company.email}</a>
        </li>
        <li>Telefoon: {company.telefoon}</li>
      </ul>

      <h2>2. Welke gegevens verwerken we?</h2>
      <p>We verwerken alleen de gegevens die je zelf aan ons geeft.</p>

      <h3>Als je een voorstel aanvraagt</h3>
      <p>Via het formulier &lsquo;Vraag een voorstel&rsquo; vragen we:</p>
      <ul>
        <li>waar je vraag over gaat (kozijnen, een schuifpui of een deur), of het om vervangen of een nieuwe opening gaat, en welk materiaal je zoekt (&lsquo;weet ik nog niet&rsquo; kan ook);</li>
        <li>je woonplaats of postcode en een globaal aantal kozijnen;</li>
        <li>als je dat wilt: een toelichting, globale maten en foto&rsquo;s van je huidige kozijnen of gevel;</li>
        <li>je naam, en je e-mailadres en/of telefoonnummer;</li>
        <li>hoe je het liefst benaderd wordt en, als je dat wilt, wanneer je het werk ongeveer wilt laten doen;</li>
        <li>dat je akkoord gaat met deze privacyverklaring.</li>
      </ul>
      <p>
        Foto&rsquo;s en maten zijn niet verplicht. Voordat een foto wordt verstuurd, verkleint je
        browser hem. Daarbij vallen extra gegevens in het bestand weg, zoals de plek waar de foto is
        gemaakt. Let erop dat er geen mensen herkenbaar op je foto&rsquo;s staan.
      </p>

      {MODULES.configurator && (
        <>
          <h3>Als je je project uit de configurator verstuurt</h3>
          <p>
            Stel je in de configurator kozijnen samen en verstuur je je project, dan ontvangen we
            je samenstelling (materiaal, maten, glas, kleur, opties en gekozen montageonderdelen),
            je naam, e-mailadres, telefoonnummer, postcode, woonplaats en eventuele opmerkingen. Je
            project gaat als overzicht en als pdf mee.
          </p>
        </>
      )}

      <h3>Als je ons belt, mailt of een WhatsApp-bericht stuurt</h3>
      <p>
        Dan verwerken we je naam, je telefoonnummer of e-mailadres en wat je ons vertelt of
        stuurt, om je vraag te beantwoorden. Stuur je ons een bericht via WhatsApp, dan gelden
        daarvoor ook de voorwaarden van WhatsApp.
      </p>

      <h3>Als je klant wordt</h3>
      <p>
        Dan verwerken we daarnaast de gegevens die nodig zijn om je opdracht uit te voeren en te
        factureren, zoals het adres waar het werk plaatsvindt, de afspraken in je voorstel en
        gegevens over je betalingen.
      </p>

      <h2>3. Waar blijven je gegevens?</h2>
      <ul>
        <li>
          <strong>Per e-mail naar ons, niet in een database.</strong> Als je het formulier of je
          project verstuurt, gaan je gegevens per e-mail naar de mailbox van De Kozijnstudio. De
          website zelf slaat je aanvraag niet op in een database.
        </li>
        <li>
          <strong>Foto&rsquo;s als bijlage.</strong> Foto&rsquo;s gaan alleen als bijlage bij die
          e-mail mee. Ze worden niet op de website opgeslagen en nooit gepubliceerd.
        </li>
        <li>
          <strong>In je eigen browser.</strong> Sommige onderdelen van de website bewaren gegevens
          alleen op je eigen apparaat. Dat staat hieronder bij punt 8.
        </li>
      </ul>

      <h2>4. Waarvoor gebruiken we je gegevens?</h2>
      <ul>
        <li>
          <strong>Reageren op je aanvraag of vraag</strong>, een afspraak maken om in te meten en
          je een voorstel sturen. Grondslag: stappen die je zelf vraagt voordat er een
          overeenkomst is.
        </li>
        <li>
          <strong>Je opdracht uitvoeren</strong>: inmeten, bestellen, leveren, monteren en
          eventueel bouwkundig werk. Grondslag: uitvoering van de overeenkomst.
        </li>
        <li>
          <strong>Administratie</strong>, zoals facturen bewaren voor de Belastingdienst.
          Grondslag: wettelijke verplichting.
        </li>
        <li>
          <strong>De website veilig en werkend houden</strong>, bijvoorbeeld spam tegenhouden.
          Grondslag: ons gerechtvaardigd belang.
        </li>
      </ul>
      <p>
        We gebruiken je gegevens niet voor andere doelen en verkopen ze nooit aan anderen.
      </p>

      <h2>5. Hoe lang bewaren we je gegevens?</h2>
      <p>
        We bewaren je gegevens niet langer dan nodig voor het afhandelen van je aanvraag en een
        eventuele opdracht. Gegevens die bij een uitgevoerde opdracht horen, zoals facturen,
        bewaren we zo lang als de wet ons verplicht.
      </p>

      <h2>6. Met wie delen we je gegevens?</h2>
      <p>
        We delen je gegevens alleen als dat nodig is om je te helpen of je opdracht uit te voeren,
        of als de wet dat verplicht:
      </p>
      <ul>
        <li>
          <strong>Hosting:</strong> de website draait bij Vercel. Om de website te laten werken,
          verwerkt Vercel technische gegevens zoals je IP-adres. Vercel is een Amerikaans bedrijf;
          als daarbij gegevens buiten de Europese Unie worden verwerkt, gebeurt dat met de
          waarborgen die de AVG daarvoor vraagt.
        </li>
        <li>
          <strong>E-mail:</strong> onze e-maildienst, waar je aanvraag binnenkomt en wordt bewaard.
        </li>
        <li>
          <strong>Uitvoering:</strong> leveranciers en vakmensen die we inschakelen voor je
          opdracht, alleen met de gegevens die zij daarvoor nodig hebben, bijvoorbeeld het
          afleveradres.
        </li>
        <li>
          <strong>Administratie:</strong> onze boekhouding, voor facturen en wettelijke
          verplichtingen.
        </li>
        <li>Instanties waaraan we volgens de wet gegevens moeten geven.</li>
      </ul>
      <p>
        Hoort er bouwkundig werk bij je project, dan voert MTB Bouw dat uit. Omdat De Kozijnstudio
        en MTB Bouw hetzelfde bedrijf zijn, delen we je gegevens daarvoor niet met een andere
        partij.
      </p>

      <h2>7. Beveiliging</h2>
      <p>
        We nemen passende technische en organisatorische maatregelen om je gegevens te beschermen
        tegen verlies en onrechtmatig gebruik. De website werkt via een beveiligde verbinding
        (https) en vraagt alleen de gegevens die nodig zijn om op je aanvraag te reageren.
      </p>

      <h2>8. Cookies, opslag in je browser en statistieken</h2>
      <ul>
        <li>
          <strong>Geen tracking- of analysecookies.</strong> De website plaatst geen cookies om je
          te volgen, bezoeken te analyseren of advertenties te tonen.
        </li>
        <li>
          <strong>Geen analysetool actief.</strong> De website houdt bij welke knoppen worden
          gebruikt, zoals het starten van het formulier, maar die informatie blijft in je browser
          en wordt op dit moment nergens naartoe gestuurd. Gaan we later een analysetool gebruiken,
          dan passen we deze verklaring aan en vragen we vooraf je toestemming als dat nodig is.
          Je naam, contactgegevens, adres of foto&rsquo;s sturen we nooit naar zo&rsquo;n tool.
        </li>
        {MODULES.configurator && (
          <li>
            <strong>Je project in de configurator</strong> wordt bewaard in de opslag van je eigen
            browser (local storage), zodat je later verder kunt. Het blijft op je apparaat totdat
            je de kozijnen uit je project verwijdert of je browsergegevens wist. Wij ontvangen het
            pas als je je project zelf verstuurt.
          </li>
        )}
        <li>
          <strong>Na het versturen van het formulier</strong> bewaart je browser tijdelijk een
          korte samenvatting van je aanvraag, zonder contactgegevens, om die op de bevestigingspagina
          te tonen. Die verdwijnt als je het tabblad sluit.
        </li>
      </ul>
      <p>
        Meer hierover lees je in ons <Link href="/cookiebeleid">cookiebeleid</Link>.
      </p>

      <h2>9. Je rechten</h2>
      <p>
        Je mag je gegevens inzien, laten corrigeren of laten verwijderen. Je kunt ook vragen om de
        verwerking te beperken, bezwaar maken tegen het gebruik van je gegevens en vragen om je
        gegevens over te dragen. Mail daarvoor naar{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>. We kunnen je vragen om aan te tonen
        wie je bent, zodat we gegevens alleen aan de juiste persoon geven.
      </p>
      <p>
        Ben je het niet eens met hoe we met je gegevens omgaan? Laat het ons weten, dan zoeken we
        samen een oplossing. Je hebt ook altijd het recht om een klacht in te dienen bij de
        Autoriteit Persoonsgegevens (
        <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">
          autoriteitpersoonsgegevens.nl
        </a>
        ).
      </p>

      <h2>10. Wijzigingen</h2>
      <p>
        Verandert er iets aan hoe we met je gegevens omgaan, dan passen we deze privacyverklaring
        aan. De nieuwste versie staat altijd op deze pagina.
      </p>
    </LegalLayout>
  );
}
