import math

from flask_babel import gettext as _


def get_packages():
    return {
        "meeting": {"name": _("Sitzung"), "max_users": 50, "price": 50},
        "conference": {"name": _("Tagung"), "max_users": 500, "price": 100},
        "congress": {"name": _("Kongress"), "max_users": 1000, "price": 200},
    }


def get_extra_functions():
    return {
        "evoting": {"name": _("eVoting"), "base_price": 50},
        "audio": {"name": _("Audiokonferenz via Jitsi"), "base_price": 50},
        "video": {
            "name": _("Video-Livestream"),
            "base_price": 1750,
            "units_func": None,
            "units_desc": None,
        },
        "video-additional-units": {
            "hidden": True,
            "name": _('Zusätzliche Livestream-Einheit'),
            "base_price": 1500,
            "units_func": lambda _m, users: math.ceil(users / 250) - 1,
            "units_desc": [_('Einheit'), _('Einheiten')],
        },
        "external_video": {
            "name": _('externer Livestream'),
            "base_price": 750,
            "units_func": None,
            "units_desc": None,
        },
        "saml": {"name": _("Single Sign-On via SAML"), "base_price": 50},
        "service": {
            "name": _('Service-Pauschale'),
            "base_price": 750,
            "units_func": None,
            "units_desc": None,
        },
    }


def get_services():
    return {
        "schooling": _("Schulung"),
        "local_service": _(
            "Technische Begleitung der Veranstaltung (virtuell oder Vor-Ort)"
        ),
        "phone": _("Telefonrufbereitschaft"),
    }
