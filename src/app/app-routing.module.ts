import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes, UrlSegment } from '@angular/router';

import { ArticlePaperlessComponent } from './news/article-paperless/article-paperless.component';
import { ArticleVirtualAssemblyComponent } from './news/article-virtual-assembly/article-virtual-assembly.component';
import { DgbBundeskongressComponent } from './news/dgb-bundeskongress/dgb-bundeskongress.component';
import { FeatureComponent } from './feature/feature.component';
import { LanguageService, LanguageUrlMatcher } from './language.service';
import { ImpressumComponent } from './legal-notice/legal-notice.component';
import { MainComponent } from './main/main.component';
import { NewsComponent } from './news/news.component';
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
            { path: 'legalnotice', component: ImpressumComponent },
            {
                path: 'news',
                children: [
                    { path: '', component: NewsComponent, pathMatch: 'full' },
                    { path: 'dgb-bundeskongress2018', component: DgbBundeskongressComponent },
                    { path: '20141125', component: ArticlePaperlessComponent },
                    { path: '20121119', component: ArticleVirtualAssemblyComponent }
                ]
            },
            { path: 'privacy', component: PrivacyComponent },
            { path: 'references', component: ReferencesComponent },
            { path: 'pricing', component: PricesComponent },
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
                children: [
                    { matcher: FeatureUrlMatcher, component: FeatureComponent },
                    { path: '**', redirectTo: '' }
                ]
            },
            { path: '**', redirectTo: '' }
        ]
    },
    { path: '**', children: [], canActivate: [LanguageService] } // no error page, just redirect to front page
];
const options: ExtraOptions = {
    // enableTracing: true,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled', // why is this not enabled by default?,
    onSameUrlNavigation: 'reload', // so anchor links work correctly
    scrollOffset: [0, 64] // offset to account for top bar
};

@NgModule({
    imports: [RouterModule.forRoot(routes, options)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
