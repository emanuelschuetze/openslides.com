#!/bin/bash

curl --header "Content-Type: application/json" -e https://www.openslides.com/de/order -d '{
    "package": "conference",
    "running_time": "unlimited",
    "domain": "xyz",
    "services": {
        "evoting": true,
        "audio": false,
        "video": true,
        "saml": false
    },
    "event_name": "name",
    "event_location": "location",
    "event_date": "01.01.2022 bis 01.03.2022, vllt länger",
    "expected_users": 750,
    "contact_person": {
        "organisation": "organisation",
        "name": "name",
        "email": "joshua@intevation.de",
        "phone": "+490"
    },
    "billing_address": "address",
    "comment": "comment"
}' http://localhost:5000/order