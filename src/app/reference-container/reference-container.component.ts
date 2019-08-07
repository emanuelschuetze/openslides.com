import { Component, Input } from '@angular/core';

import { ReferenceObject } from '../reference.service';

@Component({
    selector: 'app-reference-container',
    templateUrl: './reference-container.component.html',
    styleUrls: ['./reference-container.component.scss']
})
export class ReferenceContainerComponent {
    @Input()
    public ref: ReferenceObject;
}
