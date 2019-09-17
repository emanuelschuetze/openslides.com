import { Pipe, PipeTransform } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

/**
 * pipe to convert and translate dates
 */
@Pipe({
    name: 'localizedDate',
    pure: false
})
export class LocalizedDatePipe implements PipeTransform {
    public constructor(private translate: TranslateService) {}

    /**
     * Accepts all ISO and RFC formats as well as javascript milliseconds
     * (calls moment(...) internally)
     * @param value value to be parsed
     * @param dateFormat format to output
     */
    public transform(value: any, dateFormat: string = 'L'): any {
        const lang = this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang;
        if (!value) {
            return '';
        }
        moment.locale(lang);
        const dateLocale = moment(value).local();
        return dateLocale.format(dateFormat);
    }
}
