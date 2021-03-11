#!/bin/bash

curl --header "Content-Type: application/json" -e https://www.openslides.com/de/order -d '{
    "mode": "offer",
    "package": "conference",
    "running_time": "unlimited",
    "domain": "xyz",
    "extra_functions": {
        "audio": false,
        "video": true,
        "external_video": false,
        "saml": false,
        "service": true,
        "chat": true,
        "jitsi_phone": false
    },
    "event_name": "name",
    "event_location": "location",
    "event_from": "2022-01-01",
    "event_to": "2022-01-08",
    "expected_users": 750,
    "contact_person": {
        "organisation": "organisation",
        "name": "name",
        "email": "joshua@intevation.de",
        "phone": "+490"
    },
    "services": {
        "schooling": false,
        "local_service": true,
        "phone": true
    },
    "billing_address": {
        "name": "name",
        "city": "city",
        "country": "germany"
    },
    "comment": "comment"
}' http://localhost:5000/order