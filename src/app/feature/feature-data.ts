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
            _('elektronische Stimmabgabe möglich'),
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
            _('elektronische Stimmabgabe möglich'),
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
        intro: _(
            'Erweitern Sie OpenSlides um ein integriertes elektronisches Abstimmungssystem.\
        Legen Sie die stimmberechtigte Nutzergruppe fest. Nur in OpenSlides auf anwesend und stimmberechtigt geschaltete Teilnehmende dürfen abstimmen.\
        Möglich sind namentliche oder nicht-namentliche Antragsabstimmungen und Personenwahlen.\
        Auch individuelle Stimmgewichtungen sind möglich.\
        <p>» Testen Sie die elektronische Stimmabgabe in der <a class="inline" href="https://demo.openslides.org/" target="_blank">Online-Demo</a>.<br>\
        » Erfahren Sie mehr über <a class="inline" href="/news/online-versammlungen" fragment="evoting">Online-Versammlungen.</a>'
        ),
        image_names: [
            'motion-active-voting',
            'motion-singlevotes',
            'election-active-voting',
            'election-voting-detail-page'
        ],
        details: [
            _(
                'rechtssichere Antragsabstimmungen (Ja/Nein/Enthaltung) und Personenwahlen (1-aus-n oder n-aus-m) möglich'
            ),
            _('namentliche (wer hat wie abgestimmt) und nicht-namentliche (anonyme) Stimmabgaben möglich'),
            _('stimmberechtigte Nutzergruppe(n) pro Abstimmung/Wahlgang festlegbar'),
            _('Nur in OpenSlides auf anwesend und stimmberechtigt geschaltete Teilnehmende dürfen abstimmen'),
            _('Individuelle Stimmgewichtungen pro Nutzer aktivierbar'),
            _('Stimmrechtsübertragungen (Vollmachtgeber und Vollmachtnehmer) einstellbar'),
            _('Einzelstimmennachweise für namentliche Stimmabgaben')
        ]
    },
    livestream: {
        title: _('Video-Livestream'),
        intro: _(
            'Integrieren Sie einen Video-Livestream Ihrer virtuellen Veranstaltung in OpenSlides.\
        Alle Teilnehmenden verfolgen den Stream jederzeit sichtbar in OpenSlides. Möchte sich eine Person zu Wort melden, setzt sich diese selbständig auf die aktuelle Redeliste in OpenSlides und wechselt damit automatisch in einen Jitsi-Videokonferenzraum.\
        Der Livestream überträgt die Videokonferenz. Nach Ende der Wortmeldung verlässt man den Konferenzraum und verfolgt wieder den Livestream.\
        <p>Dieses Verfahren ist sehr bandbreitenschonend (im Vergleich zu reinen Videokonferenzen) und erlaubt eine große Skalierung an Teilnehmerzahlen.\
        Virtuelle Veranstaltungen mit mehreren hundert Personen sind damit kein Problem mehr.\
        Hinzu kommt, dass die meisten Teilnehmenden eine Veranstaltung nur "konsumierend" verfolgen, d.h. nur ein kleiner Personenkreis möchte sich aktiv mit Mikrofon und Kamera zu Wort melden.\
        Setzen Sie auf erprobte Broadcast-Streaming-Lösung – intelligent gekoppelt mit der OpenSlides-Redelistenfunktion.\
        <p>Die Audiokonferenz - ideal zum Austausch für kleine virtuelle Gremiensitzung (bis 50 Teilnehmende)<br>\
        Verwenden Sie OpenSlides mit integrierter Audiokonferenz. Über unseren exklusiv für OpenSlides betriebenen Jitsi-Server kommunizieren alle Teilnehmende direkt miteinander - geschützt in einem Passwort-gesicherten Audio-Konferenzraum. Jede/r verbindet sich automatisch nach dem Login in OpenSlides mit der Audiokonferenz und darf das eigene Mikrofon ein- und ausschalten.\
        <p>Funktionsweise in Kurzanimation: <a href="https://files.openslides.org/press/3.2/OpenSlides3.2-Audiokonferenz.gif" class="inline">Audiokonferenz</a>\
        · <a href="https://files.openslides.org/press/3.2/OpenSlides3.2-Videokonferenz.gif" class="inline">Video-Livestream</a>'
        ),
        image_names: ['autopilot', 'jitsi-dialog'],
        details: [
            _('Anzeige des Livesstreams im Vordergrund (auch minimierbar oder im Vollbild nutzbar'),
            _('Automatische Übertragung des aktuellen Redners in den Livestream'),
            _(
                'intelligente Koppelung mit der Redeliste (nur Personen auf der Redeliste dürfen in die Videokonferenz eintreten)'
            ),
            _('bankbreitenschonende Broadcast-Technik (auch für sehr große virtuelle Veranstaltungen nutzbar)')
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
            _('Plattformunabhängige Webanwendung basierend auf Python 3 und Angular im modernen Material Design'),
            _('Progressive WebApp mit clientseitigem Caching und Lazy Loading für kurze Ladezeiten')
        ]
    }
};
