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
                'Redelisten für jeden Tagesordnungspunkt.',
                'Die aktuelle Redeliste stets im Blick (als Überblendung oder auf einem 2. Projektor).',
                'Countdowns zur Redezeitbeschränkung.',
                'Automatische Nummerierung von Tagesordnungspunkten.',
                'Zeitplanung: Dauer pro Tagesordnungspunkt schätzen.',
                'Inoffizielle Tagesordnungspunkte (z. B. Pausen) in die Tagesordnung integrieren.',
                'Abgeschlossene Tagesordnungspunkte markieren und verstecken.',
                'Tagesordnung als PDF exportieren.',
                'Projektor über die Seitenleiste steuern.',
                'Tagesordnung per Drag&Drop sortieren.'
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
                'Anträge mit Zeilennummern verwalten.',
                'Anpassbare Antrag-Statusmeldungen und -Arbeitsabläufe.',
                'Sachgebiete, Antragsblöcke und Schlagwörter verwalten.',
                'Erforderlichen Unterstützern pro Antrag definieren.',
                'Unterstützung für Änderungsanträge und Änderungsempfehlungen.',
                'Anzeigen/Verstecken von Anträgen in der Tagesordnung.',
                'Versionshistorie zur Verwaltung der Antragsänderungen.',
                'HTML-Inline-Editor zum Formatieren von Antragstext und -begründung.',
                'Kommentarfelder für Anträge erlauben.',
                'Abstimmungsergebnisse erfassen.',
                'Anträge als PDF, CSV und DOCX exportieren.'
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
                'Kandidaten aus der Teilnehmenden-Liste vorschlagen.',
                'Personalisierte Wahlscheine für geheime Wahlen drucken.',
                'Unterstützte Wahlverfahren: Ja/Nein/Enthaltung oder eine Stimme pro Kandidat.',
                'Calculated percentages on different 100% bases.',
                'Mehrere Wahlgänge.',
                'Wahlergebnisse eingeben und mit Diagramm projizieren.',
                'Wahlen (mit allen Ergebnissen) als PDF exportieren.'
            ]
        },
        projectors: {
            title: 'Projektoren',
            icon: 'videocam',
            intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            images: [
                { url: `${this.path}elections-list_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}elections-detail_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}elections-projector_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}elections-ballot-pdf_de.png`, caption: 'Lorem ipsum' }
            ],
            details: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            ]
        },
        miscellaneous: {
            title: 'Weitere Funktionen',
            icon: 'search',
            intro: 'Lorem ipsum.',
            images: [
                { url: `${this.path}general-users-list_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}general-files-list_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}general-chat-frontpage_de.png`, caption: 'Lorem ipsum' },
                { url: `${this.path}general-windows-portable.png`, caption: 'Lorem ipsum' }
            ],
            details: [
                'Mehrere Projektoren erstellen.',
                'Teilnehmende, Gruppen und Berechtigungen verwalten.',
                'Dokumentenablage mit PDF-, Bild- und Video-Projektion.',
                'CSV-Import und -Export für Tagesordnung, Anträge und Teilnehmende.',
                'Gruppenchat.',
                'Anpassbare Startseite.',
                'Volltextsuche.',
                'Anpassbares Projektor-Template.',
                'Responsive Design.',
                'Portable Version für Windows.',
                'Mehrsprachigkeit (Englisch, Deutsch, Französisch, Tschechisch, Portugiesisch, Spanisch und Russisch).',
                'OpenSlides ist eine plattformunabhängige Webanwendung basierend auf Python 3 und Angular 8 mit einer REST-API.'
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
