import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes, UrlSegment } from '@angular/router';

import { ContactComponent } from './contact/contact.component';
import { DgbBundeskongressComponent } from './dgb-bundeskongress/dgb-bundeskongress.component';
import { FeatureComponent } from './feature/feature.component';
import { LanguageService, LanguageUrlMatcher } from './language.service';
import { ImpressumComponent } from './legal-notice/legal-notice.component';
import { MainComponent } from './main/main.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderComponent } from './order/order.component';
import { PricesComponent } from './prices/prices.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ReferencesComponent } from './references/references.component';

export function FeatureUrlMatcher(url: UrlSegment[]): { consumed: UrlSegment[] } | null {
    return url.length && url[0].path.match('agenda|motions|elections|projectors|miscellaneous')
        ? { consumed: url.slice(0, 1) }
        : null;
}

const routes: Routes = [
    // LanguageUrlMatcher accepts all registered language prefixes,
    // children are the actual pages
    {
        matcher: LanguageUrlMatcher,
        children: [
            { path: '', component: MainComponent, pathMatch: 'full' },
            { path: 'contact', component: ContactComponent },
            { path: 'legalnotice', component: ImpressumComponent },
            { path: 'privacy', component: PrivacyComponent },
            { path: 'references', component: ReferencesComponent },
            { path: 'prices', component: PricesComponent },
            {
                path: 'order',
                children: [
                    { path: '', component: OrderComponent, pathMatch: 'full' },
                    { path: 'success', component: OrderSuccessComponent },
                    { path: '**', redirectTo: '' }
                ]
            },
            {
                path: 'feature',
                children: [{ matcher: FeatureUrlMatcher, component: FeatureComponent }, { path: '**', redirectTo: '' }]
            },
            { path: 'dgb-bundeskongress', component: DgbBundeskongressComponent },
            { path: '**', redirectTo: '' }
        ]
    },
    { path: '**', children: [], canActivate: [LanguageService] } // no error page, just redirect to front page
];
const options: ExtraOptions = {
    scrollPositionRestoration: 'top', // keeping scrolling positions between pages sucks
    anchorScrolling: 'enabled', // why is this not enabled by default?,
    onSameUrlNavigation: 'reload' // so anchor links work correctly
    // enableTracing: true
};

@NgModule({
    imports: [RouterModule.forRoot(routes, options)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
