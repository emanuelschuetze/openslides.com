import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

interface FeatureDescription {
    title: string;
    icon: string;
    intro: string;
    images: { url: string; caption?: string }[];
    details: string[];
}

@Component({
    selector: 'app-feature',
    templateUrl: './feature.component.html',
    styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
    private path = 'assets/img/features/new/';
    public activeRoute = '';
    public featuresByRoute: { [route: string]: FeatureDescription } = {
        agenda: {
            title: 'Agenda',
            icon: 'calendar_today',
            intro:
                'Stay flexible: Complement, amend or move automatically numbered agenda points in the running system.',
            images: [
                { url: `${this.path}agenda_overview_de.png` },
                { url: `${this.path}agenda_new-item_de.png` },
                { url: `${this.path}agenda_los_de.png` },
                { url: `${this.path}agenda-los-projected_de.png` }
            ],
            details: [
                'Lists of speakers for every agenda point',
                'Flexible adding of agenda points for every kind of content',
                'The current list of speakers always in view (as an overlay or on a second projector)',
                'Countdowns to limit speaking time',
                'Automatic numbering of agenda points',
                'Time management: Estimate the duration of each agenda point',
                'Integrate inofficial agenda points (e.g. breaks) into the agenda',
                'Mark and hide closed agenda points',
                'Individual visibilities for each agenda point',
                'Export the agenda as PDF',
                'Sort the agenda via drag&drop'
            ]
        },
        motions: {
            title: 'Motions',
            icon: 'note',
            intro: 'Save paper: Log and manage motions and voting results digitally.',
            images: [
                { url: `${this.path}motions_overview_de.png` },
                { url: `${this.path}motions_detail_de.png` },
                { url: `${this.path}motions_projected_de.png` },
                { url: `${this.path}motions_pdf_de.png` }
            ],
            details: [
                'Customizable motion status messages and work flows',
                'Manage motions with motion blocks and tags',
                'Automatically number motions in categories and subcategories',
                'Sort motions in a calling list',
                'Define for each motion how many supporters are needed',
                'Create amendments and change recommendations on basis of line numbers',
                'Support of statute motions',
                'Show/hide motions in the agenda',
                'Inline HTML editor to format the motion text and reasoning',
                'Allow motion comment fields',
                'Log voting results',
                'Export motions as PDF, CSV or XLSX'
            ]
        },
        elections: {
            title: 'Elections',
            icon: 'pie_chart',
            intro: 'Streamline the procedure: Generate ad-hoc ballots for your secret elections.',
            images: [
                { url: `${this.path}elections_overview_de.png` },
                { url: `${this.path}elections_projected_de.png` },
                { url: `${this.path}elections_pdf_de.png` }
            ],
            details: [
                'Propose candidates off the participants list',
                'Print personalized ballots for secret elections',
                'Supported election modes: Yes/no/abstention or one vote per candidates',
                'Election results on different bases for 100%',
                'Multiple election gears',
                'Enter election results and project them with a diagram',
                'Export elections (with all results) as PDF'
            ]
        },
        projectors: {
            title: 'Projectors',
            icon: 'videocam',
            intro: 'Always live: Show the aprticipants currently discussed contents on the projector canvasas.',
            images: [
                { url: `${this.path}projectors_overview_de.png` },
                { url: `${this.path}projectors_detail_de.png` }
            ],
            details: [
                'Presentation of the contents for the participants',
                'Instant update on changes',
                'Support of multiple projectors',
                'Individual projector design with your own logo',
                'Order contents in a queue',
                'Keep an eye on the projections with the history',
                'Support of multiple resolutions',
                'Projection of PDF, image and video files'
            ]
        },
        miscellaneous: {
            title: 'Other functions',
            icon: 'search',
            intro: 'Be curious: Discover many more functions of OpenSlides.',
            images: [
                { url: `${this.path}miscellanious_participants_de.png` },
                { url: `${this.path}miscellanious_files_de.png` },
                { url: `${this.path}miscellanious_history_de.png` }
            ],
            details: [
                'Directly witness live changes',
                'Manage participants, groups and permissions',
                'Extensive file management system with access permissions per file and folder',
                'CSV import and export for the agenda, motions and participants',
                'Management and grouping by tags',
                'Global history on snapshot basis',
                'Global full text search',
                'Extensive sorting and filtering of all lists possible',
                'Configurable themes and creation of custom themes on request',
                'Responsive design',
                'Multilingual (English, German, French, Czech, Portuguese, Spanish and Russian)',
                'Platform-indipendent web application based on Python 3 and Angular 8 in the modern Material Design',
                'Progressive WebApp with client-side caching and lazy loading for fast loading times'
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
