# Culinaria Mediterranea – Herkunftsprüfung vor Shop-Eröffnung

## Status und Zweck
**Stand: 15.11.2026 – Shop-Prototyp.** Die in `box-origin-plan.js` hinterlegten Regionen sind **feste Musterdaten für Gestaltung, Produktsuche und Geschenkboxen**. Sie sind nicht durch Lieferantenbelege bestätigt. Die öffentlich erreichbare GitHub-Pages-Seite trägt deshalb zentral den Hinweis „Konzeptvorschau · Produkte, Preise und Herkünfte als Musterdaten · Keine Bestellungen“.

## Verbindliches Zielmodell
- **Regionsspezifische Leitprodukte:** Rohstoffe und Verarbeitung ausschließlich aus der angegebenen Region. Bei Abweichung anderen Artikel und passenden Boxen neu zuordnen, nicht die Herkunft eines anderen Artikels umetikettieren.
- **Allgemeine Produkte:** eine plausible, fest hinterlegte Herkunft je Produkt/SKU; derselbe SKU kann in beliebig vielen Geschenkboxen vorkommen.
- **Geschenkboxen:** bestehen aus referenzierten Einzelartikeln. Die Region der Box überschreibt niemals Herkunftsdaten der enthaltenen Artikel.
- **Regionale Rezeptur ist kein Herkunftsnachweis.** Bei verarbeiteten Produkten Herstellungsort, Primärzutat und ggf. geschützte geographische Angaben getrennt erfassen.

## Vor Veröffentlichung als echter Shop verpflichtend
1. Alle Artikel-IDs aus `CULINARIA_ORIGIN_PLAN` mit konkreten Waren/Lieferanten abgleichen.
2. Rohstoffherkunft, Herstellung/Verarbeitung, rechtlich zulässige Herkunfts- und ggf. geschützte Bezeichnungen pro Artikel belegen.
3. Alle Boxvarianten auf exklusive Herkunftsvorgaben, tatsächlich lieferbare Artikel und korrekte Stücklisten prüfen.
4. Zutaten, Allergene, Haltbarkeit, ungekühlte Lagerung/Transport, Etiketten und Preisbestandteile je Ware prüfen.
5. Illustrative Bildmotive durch freigegebene Bilder der tatsächlichen Waren ersetzen oder klar als Serviervorschläge kennzeichnen.
6. Mustertexte, Preise und Musterdaten vor Aktivierung von Bestell- und Zahlungsfunktionen durch freigegebene Stammdaten ersetzen.
7. Automatisierte Freigabeprüfung vornehmen: Kein `originStatus: 'prototype'` und keine unverifizierte `commercialOrigin` für Verkaufsartikel zulassen.

## Qualitätskontrolle
Die Musterwelt ist bewusst realistisch dargestellt. **Eine saubere, selbstbewusste Kundenansprache gehört zum Prototyp.** Interne Nachweis- und Freigabeprozesse gehören in dieses Dokument und in die Produktstammdaten, nicht als wiederholte Warnhinweise in jede Produktkarte.
