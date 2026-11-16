# Inhaltsprüfung Culinaria Mediterranea – 16. November 2026

## Geprüfter Geltungsbereich
- `index.html` – Startseite, Rezeptteaser, FAQ, Geschenkboxen
- `sortiment.html` und dynamische Produktdaten / Boxvarianten
- `genusswissen.html` – Rezeptseite und Warenkunde
- `product-guides.js` – Rezeptlinks aus Produktdetails
- `genussregionen.html` – regionale Navigation
- `beurteilung.html`, `review-feedback.js` – UX-Test und Rückmeldung
- `projekt.html` – Konzeptbeschreibung
- `mittelmeer.html` – vorhandener Sonderbereich
- interne Links zwischen diesen sieben HTML-Seiten

## Umgesetzt
1. Neun ältere Rezepte aus dem historischen, breiten Mittelmeerkonzept durch elf neue Rezepte ersetzt (eine pro Geschenkbox-Region).
2. Rezepte führen Shopzutaten mit direkten Produktlinks und Grundzutaten der Alltagsküche getrennt auf.
3. Verwaiste Rezeptanker aus den Produktguides entfernt bzw. auf passende neue Rezepte umgestellt.
4. Drei Rezeptteaser auf der Startseite ausgetauscht; FAQ zur Herkunft an das aktuelle regionale Produktmodell angepasst.
5. Beurteilungsseite auf Produktsuche, Geschenkboxvergleich, Rezeptlinks, mobile Navigation und Warenkorb ausgerichtet; sechs konkrete Antwortfelder statt Fragen nach alten Namensalternativen.
6. Projektbeschreibung auf elf Boxen, elf Rezepte, Musterherkünfte und Prototypstatus aktualisiert.
7. Genussregionen um direkte Auswahl für elf Geschenkboxen ergänzt.

## Automatische Prüfergebnisse
- 11 Rezepte mit insgesamt 38 verlinkten Produktpositionen, 30 unterschiedliche Shopartikel
- Alle 38 Produktverweise existieren im aktuellen Katalog
- Alle Rezeptverweise aus Produktguides und Startseitenteasern zeigen auf vorhandene Rezeptanker
- 6 Feedbackfelder vorhanden
- 7 zentrale HTML-Seiten vorhanden; keine fehlenden Zielseiten oder Abschnittsanker in ihren internen Links gefunden
- JavaScript von `product-guides.js` und `review-feedback.js` syntaktisch geprüft

## Bekannte offene Punkte
- Keine vollständige tatsächliche Bedienung durch Browserautomatisierung verifiziert (Mobilansicht, Modaldialoge, Fokus und Filter).
- Neue deutsche Texte sind noch nicht für alle unterstützten Sprachversionen übersetzt. Eine Übersetzungsrunde ist erforderlich, wenn die weiteren Sprachen aktiviert angeboten werden.
- Einige Einzelartikel nutzen weiterhin illustrative Bildsammlungen oder Demo-Platzhalter; Bild-/Produkttreue visuell und vor Veröffentlichung prüfen.
- Shoppreise, Warenkorb und Versandkosten sind Prototypdaten. Es gibt keine produktive Zahlungs- oder Bestellabwicklung.
- Die ursprüngliche Mittelmeerkarte bleibt als zusätzlicher Erkundungsbereich bestehen, wird aber nicht mehr als zentrales Shop-Navigationselement versprochen.
- Vor Eröffnung gilt unverändert `docs/HERKUNFT_VOR_LAUNCH.md`.

## Inhaltsregel für weitere Änderungen
Rezeptkarten bevorzugt aus den aktuell im Shop angelegten Spezialitäten ableiten, mit eigenen Artikellinks und wenigen transparent getrennten Alltagszutaten. Keine Rezepte und Testfragen aus älteren Website-Konzeptständen ungeprüft übernehmen.
