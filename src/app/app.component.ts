import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';

import { LanguageService } from './language.service';

/**
 * Enhance array with own functions
 * TODO: Remove once flatMap made its way into official JS/TS (ES 2019?)
 */
declare global {
    interface Array<T> {
        flatMap(o: any): any[];
        shuffle(): any[];
        mapToObject(f: (item: T) => { [key: string]: any }): { [key: string]: any };
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
        private dateAdapter: DateAdapter<any>,
        public router: Router,
        public languageService: LanguageService
    ) {
        this.overloadArrayFunctions();
    }

    public ngOnInit(): void {
        this.dateAdapter.setLocale('en');
    }

    private overloadArrayFunctions(): void {
        /**
         * Adds an implementation of flatMap.
         * TODO: Remove once flatMap made its way into official JS/TS (ES 2019?)
         */
        const concat = (x: any, y: any) => x.concat(y);
        const flatMap = (f: any, xs: any) => xs.map(f).reduce(concat, []);
        Array.prototype.flatMap = function(f: any): any[] {
            return flatMap(f, this);
        };

        /**
         * Adds a shuffle function to the array prototype
         */
        Array.prototype.shuffle = function(): any[] {
            const array = Array.from(this);
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        /**
         * Add mapToObject
         */
        Array.prototype.mapToObject = function<T>(f: (item: T) => { [key: string]: any }): { [key: string]: any } {
            return this.reduce((aggr, item) => {
                const res = f(item);
                for (const key in res) {
                    if (res.hasOwnProperty(key)) {
                        aggr[key] = res[key];
                    }
                }
                return aggr;
            }, {});
        };
    }
}
