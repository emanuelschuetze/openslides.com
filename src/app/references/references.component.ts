import { Component } from '@angular/core';

import { ReferenceService } from '../reference.service';

@Component({
    selector: 'app-references',
    templateUrl: './references.component.html',
    styleUrls: ['./references.component.scss']
})
export class ReferencesComponent {
    public constructor(public refService: ReferenceService) {}
}
