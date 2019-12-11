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
    private standard = Validators.pattern(/^[A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+)*$/);
    private standardNoNumber = Validators.pattern(/^[A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+)*$/);

    public orderForm: FormGroup;
    public error = null;

    public constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) {}

    public ngOnInit(): void {
        let packageName = this.route.snapshot.queryParamMap.get('package');
        if (!['single', 'basic', 'enterprise'].includes(packageName)) {
            packageName = 'single';
        }
        this.createForm(packageName);
    }

    private createForm(packageName: string): void {
        this.orderForm = this.fb.group({
            package: [packageName, [Validators.required, Validators.pattern(/^(single|basic|enterprise)$/)]],
            domain: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\-\.]+$/)]],
            event_name: ['', [Validators.required, this.standard]],
            event_location: ['', [Validators.required, this.standard]],
            event_date: ['', [Validators.required, this.standard]],
            expected_users: ['', [Validators.required]],
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
        });
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
                    this.error = 'The server is not reachable at the moment. Please try again later.';
                    break;
                default:
                    this.error = error.error.error || 'An unknwon error occurred.';
                    break;
            }
        }
    }
}
