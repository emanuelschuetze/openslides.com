import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    private standard = Validators.pattern(/^[A-Za-zäöüß0-9'\.\-\s\,#]+$/);
    private standardNoNumber = Validators.pattern(/^[A-Za-zäöüß'\.\-\s\,#]+$/);

    public orderForm = this.fb.group(
        {
            tariff: ['', [Validators.required, Validators.pattern(/^(single|basic|enterprise)$/)]],
            domain: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\-\.]+$/)]],
            event_name: ['', [Validators.required, this.standard]],
            organizer: ['', [Validators.required, this.standard]],
            location: ['', [Validators.required, this.standard]],
            event_from: ['', [Validators.required]],
            event_to: ['', [Validators.required]],
            hosting_from: ['', [Validators.required]],
            hosting_to: ['', [Validators.required]],
            expected_users: ['', [Validators.required, Validators.min(1)]],
            contact_person: this.fb.group({
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
            billing_address: this.fb.group({
                name: ['', [Validators.required, this.standard]],
                street: ['', [Validators.required, this.standard]],
                extra: [''],
                zipcode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,5}$/)]],
                city: ['', [Validators.required, this.standardNoNumber]],
                country: ['', [Validators.required, this.standardNoNumber]]
            })
        },
        {
            validators: [this.dateLessThan('event_from', 'event_to'), this.dateLessThan('hosting_from', 'hosting_to')]
        }
    );
    public error = null;

    public constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) {}

    public ngOnInit(): void {
        // if tariff is given in get params, set it
        const t = this.route.snapshot.queryParamMap.get('tariff');
        if (t) {
            this.orderForm.get('tariff').setValue(t);
        }
    }

    public onSubmit(): void {
        const data = this.orderForm.value;
        // format the dates in DD.MM.YYYY since time is irrelevant
        const dateFields = ['event_from', 'event_to', 'hosting_from', 'hosting_to'];
        for (const key of dateFields) {
            if (data[key] && data[key].format) {
                data[key] = data[key].format('DD.MM.YYYY');
            }
        }
        // post the request
        // TODO typing..
        this.http.post<any>('/api/order', data).subscribe(
            res => {
                console.log('res:', res);
                if (res.success === true) {
                    this.router.navigate(['order', 'success']);
                } else {
                    this.error = res.error || 'Ein unbekannter Fehler ist aufgetreten.';
                }
            },
            error => {
                console.log(error);
                switch (error.status) {
                    case 502:
                    case 504:
                        this.error = 'Der Server ist momentan nicht erreichbar. Bitte probieren Sie es später nochmal.';
                        break;
                    default:
                        this.error = error.message;
                        break;
                }
            }
        );
    }

    /**
     * compares the given date inputs and sets errors according to their states
     * @param from the key of the "from" control
     * @param to the key of the "to" control
     * @return null if no error was set, otherwise the error
     */
    public dateLessThan(from: string, to: string): (group: FormGroup) => { negativeDatespan: boolean } | null {
        return (group: FormGroup) => {
            const f = group.controls[from];
            const t = group.controls[to];
            if (f.value && t.value && f.value > t.value) {
                let errors = t.errors || {};
                errors.negativeDatespan = true;
                t.setErrors(errors);
                errors = f.errors || {};
                errors.negativeDatespan = true;
                f.setErrors(errors);
                return { negativeDatespan: true };
            } else {
                if (t.errors && t.errors.negativeDatespan) {
                    t.updateValueAndValidity();
                }
                if (f.errors && f.errors.negativeDatespan) {
                    f.updateValueAndValidity();
                }
                return null;
            }
        };
    }
}
