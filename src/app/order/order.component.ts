import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';

import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';

import { extraFunctions, ExtraFunctionsEntry, packages, services, UnitDescriptor } from './order-data';

interface OverviewTableEntry extends UnitDescriptor, ExtraFunctionsEntry {
    key?: string;
    units: number;
    total?: number;
}
interface OverviewData {
    positions: OverviewTableEntry[];
    total: number;
    isUnlimited: boolean;
}

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {
    // the applied VAT percentage
    public readonly VAT_PERCENTAGE = 0.19;

    private standard = Validators.pattern(
        /^[A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+)*$/
    );
    private standardNoNumber = Validators.pattern(
        /^[A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+)*$/
    );

    public hostingDataForm: FormGroup;
    public detailsForm: FormGroup;
    public error = null;
    public step = 1;
    public tomorrow = new Date();

    public packages = packages;
    public services = services;
    public extraFunctions = extraFunctions;

    public get overviewData(): OverviewData {
        const data = this.hostingDataForm.value;
        if (!data.running_time) {
            data.running_time = 1;
        }
        const pkg = this.packages[data.package];
        let months = data.running_time;
        const isUnlimited = months === 'unlimited';
        if (isUnlimited) {
            months = 12;
        }
        const users = data.expected_users;
        const positions: OverviewTableEntry[] = [
            this.setDefaultsOnUnitDescriptor({
                name: this.translate.instant('Hostingpaket') + ' "' + this.translate.instant(pkg.name) + '"',
                base_price: pkg.price,
                units: months
            } as OverviewTableEntry)
        ];

        const pushPosition = (functionKey: string) => {
            const extraFunction = this.extraFunctions[functionKey];
            const units = extraFunction.units_func ? extraFunction.units_func(data) : 1;
            const entry: OverviewTableEntry = {
                key: functionKey,
                name: this.translate.instant(extraFunction.name),
                units,
                ...extraFunction
            };
            positions.push(entry);
        };

        for (const functionKey in this.extraFunctions) {
            if (data.extra_functions[functionKey]) {
                pushPosition(functionKey);
                if (functionKey === 'video' && users > 250) {
                    pushPosition('video-additional-units');
                }
            }
        }
        let total = 0;
        for (const entry of positions) {
            entry.total = entry.units * entry.base_price;
            total += entry.total;
        }
        return { positions, total, isUnlimited };
    }

    public get hasLivestream(): boolean {
        return this.hostingDataForm.controls.extra_functions.value.video;
    }

    public get hasExtraLivestream(): boolean {
        return (
            this.hostingDataForm.controls.extra_functions.value.video &&
            this.hostingDataForm.controls.expected_users.value > 250
        );
    }

    public get isOffer(): boolean {
        return this.step === 3;
    }

    public constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private translate: TranslateService
    ) {
        this.tomorrow.setDate(this.tomorrow.getDate() + 1);
        this.hostingDataForm = this.fb.group({
            package: ['', [Validators.required, Validators.pattern(Object.keys(this.packages).join('|'))]],
            running_time: ['', [Validators.required]],
            extra_functions: this.fb.group(
                Object.keys(this.extraFunctions).mapToObject(extraFunction => ({ [extraFunction]: [false, []] }))
            ),
            services: this.fb.group(
                Object.entries(this.services).mapToObject(([key, service]) => ({ [key]: [!!service.default, []] }))
            ),
            event_from: ['', [Validators.required]],
            event_to: ['', [Validators.required]],
            expected_users: ['', [Validators.required, Validators.min(0)]]
        });
        this.detailsForm = this.fb.group({
            mode: ['order', []],
            domain: ['', []],
            event_name: ['', [Validators.required, this.standard]],
            event_location: ['', [Validators.required, this.standard]],
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
                            /^(0|\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1))[\d\-/ ]{1,20}$/
                        )
                    ]
                ]
            }),
            billing_address: this.fb.group({
                name: ['', [Validators.required, this.standard]],
                extra: ['', [this.standard]],
                street: ['', [Validators.required, this.standard]],
                zip: ['', [Validators.required, this.standard]],
                city: ['', [Validators.required, this.standard]],
                country: ['', [Validators.required, this.standard]]
            }),
            comment: ['', []]
        });

        // add defaults to extra funtions
        for (const extraFunction of Object.values(this.extraFunctions)) {
            this.setDefaultsOnUnitDescriptor(extraFunction);
        }
    }

    public ngOnInit(): void {
        let packageName = this.route.snapshot.queryParamMap.get('package');
        if (!Object.keys(this.packages).includes(packageName)) {
            packageName = 'meeting';
        }
        this.hostingDataForm.controls.package.setValue(packageName);
    }

    public setDefaultsOnUnitDescriptor<T extends UnitDescriptor>(descriptor: T): T {
        if (descriptor.units_desc === undefined) {
            descriptor.units_desc = [_('Monat'), _('Monate')];
        }
        if (descriptor.units_func === undefined) {
            descriptor.units_func = data => (data.running_time === 'unlimited' ? 12 : data.running_time);
        }
        return descriptor;
    }

    public nextStep(nextStep: number): void {
        this.step = nextStep;
        window.scroll(0, 0);

        const domainValidators = [Validators.pattern(/^[a-zA-Z0-9\-\.]+$/)];
        if (this.step === 3) {
            this.detailsForm.controls.mode.setValue('offer');
            this.detailsForm.controls.billing_address.clearValidators();
        } else {
            domainValidators.push(Validators.required);
            this.detailsForm.controls.billing_address.setValidators([Validators.required]);
            this.detailsForm.addControl('tax_id', this.fb.control(''));
        }
        this.detailsForm.controls.domain.setValidators(domainValidators);
    }

    public onChangeExtraFunction(e: MatCheckboxChange, key: string): void {
        const extraFunction = this.extraFunctions[key];
        if (!e.checked && extraFunction.child) {
            this.hostingDataForm.controls.extra_functions.patchValue({ [extraFunction.child]: false });
        }
    }

    public onPackageChange(): void {
        for (const [extraFunctionKey, extraFunction] of Object.entries(this.extraFunctions)) {
            if (extraFunction.disabled && extraFunction.disabled(this.hostingDataForm.value)) {
                this.hostingDataForm.controls.extra_functions.patchValue({ [extraFunctionKey]: false });
            }
        }
    }

    public async order(): Promise<void> {
        const data = { ...this.hostingDataForm.value, ...this.detailsForm.value };
        // I guess angular 10 introduced this error, but I couldn't find anything about it...
        data.expected_users = parseInt(data.expected_users, 10);
        // format dates as YYYY-MM-DD
        for (const field of ['event_from', 'event_to']) {
            data[field] = data[field].format('YYYY-MM-DD');
        }

        try {
            await this.http.post<void>('/api/order', data).toPromise();
            this.router.navigate(['order', 'success']);
        } catch (error) {
            switch (error.status) {
                case 502:
                case 504:
                    this.error =
                        _(
                            // tslint:disable-next-line
                            'Bei der Übermittlung des Formulars ist leider ein Fehler aufgetreten. Bitte senden Sie uns Ihre Anfrage per E-Mail:'
                        ) + ' info@openslides.com';
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
