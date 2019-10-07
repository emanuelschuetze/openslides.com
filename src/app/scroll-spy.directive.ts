import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { ScrollSpyService } from './scroll-spy.service';

@Directive({
    selector: '[appScrollSpy]'
})
export class ScrollSpyDirective implements OnInit {
    // will be given if scroll position is lower than element
    @Input() public footer: string;

    private currentSection = null;
    private STICKY_HEADER_HEIGHT = 64;
    private MIN_VISIBLE_PIXELS = 100;
    private MIN_VISIBLE_PERC = 0.5;

    public constructor(private _el: ElementRef, private service: ScrollSpyService, private router: Router) {}

    public ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentSection = '';
                this.service.sectionChange.emit(this.currentSection);
            }
        });
    }

    @HostListener('window:scroll', [])
    public onScroll(): void {
        let max = 0;
        let maxID = '';
        const children = this._el.nativeElement.children;
        for (const element of children) {
            const lower = Math.max(window.scrollY + this.STICKY_HEADER_HEIGHT, element.offsetTop);
            const upper = Math.min(window.scrollY + window.innerHeight, element.offsetTop + element.scrollHeight);
            const visiblePixels = Math.max(upper - lower, 0);
            const visiblePerc = visiblePixels / element.scrollHeight;
            if (
                element.id &&
                visiblePerc > max &&
                (visiblePixels >= this.MIN_VISIBLE_PIXELS || visiblePerc >= this.MIN_VISIBLE_PERC)
            ) {
                max = visiblePerc;
                maxID = element.id;
            }
        }
        if (
            !maxID &&
            this.footer &&
            this._el.nativeElement.offsetTop + this._el.nativeElement.scrollHeight <
                window.scrollY + 0.75 * window.innerHeight
        ) {
            maxID = this.footer;
        }
        if (maxID !== this.currentSection) {
            this.currentSection = maxID;
            this.service.sectionChange.emit(this.currentSection);
        }
    }
}
