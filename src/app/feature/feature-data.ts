import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export interface FeatureDescription {
    title: string;
    icon?: string;
    intro: string;
    image_names: string[];
    details: string[];
}

export const FeaturesByRoute: { [route: string]: FeatureDescription } = {
    agenda: {
        title: _('Tagesordnung'),
        icon: 'calendar_today',
        intro: _(
            'Bleiben Sie flexibel: Ergänzen, ändern oder verschieben Sie Tagesordnungspunkte im laufenden Betrieb.'
        ),
        image_names: ['overview', 'new-item', 'los', 'los-projected'],
        details: [
            _('Redelisten für jeden Tagesordnungspunkt'),
            _('Flexibles Hinzufügen von Tagesordnungspunkten für jegliche Inhalte'),
            _('Die aktuelle Redeliste stets im Blick (als Überblendung oder auf einem 2. Projektor)'),
            _('Countdowns zur Redezeitbeschränkung'),
            _('Automatische Nummerierung von Tagesordnungspunkten'),
            _('Zeitplanung: Dauer pro Tagesordnungspunkt schätzen'),
            _('Inoffizielle Tagesordnungspunkte (z. B. Pausen) in die Tagesordnung integrieren'),
            _('Abgeschlossene Tagesordnungspunkte markieren und verstecken'),
            _('Individuelle Sichtbarkeiten für jeden Tagesordnungspunkt'),
            _('Tagesordnung als PDF exportieren'),
            _('Tagesordnung per Drag&Drop sortieren')
        ]
    },
    motions: {
        title: _('Anträge'),
        icon: 'note',
        intro: _('Sparen Sie Papier: Erfassen und verwalten Sie Anträge und Abstimmungsergebnisse digital.'),
        image_names: ['overview', 'detail', 'projected', 'pdf'],
        details: [
            _('Anpassbare Antrag-Statusmeldungen und -Arbeitsabläufe'),
            _('Anträge in Antragsblöcken und Schlagwörter verwalten'),
            _('Anträge automatisch nummerieren in Sachgebieten und Untersachgebieten'),
            _('Sortierung von Anträgen in einer Aufrufliste'),
            _('Erforderliche Unterstützern pro Antrag definieren'),
            _('Änderungsanträge und Änderungsempfehlungen auf Basis von Zeilennummern erstellen'),
            _('Unterstützung von Satzungsanträgen'),
            _('Anzeigen/Verstecken von Anträgen in der Tagesordnung'),
            _('HTML-Inline-Editor zum Formatieren von Antragstext und -begründung'),
            _('Kommentarfelder für Anträge erlauben'),
            _('Abstimmungsergebnisse erfassen'),
            _('Anträge als PDF, CSV und XLSX exportieren')
        ]
    },
    elections: {
        title: _('Wahlen'),
        icon: 'pie_chart',
        intro: _('Beschleunigen Sie das Prozedere: Generieren Sie ad-hoc Stimmzettel für Ihre geheime Wahlen.'),
        image_names: ['overview', 'detail', 'projected', 'pdf'],
        details: [
            _('Kandidaten aus der Teilnehmenden-Liste vorschlagen'),
            _('Personalisierte Wahlscheine für geheime Wahlen drucken'),
            _('Unterstützte Wahlverfahren: Ja/Nein/Enthaltung oder eine Stimme pro Kandidat'),
            _('Wahlergebnisse auf Grundlage verschiedener 100%-Basen'),
            _('Mehrere Wahlgänge'),
            _('Wahlergebnisse eingeben und mit Diagramm projizieren'),
            _('Wahlen (mit allen Ergebnissen) als PDF exportieren')
        ]
    },
    projectors: {
        title: _('Projektoren'),
        icon: 'videocam',
        intro: _('Live dabei: Zeigen Sie den Teilnehmenden gerade diskutierte Inhalte auf den Projektionsflächen.'),
        image_names: ['overview', 'detail'],
        details: [
            _('Sofortige Aktualisierung bei Änderungen'),
            _('Unterstützung mehrerer Projektoren'),
            _('Individuelle Projektorgestaltung mit eigenem Logo und Farben'),
            _('Anordnen von Inhalten in einer Warteschlange'),
            _('Projektionshistorie durch einen Verlauf im Überblick behalten'),
            _('Unterstützung verschiedener Auflösungen'),
            _('Projektion von PDF- oder Bilddateien')
        ]
    },
    evoting: {
        title: _('Elektronische Stimmabgabe'),
        intro: _('Erweitern Sie OpenSlides um ein integriertes elektronisches Abstimmungssystem.'),
        image_names: ["dummy", "dummy2"],
        details: [
            _('Antragsabstimmungen und Personenwahlen möglich'),
            _('Namentliche und nicht-namentliche Abstimmungen'),
            _('Stimmberechtigte Nutzergruppe festlegen'),
            _('Nur in OpenSlides auf anwesend und stimmberechtigt geschaltete Teilnehmende dürfen abstimmen'),
            _('Individuelle Stimmgewichtungen der Nutzer'),
            _('Abstimmungsergebnisse auf Grundlage verschiedener 100%-Basen')
        ]
    },
    livestream: {
        title: _('Video-Livestream'),
        intro: _('Integrieren Sie einen Video-Livestream Ihrer virtuellen Veranstaltung in OpenSlides.'),
        image_names: ["dummy", "dummy2"],
        details: [
            _('Jederzeit sichtbares Stream-Overlay'),
            _('Koppelung mit Redeliste'),
            _('Automatische Übertragung des aktuellen Redners')
        ]
    },
    miscellaneous: {
        title: _('Weitere Funktionen'),
        icon: 'search',
        intro: _('Seien Sie neugierig: Entdecken Sie noch viele weitere Funktionen von OpenSlides.'),
        image_names: ['participants', 'files', 'history', 'search'],
        details: [
            _('Live-Änderungen direkt miterleben'),
            _('Teilnehmende, Gruppen und Berechtigungen verwalten'),
            _('CSV-Import und -Export für Teilnehmende'),
            _('Umfangreiche Dateiverwaltung mit Zugriffsberechtigungen pro Datei und Ordner'),
            _('Globale Chronik auf Basis von Snapshots'),
            _('Globale Volltextsuche'),
            _('Umfangreiche Sortier- und Filtermöglichkeiten aller Listen'),
            _('Konfigurierbares Design sowie Erstellung eigener Designs auf Anfrage'),
            _('Mehrsprachigkeit (Englisch, Deutsch, Französisch, Tschechisch, Portugiesisch, Spanisch und Russisch)'),
            _('Responsive Design'),
            _('Plattformunabhängige Webanwendung basierend auf Python 3 und Angular 8 im modernen Material Design'),
            _('Progressive WebApp mit clientseitigem Caching und Lazy Loading für kurze Ladezeiten')
        ]
    }
};
