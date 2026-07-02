import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Hoe De Kozijnstudio omgaat met uw persoonsgegevens: welke gegevens we verzamelen, waarvoor, hoe lang we ze bewaren en welke rechten u heeft (AVG).",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacyverklaring"
      intro="De Kozijnstudio respecteert uw privacy en verwerkt persoonsgegevens conform de Algemene Verordening Gegevensbescherming (AVG)."
    >
      <h2>1. Wie zijn wij?</h2>
      <p>
        {company.naam} is een handelsnaam van {company.entiteit} en
        verwerkingsverantwoordelijke voor de verwerking van persoonsgegevens
        zoals beschreven in deze privacyverklaring.
      </p>
      <ul>
        <li>KvK: {company.kvk}</li>
        <li>Adres: {company.adres}, {company.postcodePlaats}</li>
        <li>E-mail: {company.email}</li>
        <li>Telefoon: {company.telefoon}</li>
      </ul>

      <h2>2. Welke gegevens verwerken wij?</h2>
      <p>Wij verwerken uitsluitend de gegevens die u zelf aan ons verstrekt, met name via het offerte- of contactformulier:</p>
      <ul>
        <li>Naam</li>
        <li>E-mailadres en telefoonnummer</li>
        <li>Postcode en plaats (en, indien u dit deelt, het adres van het project)</li>
        <li>Gegevens over uw aanvraag (productkeuze, afmetingen, gewenste werkzaamheden en eventuele opmerkingen)</li>
      </ul>

      <h2>3. Waarvoor en op welke grondslag?</h2>
      <ul>
        <li><strong>Het opstellen van een offerte en contact met u opnemen</strong> — grondslag: uitvoering van (of stappen voorafgaand aan) een overeenkomst.</li>
        <li><strong>Het uitvoeren van de opdracht</strong> (inmeten, leveren, monteren) — grondslag: uitvoering van de overeenkomst.</li>
        <li><strong>Administratie en wettelijke verplichtingen</strong> (zoals fiscale bewaarplicht) — grondslag: wettelijke verplichting.</li>
      </ul>
      <p>Wij gebruiken uw gegevens niet voor andere doeleinden en verkopen ze nooit aan derden.</p>

      <h2>4. Hoe lang bewaren wij uw gegevens?</h2>
      <p>
        Wij bewaren uw gegevens niet langer dan noodzakelijk. Offerteaanvragen die niet
        tot een opdracht leiden worden na een redelijke termijn verwijderd. Gegevens die
        horen bij een uitgevoerde opdracht bewaren wij conform de wettelijke (fiscale)
        bewaartermijn. <em>[Concreet bewaarbeleid nog vast te leggen.]</em>
      </p>

      <h2>5. Delen met derden</h2>
      <p>Wij delen uw gegevens alleen wanneer dat nodig is voor de uitvoering of wettelijk verplicht is, met:</p>
      <ul>
        <li><strong>{company.moeder}</strong> — voor bouwkundige werkzaamheden die onderdeel zijn van uw project;</li>
        <li>onze e-mail- en hostingdienstverlener, uitsluitend om uw aanvraag te kunnen ontvangen en verwerken;</li>
        <li>partijen waartoe wij wettelijk verplicht zijn.</li>
      </ul>
      <p><em>[Verwerkersovereenkomsten met dienstverleners nog te documenteren.]</em></p>

      <h2>6. Beveiliging</h2>
      <p>
        Wij nemen passende technische en organisatorische maatregelen om uw gegevens te
        beschermen tegen verlies of onrechtmatige verwerking.
      </p>

      <h2>7. Uw rechten</h2>
      <p>U heeft het recht om uw persoonsgegevens in te zien, te corrigeren, te laten verwijderen, de verwerking te beperken, bezwaar te maken en uw gegevens over te laten dragen. Neem hiervoor contact met ons op via {company.email}.</p>
      <p>U heeft daarnaast het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).</p>

      <h2>8. Cookies</h2>
      <p>
        Onze website plaatst geen tracking-cookies. Zie ons{" "}
        <a href="/cookiebeleid">cookiebeleid</a> voor meer informatie.
      </p>

      <h2>9. Wijzigingen</h2>
      <p>Wij kunnen deze privacyverklaring aanpassen. De meest actuele versie staat altijd op deze pagina.</p>
    </LegalLayout>
  );
}
