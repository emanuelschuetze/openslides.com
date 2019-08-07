import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { Router } from '@angular/router';

/**
 * Enhance array with own functions
 * TODO: Remove once flatMap made its way into official JS/TS (ES 2019?)
 */
declare global {
    interface Array<T> {
        flatMap(o: any): any[];
        shuffle(): any[];
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public currentYear = new Date().getFullYear();

    public constructor(
        private scroller: ViewportScroller,
        private dateAdapter: DateAdapter<any>,
        public router: Router
    ) {
        this.overloadFlatMap();
        this.overloadShuffle();
    }

    public ngOnInit(): void {
        this.scroller.setOffset([0, 64]);
        this.dateAdapter.setLocale('de');
    }

    /**
     * Adds an implementation of flatMap.
     * TODO: Remove once flatMap made its way into official JS/TS (ES 2019?)
     */
    private overloadFlatMap(): void {
        const concat = (x: any, y: any) => x.concat(y);
        const flatMap = (f: any, xs: any) => xs.map(f).reduce(concat, []);
        Array.prototype.flatMap = function(f: any): any[] {
            return flatMap(f, this);
        };
    }

    /**
     * Adds a shuffle function to the array prototype
     */
    private overloadShuffle(): void {
        Array.prototype.shuffle = function(): any[] {
            const array = Array.from(this);
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
    }
}
