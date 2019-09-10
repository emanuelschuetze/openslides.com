import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlSegment } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface Language {
    code: string;
    name: string;
}

// Define here new languages...
export const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' }
];

/**
 * Custom url matcher to manage language prefixes.
 * If url starts with a valid language code, consume the language part and continue with routing.
 * Otherwise, returns null, so route doesn't match and default route is used (see routing module).
 */
const langRegEx = new RegExp('^(' + languages.map(e => e.code).join('|') + ')$'); // class attr so mapping is only done once
export function LanguageUrlMatcher(url: UrlSegment[]): { consumed: UrlSegment[] } | null {
    return url.length && url[0].path.match(langRegEx) ? { consumed: url.slice(0, 1) } : null;
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService implements CanActivate {
    public constructor(
        protected translate: TranslateService,
        private router: Router
    ) {
        // manually add the supported languages
        translate.addLangs(['en', 'de']);
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        // get the browsers default language
        const browserLang = translate.getBrowserLang();
        console.log(browserLang);
        // try to use the browser language if it is available. If not, uses english.
        translate.use(translate.getLangs().includes(browserLang) ? browserLang : 'en');
    }

    /**
     * get detected browser language code
     */
    public getBrowserLanguage(): string {
        let lang = navigator.language || (<any>navigator).userLanguage; // IE fallback
        if (lang.indexOf('-') !== -1) {
            lang = lang.split('-')[0];
        }
        if (lang.indexOf('_') !== -1) {
            lang = lang.split('_')[0];
        }
        return lang;
    }

    /**
     * Helper function because languages has to be static because the UrlMatcher has to static
     * to be accessible in the routing module.
     */
    public getLanguages(): Language[] {
        return languages;
    }

    /**
     * Extracts the current language from the url.
     */
    public getCurrentLanguage(): string {
        try {
            return this.router.url.match(/^\/(..)/)[1]; // match the language part of the url. At index 1 is the search group result
        } catch {
            return this.getBrowserLanguage();
        }
    }

    /**
     * set current language and return updated languages object array
     */
    public setCurrentLanguage(lang: string): void {
        this.router.navigate(
            [lang].concat(
                this.router.url
                    .split(/#|\?/)[0]
                    .split('/')
                    .slice(2)
            )
        ); // slice(2) cause the url is /xx/page so the array is ["", "xx", "page"] and we only want to keep the page, not the language
        console.log(lang);
        this.translate.use(lang).subscribe();
    }

    /**
     * Acts as a Guard for routing. Redirects to the browser default language.
     */
    public canActivate(route: ActivatedRouteSnapshot): boolean {
        this.router.navigate([this.getCurrentLanguage()].concat(route.url.map(e => e.path)), {
            fragment: route.fragment,
            queryParams: route.queryParams
            // queryParamsHandling: "merge" // not working...
            // preserveFragment: true,
        });
        return false;
    }
}
