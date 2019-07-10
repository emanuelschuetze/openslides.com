import { Component } from '@angular/core';
import { LanguageService } from '../languages.service';

@Component({
  selector: 'app-language-controller',
  templateUrl: './language-controller.component.html',
  styleUrls: ['./language-controller.component.scss']
})
export class LanguageControllerComponent {
    constructor(public languageService: LanguageService) {};
    // get all available languages
    // languages = LanguageService.getLanguages();
    // // controller to switch app language
    // switchLanguage = function (lang) {
    //     this.selectedLangCode = lang;
    //     this.languages = LanguageService.setCurrentLanguage(lang);
    // };
    // getLanguageHref = function (lang) {
    //     return window.location.toString().split('?')[0] + '?lang=' + lang;
    // };
}