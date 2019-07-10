import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { MainComponent } from './main/main.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ReferencesComponent } from './references/references.component';
import { DownloadComponent } from './download/download.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'download', component: DownloadComponent },
    { path: 'impressum', component: ImpressumComponent },
    { path: 'news', component: NewsComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'references', component: ReferencesComponent }
];
const options: ExtraOptions = {
    scrollPositionRestoration: "top",
    anchorScrolling: 'enabled'
};

@NgModule({
    imports: [RouterModule.forRoot(routes, options)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
