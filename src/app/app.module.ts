import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SlideshowModule } from 'ng-simple-slideshow';
import { TrimValueAccessorModule } from 'ng-trim-value-accessor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlePaperlessComponent } from './news/article-paperless/article-paperless.component';
import { ArticleVirtualAssemblyComponent } from './news/article-virtual-assembly/article-virtual-assembly.component';
import { DgbBundeskongressComponent } from './news/dgb-bundeskongress/dgb-bundeskongress.component';
import { FeatureComponent } from './feature/feature.component';
import { ImpressumComponent } from './legal-notice/legal-notice.component';
import { LocalizedDatePipe } from './localized-date.pipe';
import { MainMenuComponent } from './main/main-menu/main-menu.component';
import { MainComponent } from './main/main.component';
import { NewsComponent } from './news/news.component';
import { ArticleOnlineMeetingBasisComponent } from './news/online-versammlungen-basis/online-versammlungen-basis.component';
import { ArticleOnlineMeetingComponent } from './news/online-versammlungen/online-versammlungen.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderComponent } from './order/order.component';
import { PricesComponent } from './prices/prices.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ReferenceContainerComponent } from './reference-container/reference-container.component';
import { ReferencesComponent } from './references/references.component';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { TranslateHtmlDirective } from './translate-html.directive';
import { WrappableDirective } from './wrappable.directive';

registerLocaleData(localeDe, 'de');
registerLocaleData(localeEn, 'en');

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        WrappableDirective,
        ScrollSpyDirective,
        TranslateHtmlDirective,
        LocalizedDatePipe,
        MainMenuComponent,
        MainComponent,
        PrivacyComponent,
        ImpressumComponent,
        ReferencesComponent,
        PricesComponent,
        OrderComponent,
        FeatureComponent,
        OrderSuccessComponent,
        DgbBundeskongressComponent,
        ArticleOnlineMeetingComponent,
        ArticleOnlineMeetingBasisComponent,
        ReferenceContainerComponent,
        NewsComponent,
        ArticlePaperlessComponent,
        ArticleVirtualAssemblyComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        SlideshowModule,
        HttpClientModule,
        TrimValueAccessorModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),

        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatListModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatTableModule,
        MatTooltipModule
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'de-DE'
        }
    ],
    schemas: [NO_ERRORS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {}
