import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';

interface FeatureDescription {
    title: string;
    icon: string;
    intro: string;
    images_de: { url: string; caption?: string }[];
    images_en?: { url: string; caption?: string }[];
    details: string[];
}

@Component({
    selector: 'app-feature',
    templateUrl: './feature.component.html',
    styleUrls: ['./feature.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FeatureComponent implements OnInit {
    private path = 'assets/img/features/';
    public activeRoute = '';
    public routeOrder = ['agenda', 'motions', 'elections', 'projectors', 'miscellaneous'];

    public featuresByRoute: { [route: string]: FeatureDescription } = {
        agenda: {
            title: _('Agenda'),
            icon: 'calendar_today',
            intro: _(
                'Stay flexible: Complement, amend or move automatically numbered agenda points in the running system.'
            ),
            images_de: [
                { url: `${this.path}agenda/agenda_overview_de.png` },
                { url: `${this.path}agenda/agenda_new-item_de.png` },
                { url: `${this.path}agenda/agenda_los_de.png` },
                { url: `${this.path}agenda/agenda_los-projected_de.png` }
            ],
            images_en: [
                { url: `${this.path}agenda/agenda_overview_en.png` },
                { url: `${this.path}agenda/agenda_new-item_en.png` },
                { url: `${this.path}agenda/agenda_los_en.png` },
                { url: `${this.path}agenda/agenda_los-projected_en.png` }
            ],
            details: [
                _('Lists of speakers for every agenda point'),
                _('Flexible adding of agenda points for every kind of content'),
                _('The current list of speakers always in view (as an overlay or on a second projector)'),
                _('Countdowns to limit speaking time'),
                _('Automatic numbering of agenda points'),
                _('Time management: Estimate the duration of each agenda point'),
                _('Integrate inofficial agenda points (e.g. breaks) into the agenda'),
                _('Mark and hide closed agenda points'),
                _('Individual visibilities for each agenda point'),
                _('Export the agenda as PDF'),
                _('Sort the agenda via drag&drop')
            ]
        },
        motions: {
            title: _('Motions'),
            icon: 'note',
            intro: _('Save paper: Log and manage motions and voting results digitally.'),
            images_de: [
                { url: `${this.path}motions/motions_overview_de.png` },
                { url: `${this.path}motions/motions_detail_de.png` },
                { url: `${this.path}motions/motions_projected_de.png` },
                { url: `${this.path}motions/motions_pdf_de.png` }
            ],
            images_en: [
                { url: `${this.path}motions/motions_overview_en.png` },
                { url: `${this.path}motions/motions_detail_en.png` },
                { url: `${this.path}motions/motions_projected_en.png` },
                { url: `${this.path}motions/motions_pdf_en.png` }
            ],
            details: [
                _('Customizable motion status messages and work flows'),
                _('Manage motions with motion blocks and tags'),
                _('Automatically number motions in categories and subcategories'),
                _('Sort motions in a calling list'),
                _('Define for each motion how many supporters are needed'),
                _('Create amendments and change recommendations on basis of line numbers'),
                _('Support of statute motions'),
                _('Show/hide motions in the agenda'),
                _('Inline HTML editor to format the motion text and reasoning'),
                _('Allow motion comment fields'),
                _('Log voting results'),
                _('Export motions as PDF, CSV or XLSX')
            ]
        },
        elections: {
            title: _('Elections'),
            icon: 'pie_chart',
            intro: _('Streamline the procedure: Generate ad-hoc ballots for your secret elections.'),
            images_de: [
                { url: `${this.path}elections/elections_overview_de.png` },
                { url: `${this.path}elections/elections_detail_de.png` },
                { url: `${this.path}elections/elections_projected_de.png` },
                { url: `${this.path}elections/elections_pdf_de.png` }
            ],
            images_en: [
                { url: `${this.path}elections/elections_overview_en.png` },
                { url: `${this.path}elections/elections_detail_en.png` },
                { url: `${this.path}elections/elections_projected_en.png` },
                { url: `${this.path}elections/elections_pdf_en.png` }
            ],
            details: [
                _('Propose candidates off the participants list'),
                _('Print personalized ballots for secret elections'),
                _('Supported election modes: Yes/no/abstention or one vote per candidates'),
                _('Election results on different bases for 100%'),
                _('Multiple election gears'),
                _('Enter election results and project them with a diagram'),
                _('Export elections (with all results) as PDF')
            ]
        },
        projectors: {
            title: _('Projectors'),
            icon: 'videocam',
            intro: _('Always live: Show the aprticipants currently discussed contents on the projector canvasas.'),
            images_de: [
                { url: `${this.path}projectors/projectors_overview_de.png` },
                { url: `${this.path}projectors/projectors_detail_de.png` }
            ],
            images_en: [
                { url: `${this.path}projectors/projectors_overview_en.png` },
                { url: `${this.path}projectors/projectors_detail_en.png` }
            ],
            details: [
                _('Instant update on changes'),
                _('Support of multiple projectors'),
                _('Individual projector design with your own logo and colors'),
                _('Order contents in a queue'),
                _('Keep an eye on the projections with the history'),
                _('Support of multiple resolutions'),
                _('Projection of PDF, image and video files')
            ]
        },
        miscellaneous: {
            title: _('Other functions'),
            icon: 'search',
            intro: _('Be curious: Discover many more functions of OpenSlides.'),
            images_de: [
                { url: `${this.path}miscellanious/miscellanious_participants_de.png` },
                { url: `${this.path}miscellanious/miscellanious_files_de.png` },
                { url: `${this.path}miscellanious/miscellanious_history_de.png` },
                { url: `${this.path}miscellanious/miscellanious_search_de.png` }
            ],
            images_en: [
                { url: `${this.path}miscellanious/miscellanious_participants_en.png` },
                { url: `${this.path}miscellanious/miscellanious_files_en.png` },
                { url: `${this.path}miscellanious/miscellanious_history_en.png` },
                { url: `${this.path}miscellanious/miscellanious_search_en.png` }
            ],
            details: [
                _('Directly witness live changes'),
                _('Manage participants, groups and permissions'),
                _('CSV import and export for participants'),
                _('Extensive file management system with access permissions per file and folder'),
                _('Global history on snapshot basis'),
                _('Global full text search'),
                _('Extensive sorting and filtering of all lists possible'),
                _('Configurable themes and creation of custom themes on request'),
                _('Responsive design'),
                _('Multilingual (English, German, French, Czech, Portuguese, Spanish and Russian)'),
                _('Platform independent web application based on Python 3 and Angular 8 in the modern Material Design'),
                _('Progressive WebApp with client-side caching and lazy loading for fast loading times')
            ]
        }
    };

    public get currentFeature(): FeatureDescription {
        return this.featuresByRoute[this.activeRoute];
    }

    public constructor(private route: ActivatedRoute, public router: Router, public translate: TranslateService) {}

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
