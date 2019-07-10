import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
    constructor(private scroller: ViewportScroller, private router: Router) {
        this.scroller.setOffset([0, 64]);
    };

    public async navigate(url: string, fragment: string) {
        await this.router.navigate([url]);
        this.scrollTo(fragment);
    }
    
    public scrollTo(to: string) {
        this.scroller.scrollToAnchor(to);
    }
}
