import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ScrollSpyService } from '../scroll-spy.service';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
    public currentSection = '';

    public constructor(private scrollSpyService: ScrollSpyService, public router: Router) {}

    public ngOnInit(): void {
        this.scrollSpyService.sectionChange.subscribe((id: string) => (this.currentSection = id));
    }
}
