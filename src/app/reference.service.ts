import { Injectable } from '@angular/core';

import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';

export interface ReferenceObject {
    name: string;
    event: string;
    src: string;
    frontpage?: boolean;
}
export interface CategoryObject {
    name: string;
    refs: ReferenceObject[];
}

@Injectable({
    providedIn: 'root'
})
export class ReferenceService {
    public references: CategoryObject[] = [
        {
            name: _('Gewerkschaften'),
            refs: [
                {
                    name: 'Deutscher Gewerkschaftsbund (DGB)',
                    event: 'DGB-Bundeskongress 2018, DGB-Bezirkskonferenzen',
                    src: 'dgb-logo.png',
                    frontpage: true
                },
                {
                    name: 'DGB Jugend',
                    event: 'DGB-Bundesjugendkonferenz 2017, DGB-Bezirksjugendkonferenzen',
                    src: 'dgb-jugend-logo.png'
                },
                {
                    name: 'ver.di',
                    event: 'ver.di-Bundeskongress 2019',
                    src: 'verdi-logo.png',
                    frontpage: true
                },
                {
                    name: 'ver.di Jugend',
                    event: 'ver.di-Bundesjugendkonferenz 2019',
                    src: 'verdi-jugend-logo.png'
                },
                {
                    name: 'Industriegewerkschaft Bauen Agrar Umwelt',
                    event: 'Gewerkschaftstag 2017',
                    src: 'igbau-logo.png'
                },
                {
                    name: 'Gewerkschaft der Polizei (GdP)',
                    event: 'Bundeskongress 2018, Bundeskonferenzen der Frauen/Senioren/Jugend 2018',
                    src: 'gdp-logo.png'
                },
                {
                    name: 'Gewerkschaft Nahrung Genuss Gaststätten (NGG)',
                    event: 'Gewerkschaftstag 2018, Bundesjugendkonferenz 2018',
                    src: 'ngg-logo.png'
                },
                {
                    name: 'Gewerkschaft Erziehung und Wissenschaft (GEW)',
                    event: 'Landesvertreterversammlungen 2018 Thüringen, Brandenburg',
                    src: 'gew-logo.png',
                    frontpage: true
                }
            ]
        },
        {
            name: _('Parteien'),
            refs: [
                {
                    name: 'BÜNDNIS 90/DIE GRÜNEN',
                    event: 'Landesparteitage Hamburg / Hessen / Schleswig-Holstein',
                    src: 'gruene-logo.png',
                    frontpage: true
                },
                {
                    name: 'SPD',
                    event: 'Landes-, Bezirks- und Kreisparteitage',
                    src: 'spd-logo.png',
                    frontpage: true
                },
                {
                    name: 'FDP',
                    event: 'Landesparteitag Schleswig-Holstein',
                    src: 'fdp-logo.png',
                    frontpage: true
                },
                {
                    name: 'DIE LINKE.',
                    event: 'Kreisparteitag Görlitz',
                    src: 'linke-logo.png'
                },

                {
                    name: 'Grüne Jugend',
                    event: 'Bundeskongress',
                    src: 'gruene-jugend-logo.png'
                },
                {
                    name: 'Jusos',
                    event: 'Bezirk Hessen Süd / Kreis Nordfriesland / Ortsgruppe Föhr',
                    src: 'jusos-logo.png'
                },
                {
                    name: 'Junge Liberale',
                    event: '1. virtueller Landeskongress der JuLis Bayern',
                    src: 'julis-logo.png'
                },
                {
                    name: 'Linksjugend',
                    event: 'Landesjugendplenum Sachsen',
                    src: 'linksjugend-logo.png'
                },
                {
                    name: 'Piratenpartei Deutschland / Schweiz',
                    event: 'Bundes-, Landes- und Kreisparteitage',
                    src: 'piraten-logo.png'
                },
                {
                    name: 'Junge Generation in der SPÖ Wien',
                    event: 'Landeskonferenz',
                    src: 'jgspoe-logo.png'
                },
                {
                    name: 'Piraten ohne Grenzen',
                    event: 'Piratenversammlungen',
                    src: 'pog-logo.png'
                }
            ]
        },
        {
            name: _('Gesundheitswesen'),
            refs: [
                {
                    name: 'Marburger Bund',
                    event: 'Hauptversammlungen',
                    src: 'mb-logo.png',
                    frontpage: true
                },
                {
                    name: 'Sächsische Landesärztekammer',
                    event: 'Kammerversammlungen',
                    src: 'slaek-logo.png'
                },
                {
                    name: 'Landesärztekammer Hessen',
                    event: 'Delegiertenversammlungen',
                    src: 'laekh-logo.png'
                },
                {
                    name: 'Ärztekammer Saarland',
                    event: 'Vertreterversammlungen',
                    src: 'aeksaar-logo.png'
                },
                {
                    name: 'Landesärztekammer Brandenburg',
                    event: 'Kammerversammlungen',
                    src: 'laekb-logo.png'
                },
                {
                    name: 'Berufsverband der Kinder- und Jugendärzte e.V.',
                    event: 'Delegiertenversammlungen',
                    src: 'bvkj-logo.png'
                },
                {
                    name: 'Deutscher Hebammenverband',
                    event: 'Bundesdelegiertentagung 2018',
                    src: 'dhv-logo.png'
                }
            ]
        },
        {
            name: _('Verbände, Vereine und mehr'),
            refs: [
                {
                    name: 'Amnesty International',
                    event: 'Jahresversammlung 2018',
                    src: 'amnesty-logo.png',
                    frontpage: true
                },
                {
                    name: 'Bundesverband WindEndergie',
                    event: '(virtuelle) Delegiertenversammlung 2020',
                    src: 'bwe-logo.png'
                },
                {
                    name: 'Bundesjugendwerk der AWO',
                    event: '(virtuelle) Bundesjugendwerkskonferenz 2020',
                    src: 'bujw-logo.png'
                },
                {
                    name: 'Deutsche Pfadfinderschaft Sankt Georg (DPSG)',
                    event: 'Bundesversammlungen',
                    src: 'dpsg-logo.png'
                },
                {
                    name: 'Bund der Pfadfinderinnen und Pfadfinder e.V.',
                    event: 'Bundesversammlung',
                    src: 'bdp-logo.png'
                },
                {
                    name: 'Katholische junge Gemeinde',
                    event: 'Bundeskonferenzen',
                    src: 'kjg-logo.png'
                },
                {
                    name: 'Bund der Deutschen Katholischen Jugend',
                    event: 'Osnabrück, Trier, München, ...',
                    src: 'bdkj-logo.png'
                },
                {
                    name: 'Arbeitsgemeinschaft der Evangelischen Jugend in Deutschland e. V. (aej)',
                    event: 'Mitgliederversammlung',
                    src: 'aej-logo.png'
                },
                {
                    name: 'Evangelische StudentInnengemeinde in der Bundesrepublik Deutschland (ESG)',
                    event: 'Bundesversammlungen',
                    src: 'esg-logo.png'
                },
                {
                    name: 'Stipendiatinnen und Stipendiaten des Cusanuswerks',
                    event: 'Cusanerkonferenz, Vollversammlung',
                    src: 'cusaner-logo.png'
                },
                {
                    name: 'AStA der Universität des Saarlandes',
                    event: 'Studierendenparlament',
                    src: 'asta-uni-saarland-logo.png'
                },
                {
                    name: 'Opennet Initiative e.V.',
                    event: 'Jahresversammlung',
                    src: 'opennet-logo.png'
                },
                {
                    name: 'Mensa in Deutschland e.V.',
                    event: 'Mitgliederversammlungen',
                    src: 'mensa-logo.png'
                },
                {
                    name: 'Volleyball Bundesliga GmbH',
                    event: 'Bundesligaversammlung',
                    src: 'vbl-logo.png'
                },
                {
                    name: 'Deutscher Verband für Neuro-Linguistisches Programmieren e.V.',
                    event: 'Mitgliederversammlungen',
                    src: 'dvnlp-logo.png'
                },
                {
                    name: 'Junge Europäische Föderalisten Deutschland e.V.',
                    event: 'Bundeskongress',
                    src: 'jef-logo.png'
                },
                {
                    name: 'Evangelischer Kirchenkreis Krefeld-Viersen',
                    event: 'Kreissynoden',
                    src: 'ev-kirche-krefeld-viersen-logo.png'
                },
                {
                    name: 'innovate!',
                    event: 'innovate!Award-Preisverleihung (mit elektronischer Abstimmung) am 7.11.2013',
                    src: 'innovate2013-logo.png'
                },
                {
                    name: 'Gemeinde Neu Wulmstorf',
                    event: 'Gemeinderat',
                    src: 'neu-wulmstorf-logo.png'
                }
            ]
        }
    ];
    public frontpageRefs: ReferenceObject[];

    public constructor(protected translate: TranslateService) {
        // get frontpage references and randomize their order
        this.frontpageRefs = this.references
            .flatMap(e => e.refs)
            .filter(r => r.frontpage)
            .shuffle();
    }
}
