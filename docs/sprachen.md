# Spracheinstellungen

Deutsch, Englisch, Kroatisch, Spanisch, Portugiesisch, Französisch und Italienisch. Native Sprachbezeichnungen ohne Flaggen; Sprachauswahl über aufklappbare Links, kein geografisches Dropdown. `?lang=de|en|hr|es|pt|fr|it` ist direkt teilbar. Auswahl wird lokal gespeichert. Sprache bleibt bei internen Seitenwechseln, Kartenaktionen und Filtern erhalten.

Statische Wörterbücher in locales/*.json, Laufzeit language.js/language.css. Deutsche Katalogschlüssel, IDs, Verbreitungsdaten und geschützte Kartenbasis bleiben unverändert. HTML-Sprache, Oberflächentexte, relevante zugängliche Beschriftungen, dynamische Inhalte und Preisformatierung werden lokalisiert. Sprache beeinflusst weder Währung EUR noch Liefergebiet Deutschland. Produktnamen in der jeweiligen Sprache werden in der Suche berücksichtigt. Markennamen und Namensvorschläge bleiben erhalten.

Längere Texte wurden lokal mit M2M100 (MIT-Lizenz, CTranslate2-Modell) als erste Übersetzungsfassungen erstellt. Dafür wurden keine Projekttexte an einen externen Übersetzungsdienst übermittelt. Im Browser werden nur die Sprachdateien derselben Website geladen. Alle Produktnamen, zentrale UI-Texte, Einstiege, Rezepttitel, Zutaten und Zubereitungsschritte sowie knappe lokalisierte Produktbeschreibungen wurden separat ausgearbeitet. Die längeren Hintergrundtexte sind kein muttersprachliches Fachlektorat; für diese Beurteilungsfassung stehen Verständlichkeit und Bedienbarkeit im Vordergrund. Vor verbindlicher Lebensmittelkennzeichnung sind finale Produktspezifikationen und fachliche Sprachprüfung erforderlich.

Modell: https://huggingface.co/gn64/M2M100_418M_CTranslate2 ; ursprüngliches Modell: https://huggingface.co/facebook/m2m100_418M (MIT). Modelle/Abhängigkeiten werden nicht mit der Website ausgeliefert.

Deutsche Quelltexte werden mit locales/source-de.json erfasst. Gepflegte manuelle Fassungen stehen in locales/manual-overrides.json und sind in den ausgelieferten Wörterbüchern enthalten. Änderungen an deutschem Inhalt erfordern die Aktualisierung der jeweiligen Übersetzungen.
