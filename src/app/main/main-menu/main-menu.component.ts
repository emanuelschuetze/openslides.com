import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LanguageService } from 'src/app/language.service';

import { ScrollSpyService } from '../../scroll-spy.service';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
    public currentSection = '';

    public constructor(
        private scrollSpyService: ScrollSpyService,
        public router: Router,
        public languageService: LanguageService
    ) {}

    public ngOnInit(): void {
        this.scrollSpyService.sectionChange.subscribe((id: string) => (this.currentSection = id));
    }
}
