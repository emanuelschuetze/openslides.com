import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export interface UnitDescriptor {
    units_func?: UnitsFunction;
    units_desc?: [string, string];
}

export type UnitsFunction = (data: any) => number;

export interface ExtraFunctionsEntry extends UnitDescriptor {
    hidden?: boolean;
    name: string;
    base_price: number;
    extra_infos?: string;
    parent?: string;
    child?: string;
    disabled?: (data: any) => boolean;
}

export interface ExtraFunctionsMap {
    [key: string]: ExtraFunctionsEntry;
}

export interface PackageMap {
    [key: string]: {
        name: string;
        max_users: number;
        price: number;
    };
}

export interface ServiceMap {
    [key: string]: {
        name: string;
        default?: boolean;
    };
}

export const packages: PackageMap = {
    meeting: {
        name: _('Sitzung'),
        max_users: 50,
        price: 250
    },
    conference: {
        name: _('Tagung'),
        max_users: 250,
        price: 500
    },
    congress: {
        name: _('Kongress'),
        max_users: 500,
        price: 1000
    }
};

export const extraFunctions: ExtraFunctionsMap = {
    service: {
        name: _('Supportpauschale'),
        base_price: 750,
        units_func: null,
        units_desc: null,
        extra_infos: _(
            // tslint:disable-next-line
            'Zur individuellen Basisunterstützung in der Vor- und Nachbereitung Ihrer Veranstaltung - per E-Mail und Telefon.'
        )
    },
    video: {
        name: _('Video-Livestream mit Jitsi-Videokonferenz'),
        base_price: 1750,
        // add one to duration because we want the number of days, not the diff
        units_func: data => (data.event_from && data.event_to?.diff(data.event_from, 'days') + 1) || 1,
        units_desc: [_('Tag'), _('Tage')],
        extra_infos: _(
            // tslint:disable-next-line
            'Bereitstellung und Integration eines Video-Livestreams in OpenSlides, Bereitstellung eines Jitsi-Videokonferenzraums, Koppelung mit der aktuellen Redeliste. - Der Preis gilt pauschal pro Veranstaltungstag für die ersten 250 Streamingnutzer. Abhängig vom Veranstaltungstag und Verfügbarkeiten.'
        ),
        disabled: data => data.package === 'meeting',
        child: 'external_video'
    },
    'video-additional-units': {
        hidden: true,
        name: _('zusätzliche Streamingnutzer'),
        base_price: 1500,
        units_func: data => Math.ceil(data.expected_users / 250) - 1,
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
        extra_infos: _(
            // tslint:disable-next-line
            'Einrichtung eines RTMP-Streaming-Uploads für einen vor Ort produzierten Video-Livestream. Koordination der Schnittstellen mit Ihrem Streaming-Dienstleister (hybrides Veranstaltungsformat).'
        ),
        disabled: data => !data.extra_functions.video
    },
    audio: {
        name: _('Audio-/Videokonferenz'),
        base_price: 100,
        extra_infos: _(
            // tslint:disable-next-line
            'Integrierte Jitsi-Videokonferenz mit Jitsi - ohne Livestream. Ideal zum direkten Austausch für kleine virtuelle Gremiensitzung (bis max 50 Teilnehmende, nur im Hostingpaket "Sitzung").'
        ),
        disabled: data => data.package !== 'meeting'
    },
    jitsi_phone: {
        name: _('Jitsi-Telefoneinwahl'),
        base_price: 100,
        units_func: null,
        units_desc: null,
        extra_infos: _('Einrichtung einer Festnetz-Rufnummer zur telefonischen Einwahl in die Jitsi-Videokonferenz'),
        disabled: data => !data.extra_functions.audio && !data.extra_functions.video
    },
    saml: {
        name: _('Single Sign-On via SAML'),
        base_price: 200,
        extra_infos: _(
            // tslint:disable-next-line
            'Zur Anbindung eines bereits existierenden SAML-Mitgliedsservers. Nur verfügbar für das Hostingpaket "Kongress"'
        ),
        disabled: data => data.package !== 'congress'
    },
    chat: {
        name: _('Chat'),
        base_price: 250,
        units_func: null,
        units_desc: null,
        extra_infos: _('Bereitstellung und Integration eines Chats, mehrere Gruppenräume konfigurierbar.')
    }
};

export const services: ServiceMap = {
    schooling: {
        name: 'Online-Schulung'
    },
    local_service: {
        name: 'Technische Begleitung Ihrer Veranstaltung (virtuell oder Vor-Ort)'
    },
    phone: {
        name: 'Telefonrufbereitschaft'
    }
};
