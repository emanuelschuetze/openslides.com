import smtplib
import sqlite3 as sql
from shutil import copyfile

from flask import Flask, request
from flask_mail import Mail, Message
from jsonschema import validate
from jsonschema.exceptions import ValidationError

app = Flask(__name__)
try:
    app.config.from_pyfile("config.py")
except FileNotFoundError:
    app.logger.warning("Didn't find a config.py. Copied the template to config.py")
    copyfile("./config.py.tpl", "./config.py")
    app.config.from_pyfile("config.py")

mail = Mail(app)

standard_pattern = r"^[A-Za-zäöüß0-9'\.\-\s\,#]+$"
standard_pattern_no_number = r"^[A-Za-zäöüß'\.\-\s\,#]+$"
# see https://emailregex.com/
email_regex = r"""(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"""  # noqa
order_schema = {
    "type": "object",
    "properties": {
        "package": {"type": "string", "pattern": "^(single|basic|enterprise)$"},
        "domain": {"type": "string", "pattern": r"^[a-zA-Z0-9\-\.]+$"},
        "event_name": {"type": "string", "pattern": standard_pattern},
        "event_location": {"type": "string", "pattern": standard_pattern},
        "event_date": {"type": "string", "pattern": standard_pattern},
        "expected_users": {"type": "string", "pattern": standard_pattern},
        "contact_person": {
            "type": "object",
            "properties": {
                "organisation": {"type": "string", "pattern": standard_pattern},
                "name": {"type": "string", "pattern": standard_pattern_no_number},
                "email": {"type": "string", "pattern": email_regex},
                "phone": {
                    "type": "string",
                    "pattern": r"^(0|\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42"
                    + r"\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|"
                    + r"4[987654310]|3[9643210]|2[70]|7|1))\d{1,14}$",
                },
            },
            "required": ["name", "email", "phone"],
        },
        "billing_address": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "pattern": standard_pattern},
                "street": {"type": "string", "pattern": standard_pattern},
                "extra": {"type": "string"},
                "zipcode": {"type": "string", "pattern": "^[0-9]{4,5}$"},
                "city": {"type": "string", "pattern": standard_pattern_no_number},
                "country": {"type": "string", "pattern": standard_pattern_no_number},
            },
            "required": ["name", "street", "extra", "zipcode", "city", "country"],
        },
    },
    "required": [
        "package",
        "domain",
        "event_name",
        "event_location",
        "event_date",
        "expected_users",
        "contact_person",
        "billing_address",
    ],
}
mail_schema = {
    "type": "object",
    "properties": {"mail_address": {"type": "string", "pattern": email_regex}},
    "required": ["mail_address"],
}

DB_PATH = app.config.get("DB_PATH", "database.sqlite3")


@app.before_first_request
def create_db_schema():
    with sql.connect(DB_PATH) as con:
        cur = con.cursor()
        cur.execute(
            "CREATE TABLE IF NOT EXISTS mail_addresses(mail_address text PRIMARY KEY NOT NULL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);"
        )
        con.commit()


class ViewError(Exception):
    def __init__(self, message, status_code=400):
        super().__init__(self)
        self.message = message
        self.status_code = status_code


@app.errorhandler(ViewError)
def handle_view_error(error):
    return {"error": error.message}, error.status_code


@app.errorhandler(ValidationError)
def handle_validation_error(error):
    return {"error": error.message}, 400


@app.route("/api/order", methods=["POST"])
@app.route("/order", methods=["POST"])
def order():
    data = request.json
    validate(data, order_schema)

    if not app.config.get("ORDER_MAIL_RECIPIENTS"):
        raise ViewError("Configuration error: No order mail recipients")

    msg = Message("OpenSlides-Anfrage", recipients=app.config["ORDER_MAIL_RECIPIENTS"])
    contact_person = data.pop("contact_person")
    billing_address = data.pop("billing_address")
    msg.html = (
        """
        Paket: {package}<br>
        Wunschdomain: {domain}<br>
        <br>
        Veranstaltungsname: {event_name}<br>
        Veranstaltungsort: {event_location}<br>
        Veranstaltungszeitraum: {event_date}<br>
        Erwartete Teilnehmeranzahl: {expected_users}<br>
        <br>
    """.format(
            **data
        )
        + """
        Ansprechpartner:<br>
        Veranstalter: {organisation}<br>
        Name: {name}<br>
        E-Mail: {email}<br>
        Telefon: {phone}<br>
        <br>
    """.format(
            **contact_person
        )
        + """
        Rechnungsanschrift:<br>
        Name: {name}<br>
        Straße: {street}<br>
        Adresszusatz: {extra}<br>
        PLZ: {zipcode}<br>
        Ort: {city}<br>
        Land: {country}
    """.format(
            **billing_address
        )
    )
    try:
        mail.send(msg)
    except smtplib.SMTPServerDisconnected:
        raise ViewError("Please configure the server correctly")
    except smtplib.SMTPRecipientsRefused as e:
        messages = [
            "{}: {} {}".format(r, errno, msg.decode())
            for r, (errno, msg) in e.recipients.items()
        ]
        raise ViewError("Could not send email to: " + ", ".join(messages))
    return {}


@app.route("/api/add_newsletter", methods=["POST"])
@app.route("/add_newsletter", methods=["POST"])
def add_newsletter():
    data = request.json
    try:
        validate(data, mail_schema)
    except ValidationError:
        raise ViewError("The email is not valid")

    try:
        with sql.connect(DB_PATH) as con:
            cur = con.cursor()
            cur.execute(
                "INSERT INTO mail_addresses (mail_address) VALUES (:mail_address)", data
            )
            con.commit()
    except sql.IntegrityError:
        con.rollback()
        raise ViewError("Address already exists")
    except Exception as e:
        con.rollback()
        from pdb import set_trace

        set_trace()
        raise ViewError(e.message)
    finally:
        con.close()
    return {}


if __name__ == "__main__":
    app.run()
