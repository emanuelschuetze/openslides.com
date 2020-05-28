import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    private standard = Validators.pattern(
        /^[A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+)*$/
    );
    private standardNoNumber = Validators.pattern(
        /^[A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+)*$/
    );

    public orderForm: FormGroup;
    public error = null;

    public services = {
        evoting: _('eVoting'),
        audio: _('Audiokonferenz via Jitsi'),
        video: _('Video-Livestream'),
        saml: _('Single Sign-On via SAML')
    };

    public constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) {
        this.orderForm = this.fb.group({
            package: ['', [Validators.required, Validators.pattern(/^(meeting|conference|congress)$/)]],
            running_time: ['', [Validators.required]],
            domain: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\-\.]+$/)]],
            services: this.fb.group(Object.keys(this.services).mapToObject(service => ({ [service]: [false, []] }))),
            event_name: ['', [Validators.required, this.standard]],
            event_location: ['', [Validators.required, this.standard]],
            event_date: ['', [Validators.required, this.standard]],
            expected_users: ['', [Validators.required, Validators.min(0)]],
            contact_person: this.fb.group({
                organisation: ['', [Validators.required, this.standard]],
                name: ['', [Validators.required, this.standardNoNumber]],
                email: ['', [Validators.required, Validators.email]],
                phone: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(
                            // tslint:disable-next-line
                            /^(0|\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1))\d{1,14}$/
                        )
                    ]
                ]
            }),
            billing_address: ['', [Validators.required]],
            comment: ['', []]
        });
    }

    public ngOnInit(): void {
        let packageName = this.route.snapshot.queryParamMap.get('package');
        if (!['meeting', 'conference', 'congress'].includes(packageName)) {
            packageName = 'meeting';
        }
        this.orderForm.controls.package.setValue(packageName);
    }

    public async onSubmit(): Promise<void> {
        const data = this.orderForm.value;

        try {
            await this.http.post<void>('/api/order', data).toPromise();
            this.router.navigate(['order', 'success']);
        } catch (error) {
            switch (error.status) {
                case 502:
                case 504:
                    this.error = _(
                        // tslint:disable-next-line
                        'Bei der Übermittlung des Formulars ist leider ein Fehler aufgetreten. Bitte senden Sie uns Ihre Anfrage per E-Mail: hosting@openslides.com'
                    );
                    break;
                default:
                    this.error = error.error.error || _('Ein unbekannter Fehler ist aufgetreten.');
                    break;
            }
        }
    }

    public originalOrder(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
        return 0;
    }
}
