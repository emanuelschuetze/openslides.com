import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { IImage } from 'ng-simple-slideshow';

interface FeatureDescription {
    title: string;
    icon: string;
    intro: string;
    image_names: string[];
    details: string[];
}
interface CurrentImagesCache {
    images: IImage[];
    lang: string;
    route: string;
    lightboxMode: boolean;
}

@Component({
    selector: 'app-feature',
    templateUrl: './feature.component.html',
    styleUrls: ['./feature.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FeatureComponent implements OnInit {
    @ViewChild('slideshow', { static: false }) public slideshow: any;

    private img_path = 'assets/img/features/';
    public activeRoute = '';
    public lightboxMode = false;
    public routeOrder = ['agenda', 'motions', 'elections', 'projectors', 'miscellaneous'];
    private _currentImagesCache: CurrentImagesCache;

    public featuresByRoute: { [route: string]: FeatureDescription } = {
        agenda: {
            title: _('Agenda'),
            icon: 'calendar_today',
            intro: _(
                'Stay flexible: Complement, amend or move automatically numbered agenda points in the running system.'
            ),
            image_names: ['overview', 'new-item', 'los', 'los-projected'],
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
            image_names: ['overview', 'detail', 'projected', 'pdf'],
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
            image_names: ['overview', 'detail', 'projected', 'pdf'],
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
            intro: _('Always live: Show the participants currently discussed contents on the projector canvasas.'),
            image_names: ['overview', 'detail'],
            details: [
                _('Instant update on changes'),
                _('Support of multiple projectors'),
                _('Individual projector design with your own logo and colors'),
                _('Order contents in a queue'),
                _('Keep an eye on the projections with the history'),
                _('Support of multiple resolutions'),
                _('Projection of PDF or image files')
            ]
        },
        miscellaneous: {
            title: _('Other functions'),
            icon: 'search',
            intro: _('Be curious: Discover many more functions of OpenSlides.'),
            image_names: ['participants', 'files', 'history', 'search'],
            details: [
                _('Directly witness live changes'),
                _('Manage participants, groups and permissions'),
                _('CSV import and export for participants'),
                _('Extensive file management system with access permissions per file and folder'),
                _('Global history on snapshot basis'),
                _('Global full text search'),
                _('Extensive sorting and filtering of all lists possible'),
                _('Configurable designs and creation of custom designs on request'),
                _('Multilingual (English, German, French, Czech, Portuguese, Spanish and Russian)'),
                _('Responsive design'),
                _('Platform independent web application based on Python 3 and Angular 8 in the modern Material Design'),
                _('Progressive WebApp with client-side caching and lazy loading for fast loading times')
            ]
        }
    };

    public get currentFeature(): FeatureDescription {
        return this.featuresByRoute[this.activeRoute];
    }

    /**
     * Getter function for the images. We have to cache them since angular checks on object equality and if we just return the map,
     * angular updates it on each function call, which causes annoying flickering
     */
    public get currentImages(): IImage[] {
        if (
            this._currentImagesCache &&
            this._currentImagesCache.lang === this.translate.currentLang &&
            this._currentImagesCache.route === this.activeRoute &&
            this._currentImagesCache.lightboxMode === this.lightboxMode
        ) {
            return this._currentImagesCache.images;
        }
        const img_names = this.currentFeature.image_names;
        this._currentImagesCache = {
            // create IImage array from file names and add click action to every image
            images: img_names.map(name => ({
                url: `${this.img_path}${this.activeRoute}/${this.activeRoute}_${name}_${this.translate.currentLang}.png`,
                // only set this when not in lightbox mode, so we don't close the mode by clicking on the image
                clickAction: this.lightboxMode ? null : this.toggleLightbox.bind(this) // bind is important! else 'this' is set wrong
            })),
            lang: this.translate.currentLang,
            route: this.activeRoute,
            lightboxMode: this.lightboxMode
        };
        return this._currentImagesCache.images;
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

    public toggleLightbox(): void {
        this.lightboxMode = !this.lightboxMode;
        (document.body as HTMLElement).classList.toggle('noscroll');
    }

    public onKeyDown(event: KeyboardEvent): void {
        if (this.lightboxMode) {
            if (event.key === 'Escape') {
                this.toggleLightbox();
            } else if (event.key === 'ArrowLeft') {
                this.slideshow.onSlide(-1);
            } else if (event.key === 'ArrowRight') {
                this.slideshow.onSlide(1);
            }
        }
    }

    private setActiveRoute(): void {
        const url = this.route.snapshot.url;
        this.activeRoute = url[url.length - 1].path;
    }
}
