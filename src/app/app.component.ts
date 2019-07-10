import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private router: Router, private scroller: ViewportScroller) {
        this.scroller.setOffset([0, 64]);
    };
    
    public scrollTo(to: string) {
        this.scroller.scrollToAnchor(to);
    }
}
