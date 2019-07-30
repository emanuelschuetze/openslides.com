import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScrollSpyService {
    public sectionChange = new EventEmitter<string>();

    public constructor() {}
}
