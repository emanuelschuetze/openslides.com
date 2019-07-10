import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule, MatDividerModule, MatListModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageControllerComponent } from './language-controller/language-controller.component';
import { WrappableDirective } from './wrappable.directive';
import { MainMenuComponent } from './main-menu/main-menu.component';

import { MainComponent } from './main/main.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ReferencesComponent } from './references/references.component';
import { DownloadComponent } from './download/download.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
    declarations: [
        AppComponent,
        LanguageControllerComponent,
        WrappableDirective,
        MainMenuComponent,
        MainComponent,
        PrivacyComponent,
        ImpressumComponent,
        ReferencesComponent,
        DownloadComponent,
        NewsComponent,
        ContactComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        BrowserAnimationsModule,

        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
