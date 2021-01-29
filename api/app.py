import sqlite3 as sql

from flask import render_template, request
from flask_babel import gettext as _
from flask_mail import Message
from jsonschema import validate
from jsonschema.exceptions import ValidationError

from src.app import app, currency  # noqa:F401
from src.data import get_extra_functions, get_packages, get_services
from src.db import DB_PATH, create_db_schema  # noqa:F401
from src.errors import (  # noqa:F401
    ViewError,
    handle_validation_error,
    handle_view_error,
)
from src.i18n import UseDefaultLanguageContext, get_locale  # noqa:F401
from src.mail import try_send_mail
from src.validation import base_schema, mail_schema, order_schema


VAT_PERCENTAGE = 0.19


@app.route("/api/order", methods=["POST"])
@app.route("/order", methods=["POST"])
def order():
    data = request.json
    base_schema.validate(data)
    mode = data["mode"]

    if mode == "order":
        validate(data, order_schema)
        mode_verbose = "Bestellung"
        customer_subject = _("Ihre Bestellung bei OpenSlides")
        recipients = app.config["ORDER_MAIL_RECIPIENTS"]
    else:
        # no additional validation needed
        mode_verbose = "Angebotsanfrage"
        customer_subject = _("Ihre Angebotsanfrage bei OpenSlides")
        recipients = app.config["OFFER_MAIL_RECIPIENTS"]

    if not app.config.get("ORDER_MAIL_RECIPIENTS"):
        raise ViewError(_("Konfigurationsfehler: Keine E-Mail-Empfänger"))

    overview_data = get_overview_data(data)

    # since the user might have another language selected, but the admin mail should be in german,
    # we have to hack it like this to enforce the language we want
    with UseDefaultLanguageContext():
        admin_mail = render_template(
            "admin-email.jinja",
            **get_summary_data(data),
            package_size=get_packages()[data["package"]]["max_users"],
            raw_functions_str=",".join(
                function
                for function, status in data["extra_functions"].items()
                if status
            ),
        )

    # admin message, always in german
    admin_subject = " ".join(
        ["OpenSlides", mode_verbose, data["contact_person"]["organisation"]]
    )
    msg = Message(
        subject=admin_subject,
        recipients=recipients,
        body=admin_mail,
        sender=data["contact_person"]["email"],
    )
    try_send_mail(msg)

    # customer message
    customer_mail = render_template(
        f"confirmation-email-{mode}.jinja",
        data=data,
        overview_data=overview_data,
        VAT_PERCENTAGE=VAT_PERCENTAGE,
        **get_summary_data(data),
    )
    msg = Message(
        subject=customer_subject,
        recipients=[data["contact_person"]["email"]],
        body=customer_mail,
    )
    try_send_mail(msg)

    return {}


def get_summary_data(data):
    contact_person = data["contact_person"]
    package = data["package"]
    summary_data = {
        **data,
        **contact_person,
        "package_str": get_packages()[package]["name"],
        "extra_functions_str": ", ".join(
            get_extra_functions()[extra_function]["name"]
            for extra_function, status in data["extra_functions"].items()
            if status
        ),
        "services_str": ", ".join(
            get_services()[service]
            for service, status in data["services"].items()
            if status
        )
        if "services" in data
        else None,
        "running_time_str": str(data["running_time"]) + " " + _("Monate")
        if data["running_time"] != "unlimited"
        else _("unbegrenzt"),
    }
    return summary_data


def get_overview_data(data):
    package = get_packages()[data["package"]]
    months = data["running_time"]
    isUnlimited = months == "unlimited"
    if isUnlimited:
        months = 12
    users = data["expected_users"]
    positions = [
        {
            "name": _("Hostingpaket") + ' "' + package["name"] + '"',
            "base_price": package["price"],
        }
    ]
    for function_key, function in get_extra_functions().items():
        if data["extra_functions"].get(function_key) or (
            function_key == "video-additional-units"
            and data["extra_functions"]["video"]
            and users > 250
        ):
            if "disabled" in function and function["disabled"](data):
                raise ViewError(
                    _(
                        f"Mit diesen Einstellungen kann {function['name']} nicht ausgewählt werden."
                    )
                )
            positions.append({"key": function_key, **function})

    total = 0
    for entry in positions:
        setDefaultsOnUnitDescriptor(entry)
        entry["units"] = (
            entry["units_func"](months, users) if entry.get("units_func") else 1
        )
        total += entry["base_price"] * entry["units"]

    return {
        "positions": positions,
        "total": total,
        "isUnlimited": isUnlimited,
    }


def setDefaultsOnUnitDescriptor(descriptor):
    if "units_desc" not in descriptor:
        descriptor["units_desc"] = [_("Monat"), _("Monate")]
    if "units_func" not in descriptor:
        descriptor["units_func"] = lambda months, _: months
    return descriptor


@app.route("/api/add_newsletter", methods=["POST"])
@app.route("/add_newsletter", methods=["POST"])
def add_newsletter():
    data = request.json
    try:
        mail_schema.validate(data)
    except ValidationError:
        raise ViewError(_("Diese E-Mail-Adresse ist ungültig"))

    try:
        with sql.connect(DB_PATH) as con:
            cur = con.cursor()
            cur.execute(
                "INSERT INTO mail_addresses (mail_address) VALUES (:mail_address)", data
            )
            con.commit()
    except sql.IntegrityError:
        con.rollback()
        raise ViewError(_("Diese E-Mail-Adresse ist bereits registriert"))
    except Exception as e:
        con.rollback()
        raise ViewError(e.message)
    finally:
        con.close()
    return {}


@app.route("/api/health", methods=["GET"])
@app.route("/health", methods=["GET"])
def health():
    return {"healthy": True}


if __name__ == "__main__":
    app.run()
