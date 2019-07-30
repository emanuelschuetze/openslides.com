import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

interface FeatureDescription {
    title: string;
    icon: string;
    intro: string;
    images: { url: string; caption: string }[];
    details: string[];
}

@Component({
    selector: 'app-feature',
    templateUrl: './feature.component.html',
    styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
    private path = 'assets/img/features/';
    public activeRoute = '';
    public featuresByRoute: { [route: string]: FeatureDescription } = {
        agenda: {
            title: 'Tagesordnung',
            icon: 'calendar_today',
            intro:
                'Bleiben Sie flexibel: Ergänzen, ändern oder verschieben Sie Tagesordnungspunkte im laufenden Betrieb.',
            images: [
                { url: `${this.path}agenda-list_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}agenda-list-of-speakers_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}agenda-list-of-speakers-projector_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}agenda-projector_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}agenda-edit_de.png`, caption: 'Lorem ipsum' }
            ],
            details: [
                'Redelisten für jeden Tagesordnungspunkt',
                'Flexibles Hinzufügen von Tagesordnungspunkten für jegliche Inhalte',
                'Die aktuelle Redeliste stets im Blick (als Überblendung oder auf einem 2. Projektor)',
                'Countdowns zur Redezeitbeschränkung',
                'Automatische Nummerierung von Tagesordnungspunkten',
                'Zeitplanung: Dauer pro Tagesordnungspunkt schätzen',
                'Inoffizielle Tagesordnungspunkte (z. B. Pausen) in die Tagesordnung integrieren',
                'Abgeschlossene Tagesordnungspunkte markieren und verstecken',
                'Individuelle Sichtbarkeiten für jeden Tagesordnungspunkt',
                'Tagesordnung als PDF exportieren',
                'Tagesordnung per Drag&Drop sortieren'
            ]
        },
        motions: {
            title: 'Anträge',
            icon: 'note',
            intro: 'Sparen Sie Papier: Erfassen und verwalten Sie Anträge und Abstimmungsergebnisse digital.',
            images: [
                { url: `${this.path}motions-list_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}motions-detail_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}motions-projector_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}motions-pdf_de.png`, caption: 'Lorem ipsum' }
            ],
            details: [
                'Anpassbare Antrag-Statusmeldungen und -Arbeitsabläufe',
                'Anträge in Antragsblöcken und Schlagwörter verwalten',
                'Anträge automatisch nummerieren in Sachgebieten und Untersachgebieten',
                'Sortierung von Anträgen in einer Aufrufliste',
                'Erforderlichen Unterstützern pro Antrag definieren',
                'Änderungsanträge und Änderungsempfehlungen auf Basis von Zeilennummern erstellen',
                'Unterstützung von Satzungsanträgen',
                'Anzeigen/Verstecken von Anträgen in der Tagesordnung',
                'HTML-Inline-Editor zum Formatieren von Antragstext und -begründung',
                'Kommentarfelder für Anträge erlauben',
                'Abstimmungsergebnisse erfassen',
                'Anträge als PDF, CSV und XLSX exportieren'
            ]
        },
        elections: {
            title: 'Wahlen',
            icon: 'pie_chart',
            intro: 'Beschleunigen Sie das Prozedere: Generieren Sie ad-hoc Stimmzettel für Ihre geheime Wahlen.',
            images: [
                { url: `${this.path}elections-list_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}elections-detail_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}elections-projector_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}elections-ballot-pdf_de.png`, caption: 'Lorem ipsum' }
            ],
            details: [
                'Kandidaten aus der Teilnehmenden-Liste vorschlagen',
                'Personalisierte Wahlscheine für geheime Wahlen drucken',
                'Unterstützte Wahlverfahren: Ja/Nein/Enthaltung oder eine Stimme pro Kandidat',
                'Wahlergebnisse auf Grundlage verschiedener 100%-Basen',
                'Mehrere Wahlgänge',
                'Wahlergebnisse eingeben und mit Diagramm projizieren',
                'Wahlen (mit allen Ergebnissen) als PDF exportieren'
            ]
        },
        projectors: {
            title: 'Projektoren',
            icon: 'videocam',
            intro: '<tbd>Live dabei: Zeigen sie den Teilnehmern gerade diskutierte Inhalte über Projektoren.</tbd>',
            images: [
                { url: `${this.path}elections-list_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}elections-detail_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}elections-projector_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}elections-ballot-pdf_de.png`, caption: 'Lorem ipsum' }
            ],
            details: [
                'Präsentation der Inhalte für die Teilnehmenden',
                'Sofortiges Update bei Änderungen',
                'Unterstützung mehrerer Projektoren',
                'Individuelle Projektorgestaltung mit eigenem Logo',
                'Anordnen von Inhalten in einer Warteschlange',
                'Projektionshistorie durch einen Verlauf im Überblick behalten',
                'Unterstützung verschiedener Auflösungen',
                'Projektion von PDF-, Bild- und Videodateien'
            ]
        },
        miscellaneous: {
            title: 'Weitere Funktionen',
            icon: 'search',
            intro: '<tbd>Seien Sie neugierig: Entdecken Sie noch viele weitere Funktionen von OpenSlides</tbd>',
            images: [
                { url: `${this.path}general-users-list_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}general-files-list_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}general-chat-frontpage_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}general-windows-portable.png`, caption: 'Lorem ipsum' }
            ],
            details: [
                'Live-Änderungen direkt miterleben',
                'Teilnehmende, Gruppen und Berechtigungen verwalten',
                'Umfangreiche Dateiverwaltung mit Zugriffsberechtigungen pro Datei und Ordner',
                'CSV-Import und -Export für Tagesordnung, Anträge und Teilnehmende',
                'Verwaltung und Gruppierung mithilfe von Schlagwörtern',
                'Globale Chronik auf Basis von Snapshots',
                'Globale Volltextsuche',
                'Umfangreiche Sortier- und Filtermöglichkeiten aller Listen',
                'Konfigurierbare Themes sowie Erstellung eigener Themes auf Anfrage',
                'Responsive Design',
                'Mehrsprachigkeit (Englisch, Deutsch, Französisch, Tschechisch, Portugiesisch, Spanisch und Russisch)',
                'Plattformunabhängige Webanwendung basierend auf Python 3 und Angular 8 im modernen Material Design',
                'Progressive WebApp mit clientseitigem Caching und Lazy Loading für schnelle Ladezeiten'
            ]
        }
    };
    public routeOrder = ['agenda', 'motions', 'elections', 'projectors', 'miscellaneous'];

    public get currentFeature(): FeatureDescription {
        return this.featuresByRoute[this.activeRoute];
    }

    public constructor(private route: ActivatedRoute, public router: Router) {}

    public ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.setActiveRoute();
            }
        });
        this.setActiveRoute();
    }

    private setActiveRoute(): void {
        const url = this.route.snapshot.url;
        this.activeRoute = url[url.length - 1].path;
    }
}
