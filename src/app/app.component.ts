import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { Router } from '@angular/router';

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
    ) {}

    public ngOnInit(): void {
        this.scroller.setOffset([0, 64]);
        this.dateAdapter.setLocale('de');
    }
}
