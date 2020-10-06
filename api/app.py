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
from src.validation import base_schema, mail_schema, offer_schema, order_schema


VAT_PERCENTAGE = 0.16


@app.route("/api/order", methods=["POST"])
@app.route("/order", methods=["POST"])
def order():
    data = request.json
    base_schema.validate(data)
    if data["mode"] == "order":
        validate(data, order_schema)
    else:
        validate(data, offer_schema)

    if not app.config.get("ORDER_MAIL_RECIPIENTS"):
        raise ViewError(_("Konfigurationsfehler: Keine E-Mail-Empfänger"))

    confirmation_mail = render_template(
        "confirmation-email.jinja", name=data["contact_person"]["name"]
    )
    price_overview = get_prices_overview_str(data)
    data_customer = render_template("order-summary.jinja", **get_summary_data(data))

    # since the user might have another language selected, but the admin mail should be in german,
    # we have to hack it like this to enforce the language we want
    with UseDefaultLanguageContext():
        summary = render_template("order-summary.jinja", **get_summary_data(data))
        metadata = render_template(
            "metadata.jinja",
            package_size=get_packages()[data["package"]]["max_users"],
            raw_functions_str=",".join(
                function
                for function, status in data["extra_functions"].items()
                if status
            ),
        )
        admin_mail = join_mail_bodies(summary, metadata)

    # admin message, always in german
    subject = "Angebotsanfrage" if data["mode"] == "offer" else "Bestellung"
    msg = Message(
        "OpenSlides " + subject + " " + data["contact_person"]["organisation"],
        recipients=app.config["ORDER_MAIL_RECIPIENTS"],
    )
    msg.body = admin_mail
    try_send_mail(msg)

    # customer message
    msg = Message(
        _("Ihre Angebotsanfrage bei OpenSlides")
        if data["mode"] == "offer"
        else _("Ihre Bestellung bei OpenSlides"),
        recipients=[data["contact_person"]["email"]],
    )
    if data["mode"] == "order":
        msg.body = join_mail_bodies(
            confirmation_mail, price_overview, "\n" + _("Ihre Angaben:"), data_customer
        )
    else:
        msg.body = join_mail_bodies(
            confirmation_mail, "\n" + _("Ihre Angaben:"), data_customer
        )
    try_send_mail(msg)

    return {}


def join_mail_bodies(*bodies):
    return "\n\n".join(bodies)


def get_summary_data(data):
    contact_person = data["contact_person"]
    package = data["package"]
    extra_data = {
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
    return merge(data, contact_person, extra_data)


def merge(*dicts):
    return dict(kv for d in dicts for kv in d.items())


def get_prices_overview_str(data):
    overview_data = get_overview_data(data)
    return render_template(
        "prices-overview.jinja",
        data=data,
        overview_data=overview_data,
        VAT_PERCENTAGE=VAT_PERCENTAGE,
    )


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
        if data["extra_functions"][function_key]:
            positions.append(
                merge(
                    {
                        "key": function_key,
                    },
                    function,
                )
            )

    total = 0
    for entry in positions:
        setDefaultsOnUnitDescriptor(entry)
        entry["units"] = entry["units_func"](months, users)
        total += entry["base_price"] * entry["units"]

    return {
        "positions": positions,
        "total": total,
        "isUnlimited": isUnlimited,
    }


def setDefaultsOnUnitDescriptor(descriptor):
    if not descriptor.get("units_desc"):
        descriptor["units_desc"] = [_("Monat"), _("Monate")]
    if not descriptor.get("units_func"):
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
