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
            package: ['', [Validators.required, Validators.pattern(/^(single|basic|enterprise)$/)]],
            domain: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\-\.]+$/)]],
            event_name: ['', [Validators.required, this.standard]],
            event_location: ['', [Validators.required, this.standard]],
            event_date: ['', [Validators.required, this.standard]],
            expected_users: ['', [Validators.required, this.standard]],
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
            billing_address: this.fb.group({
                name: ['', [Validators.required, this.standard]],
                street: ['', [Validators.required, this.standard]],
                extra: [''],
                zipcode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,5}$/)]],
                city: ['', [Validators.required, this.standardNoNumber]],
                country: ['', [Validators.required, this.standardNoNumber]]
            })
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
        // if package is given in get params, set it
        const t = this.route.snapshot.queryParamMap.get('package');
        if (t) {
            this.orderForm.get('package').setValue(t);
        }
    }

    public onSubmit(): void {
        const data = this.orderForm.value;
    
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
                        this.error = 'Der Server ist momentan nicht erreichbar. Bitte probieren Sie es später noch einmal.';
                        break;
                    default:
                        this.error = error.message;
                        break;
                }
            }
        );
    }
}
