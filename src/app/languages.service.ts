import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
    private current = null;
    // Define here new languages...
    languages = [
        { code: 'en', name: 'English' },
        { code: 'de', name: 'Deutsch' },
        { code: 'es', name: 'Español' },
        { code: 'pt', name: 'Português' },
        { code: 'cs', name: 'Český' },
        { code: 'ru', name: 'русский' },
    ];

    constructor() {}

    // get detected browser language code
    getBrowserLanguage() {
        var lang = navigator.language;// || navigator.userLanguage;
        if (lang.indexOf('-') !== -1)
            lang = lang.split('-')[0];
        if (lang.indexOf('_') !== -1)
            lang = lang.split('_')[0];
        return lang;
    }

    getCurrentLanguage() {
        if (this.current === null) {
            this.current = this.getBrowserLanguage();
        }
        return this.current;
    }

    // set current language and return updated languages object array
    setCurrentLanguage(lang) {
        // var languages = this.getLanguages();
        // for (var l of languages) {
        //     l.selected = false;
        //     if (l.code == lang) {
        //         l.selected = true;
        //         // gettextCatalog.setCurrentLanguage(lang);
        //         // if (lang != 'en') {
        //         //     gettextCatalog.loadRemote("static/i18n/" + lang + ".json");
        //         // }
        //     }
        // }
        // return languages;
        this.current = lang;
    }
}