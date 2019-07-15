from flask import Flask, request
from jsonschema import validate
from flask_mail import Mail, Message

app = Flask(__name__)
app.config.from_pyfile("config.py")
mail = Mail(app)

standard_pattern = "^[A-Za-zäöüß0-9'\.\-\s\,#]+$"
standard_pattern_no_number = "^[A-Za-zäöüß'\.\-\s\,#]+$"
schema = {
    "type": "object",
    "properties": {
        "tariff": { "type" : "string", "pattern": "^(single|basic|enterprise)$" },
        "domain": { "type" : "string", "pattern": "^[a-zA-Z0-9\-\.]+$" },
        "event_name": { "type": "string", "pattern": standard_pattern },
        "organizer": { "type": "string", "pattern": standard_pattern },
        "location": { "type": "string", "pattern": standard_pattern },
        "event_from": { "type": "string", "format": "date" },
        "event_to": { "type": "string", "format": "date" },
        "hosting_from": { "type": "string", "format": "date" },
        "hosting_to": { "type": "string", "format": "date" },
        "expected_users": { "type": "integer", "minimum": 1},
        "contact_person": {
            "type": "object",
            "properties": {
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
    "required": ["tariff", "domain", "event_name", "organizer", "location", "event_from", "event_to", "hosting_from", "hosting_to", "expected_users", "contact_person", "billing_address"]
}

@app.route('/api/order', methods=["POST", "GET"])
def send_mail():
    data = request.json
    try:
        validate(data, schema)
    except Exception as e:
        # from pdb import set_trace; set_trace()
        return { "success": False, "error": e.message }
    msg = Message("OpenSlides-Anfrage", recipients=["joshua.sangmeister@intevation.de"])
    msg.html = f"""
        Tarif: {data["tariff"]}<br>
        Wunschdomain: {data["domain"]}<br>
        Veranstaltungsname: {data["event_name"]}<br>
        <br>
        Veranstalter: {data["organizer"]}<br>
        Veranstaltungszeitraum: {data["event_from"]} bis {data["event_to"]}<br>
        Hostingzeitraum: {data["hosting_from"]} bis {data["hosting_to"]}<br>
        Veranstaltungsort: {data["location"]}<br>
        Erwartete Teilnehmeranzahl: {data["expected_users"]}<br>
        <br>
        Ansprechpartner:<br>
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

if __name__ == "__main__":
    app.run()