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
                    event: 'Bundesparteitag 2020, Landesparteitage',
                    src: 'fdp-logo.png',
                    frontpage: true
                },
                {
                    name: 'DIE LINKE.',
                    event: 'Landes- und Kreisparteitage',
                    src: 'linke-logo.png'
                },
                {
                    name: 'CDU',
                    event: 'Landesparteitag BaWü',
                    src: 'cdu-logo.png',
                    frontpage: true
                },
                {
                    name: 'SPÖ',
                    event: 'Landesparteitag Oberösterreich, Bundeskonferenz JG',
                    src: 'spoe-logo.png'
                },
                {
                    name: 'Grüne Jugend',
                    event: 'Bundeskongress',
                    src: 'gruene-jugend-logo.png'
                },
                {
                    name: 'Jusos',
                    event: 'Bundeskongress',
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
                    event: 'Hauptversammlung',
                    src: 'mb-logo.png'
                },
                {
                    name: 'Sächsische Landesärztekammer',
                    event: 'Kammerversammlung',
                    src: 'slaek-logo.png'
                },
                {
                    name: 'Landesärztekammer Hessen',
                    event: 'Delegiertenversammlung',
                    src: 'laekh-logo.png'
                },
                {
                    name: 'Ärztekammer Saarland',
                    event: 'Vertreterversammlung',
                    src: 'aeksaar-logo.png'
                },
                {
                    name: 'Landesärztekammer Brandenburg',
                    event: 'Kammerversammlung',
                    src: 'laekb-logo.png'
                },
                {
                    name: 'Berufsverband der Kinder- und Jugendärzte e.V.',
                    event: 'Delegiertenversammlung',
                    src: 'bvkj-logo.png'
                },
                {
                    name: 'Deutscher Hebammenverband',
                    event: 'Bundesdelegiertentagung',
                    src: 'dhv-logo.png'
                }
            ]
        },
        {
            name: _('Jugendverbände'),
            refs: [
                {
                    name: 'Bundesjugendwerk der AWO',
                    event: '(virtuelle) Bundesjugendwerkskonferenz',
                    src: 'bujw-logo.png'
                },
                {
                    name: 'Landesjugendring Rheinland-Pfalz',
                    event: '(virtuelle) Vollversammlung',
                    src: 'ljrrlp-logo.png'
                },
                {
                    name: 'Landesjugendring Niedersachsen',
                    event: 'Vollversammlung',
                    src: 'ljrnds-logo.png'
                },
                {
                    name: 'Landesjugendring Brandenburg',
                    event: 'Vollversammlung',
                    src: 'ljrbbg-logo.png'
                },
                {
                    name: 'Deutsche Pfadfinderschaft Sankt Georg (DPSG)',
                    event: 'Bundesversammlung',
                    src: 'dpsg-logo.png'
                },
                {
                    name: 'Bund der Pfadfinderinnen und Pfadfinder e.V.',
                    event: 'Bundesversammlung',
                    src: 'bdp-logo.png'
                },
                {
                    name: 'Katholische junge Gemeinde',
                    event: 'Bundeskonferenz',
                    src: 'kjg-logo.png'
                },
                {
                    name: 'Bund der Deutschen Katholischen Jugend',
                    event: 'Osnabrück, Trier, München, Berlin, ...',
                    src: 'bdkj-logo.png'
                },
                {
                    name: 'Arbeitsgemeinschaft der Evangelischen Jugend in Deutschland e. V. (aej)',
                    event: 'Mitgliederversammlung',
                    src: 'aej-logo.png'
                },
                {
                    name: 'Evangelische Jugend in Bayern',
                    event: 'Vollversammlung Landesjugendkonvent',
                    src: 'ejb-logo.png'
                },
                {
                    name: 'Stipendiatinnen und Stipendiaten des Cusanuswerks',
                    event: 'Cusanerkonferenz, Vollversammlung',
                    src: 'cusaner-logo.png'
                },
                {
                    name: 'Evangelische StudentInnengemeinde in der Bundesrepublik Deutschland (ESG)',
                    event: 'Bundesversammlung',
                    src: 'esg-logo.png'
                },
                {
                    name: 'Junge Europäische Föderalisten Deutschland e.V.',
                    event: 'Bundeskongress',
                    src: 'jef-logo.png'
                }
            ]
        },
        {
            name: _('Weitere Verbände, Vereine und Organisationen'),
            refs: [
                {
                    name: 'Amnesty International',
                    event: 'Jahresversammlung',
                    src: 'amnesty-logo.png',
                    frontpage: true
                },
                {
                    name: 'Bundesverband WindEndergie',
                    event: '(virtuelle) Delegiertenversammlung',
                    src: 'bwe-logo.png'
                },
                {
                    name: 'Allgemeiner Deutscher Fahrrad-Club e. V. (ADFC)',
                    event: 'Bund-Länder-Rat',
                    src: 'adfc-logo.png'
                },
                {
                    name: 'Verkehrsclub Deutschland e.V.',
                    event: 'Delegiertenversammlung',
                    src: 'vcd-logo.png'
                },
                {
                    name: 'VDI Verein Deutscher Ingenieure e.V.',
                    event: 'Vorstandsversammlung',
                    src: 'vdi-logo.png'
                },
                {
                    name: 'Verband der Automobilindustrie',
                    event: 'Mitgliederversammlung',
                    src: 'vda-logo.png'
                },
                {
                    name: 'Evangelisch-Lutherische Kirche in Norddeutschland',
                    event: 'Landessynode',
                    src: 'nordkirche-logo.png'
                },
                {
                    name: 'Volleyball Bundesliga GmbH',
                    event: 'Bundesligaversammlung',
                    src: 'vbl-logo.png'
                },
                {
                    name: 'AStA der Universität des Saarlandes',
                    event: 'Studierendenparlament',
                    src: 'asta-uni-saarland-logo.png'
                },
                {
                    name: 'Deutscher Verband für Neuro-Linguistisches Programmieren e.V.',
                    event: 'Mitgliederversammlung',
                    src: 'dvnlp-logo.png'
                },
                {
                    name: 'Mensa in Deutschland e.V.',
                    event: 'Mitgliederversammlung',
                    src: 'mensa-logo.png'
                },
                {
                    name: 'Opennet Initiative e.V.',
                    event: 'Jahresversammlung',
                    src: 'opennet-logo.png'
                },
                {
                    name: 'Evangelischer Kirchenkreis Krefeld-Viersen',
                    event: 'Kreissynode',
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
