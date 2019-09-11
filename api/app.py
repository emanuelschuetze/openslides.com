from flask import Flask, request
from jsonschema import validate
from flask_mail import Mail, Message
import sqlite3 as sql

app = Flask(__name__)
app.config.from_pyfile("config.py")
mail = Mail(app)

standard_pattern = "^[A-Za-zäöüß0-9'\.\-\s\,#]+$"
standard_pattern_no_number = "^[A-Za-zäöüß'\.\-\s\,#]+$"
schema = {
    "type": "object",
    "properties": {
        "package": { "type" : "string", "pattern": "^(single|basic|enterprise)$" },
        "domain": { "type" : "string", "pattern": "^[a-zA-Z0-9\-\.]+$" },
        "event_name": { "type": "string", "pattern": standard_pattern },
        "event_location": { "type": "string", "pattern": standard_pattern },
        "event_date": { "type": "string", "pattern": standard_pattern },
        "expected_users": { "type": "string", "pattern": standard_pattern },
        "contact_person": {
            "type": "object",
            "properties": {
                "organisation": { "type": "string", "pattern": standard_pattern },
                "name": { "type": "string", "pattern": standard_pattern_no_number },
                "email": { "type": "string", "format": "email" },
                "phone": { "type": "string", "pattern": "^(0|\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1))\d{1,14}$"}
            },
            "required": ["name", "email", "phone"]
        },
        "billing_address": {
            "type": "object",
            "properties": {
                "name": { "type": "string", "pattern": standard_pattern },
                "street": { "type": "string", "pattern": standard_pattern },
                "extra": { "type": "string" },
                "zipcode": { "type": "string", "pattern": "^[0-9]{4,5}$" },
                "city": { "type": "string", "pattern": standard_pattern_no_number },
                "country": { "type": "string", "pattern": standard_pattern_no_number }
            },
            "required": ["name", "street", "extra", "zipcode", "city", "country"]
        }
    },
    "required": ["package", "domain", "event_name", "event_location", "event_date", "expected_users", "contact_person", "billing_address"]
}
schema_mail = {
    "type": "object",
    "properties": {
        "mail_address": { "type": "string", "format": "email" }
    }
}

@app.route('/api/order', methods=["POST"])
# @app.route('/api/order', methods=["POST", "GET"])  # DEBUG
def send_mail():
    data = request.json
    try:
        validate(data, schema)
    except Exception as e:
        # from pdb import set_trace; set_trace()
        return { "success": False, "error": e.message }
    msg = Message("OpenSlides-Anfrage", recipients=["joshua.sangmeister@intevation.de"])
    msg.html = f"""
        Paket: {data["package"]}<br>
        Wunschdomain: {data["domain"]}<br>
        <br>
        Veranstaltungsname: {data["event_name"]}<br>
        Veranstaltungsort: {data["event_location"]}<br>
        Veranstaltungszeitraum: {data["event_date"]}<br>
        Erwartete Teilnehmeranzahl: {data["expected_users"]}<br>
        <br>
        Ansprechpartner:<br>
        Veranstalter: {data["contact_person"]["organisation"]}<br>
        Name: {data["contact_person"]["name"]}<br>
        E-Mail: {data["contact_person"]["email"]}<br>
        Telefon: {data["contact_person"]["phone"]}<br>
        <br>
        Rechnungsanschrift:<br>
        Name: {data["billing_address"]["name"]}<br>
        Straße: {data["billing_address"]["street"]}<br>
        Adresszusatz: {data["billing_address"]["extra"]}<br>
        PLZ: {data["billing_address"]["zipcode"]}<br>
        Ort: {data["billing_address"]["city"]}<br>
        Land: {data["billing_address"]["country"]}
    """
    mail.send(msg)
    return { "success": True }

@app.route('/api/add_newsletter', methods=["POST"])
def save_mail():
    data = request.json
    try:
        validate(data, schema_mail)
    except Exception as e:
        return { "success": False, "error": e.message }
    # from pdb import set_trace; set_trace()
    try:
        with sql.connect("database.db") as con:
            cur = con.cursor()
            cur.execute("INSERT INTO mail_addresses (mail_address, created) VALUES (:mail_address, datetime('now'))", data)
            con.commit()
    except sql.IntegrityError as e:
        con.rollback()
        return { "success": False, "error": "Address already exists" }
    except Exception as e:
        con.rollback()
        return { "success": False, "error": e.message }
    finally:
        con.close()
    return { "success": True }

if __name__ == "__main__":
    app.run()