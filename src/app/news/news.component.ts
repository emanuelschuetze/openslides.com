import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent {
    public constructor(public translate: TranslateService) {}
}
