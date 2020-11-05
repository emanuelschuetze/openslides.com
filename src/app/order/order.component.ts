import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';

import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';

interface UnitDescriptor {
    units_func?: UnitsFunction;
    units_desc?: [string, string];
}

type UnitsFunction = (months: number, users: number) => number;
interface ExtraFunctionsEntry extends UnitDescriptor {
    hidden?: boolean;
    name: string;
    base_price: number;
    extra_infos?: string;
    parent?: string;
    child?: string;
    disabled?: () => boolean;
}
interface ExtraFunctionsMap {
    [key: string]: ExtraFunctionsEntry;
}

interface PackageMap {
    [key: string]: {
        name: string;
        max_users: number;
        price: number;
    };
}

interface ServiceMap {
    [key: string]: {
        name: string;
        default?: boolean;
    };
}

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
    public readonly VAT_PERCENTAGE = 0.16;

    private standard = Validators.pattern(
        /^[A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+)*$/
    );
    private standardNoNumber = Validators.pattern(
        /^[A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+)*$/
    );

    public orderForm: FormGroup;
    public error = null;
    public isOverviewStep = false;
    public isOffer = false;

    public get overviewData(): OverviewData {
        const pkg = this.packages[this.orderForm.controls.package.value];
        let months = this.orderForm.controls.running_time.value;
        const isUnlimited = months === 'unlimited';
        if (isUnlimited) {
            months = 12;
        }
        const users = this.orderForm.controls.expected_users.value;
        const positions: OverviewTableEntry[] = [
            this.setDefaultsOnUnitDescriptor({
                name: this.translate.instant('Hostingpaket') + ' "' + this.translate.instant(pkg.name) + '"',
                base_price: pkg.price,
                units: months
            } as OverviewTableEntry)
        ];

        const pushPosition = (functionKey: string) => {
            const extraFunction = this.extraFunctions[functionKey];
            const units = extraFunction.units_func ? extraFunction.units_func(months, users) : 1;
            const entry: OverviewTableEntry = {
                key: functionKey,
                name: this.translate.instant(extraFunction.name),
                units,
                ...extraFunction
            };
            positions.push(entry);
        };

        for (const functionKey in this.extraFunctions) {
            if (this.orderForm.controls.extra_functions.value[functionKey]) {
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

    public packages: PackageMap = {
        meeting: {
            name: _('Sitzung'),
            max_users: 50,
            price: 50
        },
        conference: {
            name: _('Tagung'),
            max_users: 500,
            price: 100
        },
        congress: {
            name: _('Kongress'),
            max_users: 1000,
            price: 200
        }
    };

    public extraFunctions: ExtraFunctionsMap = {
        evoting: {
            name: _('eVoting'),
            base_price: 50
        },
        audio: {
            name: _('Audiokonferenz'),
            base_price: 50,
            disabled: () => this.orderForm.controls.package.value !== 'meeting'
        },
        video: {
            name: _('Video-Livestream'),
            base_price: 1750,
            units_func: null,
            units_desc: null,
            extra_infos: _(
                // tslint:disable-next-line
                'Der Preis gilt pro Veranstaltungstag und ist abhängig vom Veranstaltungstag und Verfügbarkeiten.'
            ),
            child: 'external_video'
        },
        'video-additional-units': {
            hidden: true,
            name: _('Zusätzliche Livestream-Einheit'),
            base_price: 1500,
            units_func: (_m, users) => Math.ceil(users / 250) - 1,
            units_desc: [_('Einheit'), _('Einheiten')],
            extra_infos: _(
                // tslint:disable-next-line
                'Eine Einheit kann bis zu 250 Streamingnutzer bedienen. Pro 250 Nutzer ist somit eine zusätzliche Streaming-Einheit nötig.'
            )
        },
        external_video: {
            name: _('externer Livestream'),
            base_price: 750,
            parent: 'video',
            units_func: null,
            units_desc: null,
            disabled: () => !this.orderForm.controls.extra_functions.value.video
        },
        saml: {
            name: _('Single Sign-On via SAML'),
            base_price: 50
        },
        service: {
            name: _('Service-Pauschale'),
            base_price: 750,
            units_func: null,
            units_desc: null
        }
    };

    public services: ServiceMap = {
        schooling: {
            name: 'Schulung'
        },
        local_service: {
            name: 'Technische Begleitung der Veranstaltung (virtuell oder Vor-Ort)'
        },
        phone: {
            name: 'Telefonrufbereitschaft'
        }
    };

    public get hasLivestream(): boolean {
        return this.orderForm.controls.extra_functions.value.video;
    }

    public get hasExtraLivestream(): boolean {
        return (
            this.orderForm.controls.extra_functions.value.video && this.orderForm.controls.expected_users.value > 250
        );
    }

    public constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private translate: TranslateService
    ) {
        this.orderForm = this.fb.group({
            mode: ['order', []],
            package: ['', [Validators.required, Validators.pattern(Object.keys(this.packages).join('|'))]],
            running_time: ['', [Validators.required]],
            domain: ['', []],
            extra_functions: this.fb.group(
                Object.keys(this.extraFunctions).mapToObject(extraFunction => ({ [extraFunction]: [false, []] }))
            ),
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
                            /^(0|\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1))[\d\-/ ]{1,20}$/
                        )
                    ]
                ]
            }),
            billing_address: ['', [Validators.required]],
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
        this.orderForm.controls.package.setValue(packageName);
        this.isOffer = !!this.route.snapshot.queryParamMap.get('offer');
        const domainValidators = [Validators.pattern(/^[a-zA-Z0-9\-\.]+$/)];
        if (this.isOffer) {
            this.orderForm.controls.mode.setValue('offer');
            this.orderForm.addControl(
                'services',
                this.fb.group(
                    Object.entries(this.services).mapToObject(([key, service]) => ({ [key]: [!!service.default, []] }))
                )
            );
            this.orderForm.controls.billing_address.clearValidators();
        } else {
            domainValidators.push(Validators.required);
            this.orderForm.controls.billing_address.setValidators([Validators.required]);
            this.orderForm.addControl('tax_id', this.fb.control(''));
        }
        this.orderForm.controls.domain.setValidators(domainValidators);
    }

    public setDefaultsOnUnitDescriptor<T extends UnitDescriptor>(descriptor: T): T {
        if (descriptor.units_desc === undefined) {
            descriptor.units_desc = [_('Monat'), _('Monate')];
        }
        if (descriptor.units_func === undefined) {
            descriptor.units_func = months => months;
        }
        return descriptor;
    }

    public onSubmit(): void {
        if (this.isOffer) {
            this.order();
        } else if (this.orderForm.valid) {
            this.isOverviewStep = true;
            window.scroll(0, 0);
        }
    }

    public onChangeExtraFunction(e: MatCheckboxChange, key: string): void {
        const extraFunction = this.extraFunctions[key];
        if (!e.checked && extraFunction.child) {
            this.orderForm.controls.extra_functions.patchValue({ [extraFunction.child]: false });
        }
    }

    public onPackageChange(): void {
        if (this.orderForm.controls.package.value !== 'meeting') {
            this.orderForm.controls.extra_functions.patchValue({ audio: false });
        }
    }

    public async order(): Promise<void> {
        const data = this.orderForm.value;
        // I guess angular 10 introduced this error, but I couldn't find anything about it...
        data.expected_users = parseInt(data.expected_users, 10);

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
                        ) + 'info@openslides.com';
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
