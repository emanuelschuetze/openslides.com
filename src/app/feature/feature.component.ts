import { KeyValue } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { IImage } from 'ng-simple-slideshow';

import { FeatureDescription, FeaturesByRoute } from './feature-data';

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
    @ViewChild('slideshow') public slideshow: any;

    private img_path = 'assets/img/features/';
    public activeRoute = '';
    public lightboxMode = false;
    private _currentImagesCache: CurrentImagesCache;

    public featuresByRoute = FeaturesByRoute;

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

    public originalOrder(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
        return 0;
    }
}
