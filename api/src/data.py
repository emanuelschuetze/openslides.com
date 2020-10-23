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
            "base_price": 750,
            "units_func": lambda _, users: math.ceil(users / 250),
            "units_desc": [_("Einheit"), _("Einheiten")],
        },
        "saml": {"name": _("Single Sign-On via SAML"), "base_price": 50},
    }


def get_services():
    return {
        "schooling": _("Schulung"),
        "local_service": _(
            "Technische Begleitung der Veranstaltung (virtuell oder Vor-Ort)"
        ),
        "phone": _("Telefonrufbereitschaft"),
    }
