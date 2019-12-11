import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { ReferenceService } from '../reference.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
    public images = [
        { caption: '<b>Lorem</b> ipsum', href: '/feature/agenda', url: 'assets/img/features/agenda-list_de.png' },
        { caption: 'Lorem ipsum', href: '/feature/motions', url: 'assets/img/features/agenda-list-of-speakers_de.png' },
        {
            caption: 'Lorem ipsum',
            href: '/feature/elections',
            url: 'assets/img/features/agenda-list-of-speakers-projector_de.png'
        },
        { caption: 'Lorem ipsum', href: '/feature/projectors', url: 'assets/img/features/agenda-projector_de.png' }
    ];
    private quotesSource = [
        {
            author: 'BÜNDNIS 90/DIE GRÜNEN, Landesverband Hamburg',
            text:
                // tslint:disable-next-line
                'Wir sehen in OpenSlides ein innovatives Open Source Produkt, das dabei hilft, unsere demokratischen, innerparteilichen Strukturen in das digitale Zeitalter zu transportieren.'
        },
        {
            author: 'Evangelischer Kirchenkreis Krefeld-Viersen',
            text:
                // tslint:disable-next-line
                "OpenSlides unterstützt uns schon bei der Planung. Während der Veranstaltung bleiben wir immer flexibel und können situationsbedingt 'Folien' ein- und ausblenden."
        },
        {
            author: 'Sächsische Landesärztekammer',
            text:
                // tslint:disable-next-line
                'Eine Software ist auf Dauer nur so gut wie seine Entwickler. Wir gehen davon aus, mit der Firma Intevation und Herrn Schütze auf Dauer einen kompetenten und verlässlichen Partner an unserer Seite zu haben.'
        }
    ];
    public quotes: { caption: string; url: string }[] = [];

    public mailInput = new FormControl('', [Validators.required, Validators.email]);
    public emailForm = new FormGroup({ email: this.mailInput });
    public error: string;
    public success = false;
    private fragment: string;

    public constructor(
        public refService: ReferenceService,
        public http: HttpClient,
        public translate: TranslateService,
        private route: ActivatedRoute,
        private scroller: ViewportScroller
    ) {}

    public ngOnInit(): void {
        this.quotes = this.quotesSource.map(quote => ({
            caption: `
                <div class="quote-container">
                    <h1>
                        <i>»${quote.text}«</i>
                    </h1>
                    <div class="mt-1">
                        <span>${quote.author}</span>
                    </div>
                </div>
            `,
            url: '#'
        }));
        this.route.fragment.subscribe(fragment => {
            this.fragment = fragment;
        });
    }

    public ngAfterViewInit(): void {
        // after every image load, jump to the current anchor
        document.querySelectorAll('img').forEach(img =>
            img.addEventListener('load', () => {
                if (this.fragment) {
                    this.scroller.scrollToAnchor(this.fragment);
                }
            })
        );
    }

    public getErrorMessage(): string {
        return this.mailInput.hasError('required')
            ? 'You must enter a value'
            : this.mailInput.hasError('email')
            ? 'Not a valid email'
            : this.error;
    }

    public async onSubmit(): Promise<void> {
        if (!this.emailForm.valid) {
            return;
        }
        try {
            await this.http
                .post<void>('/api/add_newsletter', { mail_address: this.mailInput.value })
                .toPromise();
            this.success = true;
            this.mailInput.reset();
            this.error = null;
            this.mailInput.setErrors([]);
        } catch (error) {
            switch (error.status) {
                case 502:
                case 504:
                    this.error = 'The server is not reachable at the moment. Please try again later.';
                    break;
                default:
                    this.error = error.error.error || 'An unknwon error occurred.';
                    break;
            }
            this.mailInput.setErrors([this.error]);
        }
    }
}
