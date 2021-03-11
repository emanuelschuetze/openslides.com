#!/bin/bash

if [ -n "$1" ]; then
    lang="en"
else
    lang="de"
fi
curl --header "Content-Type: application/json" -e "https://www.openslides.com/$lang/order" -d '{
    "mode": "order",
    "package": "conference",
    "running_time": "unlimited",
    "domain": "xyz",
    "hosting_start": "2022-01-01",
    "extra_functions": {
        "audio": false,
        "video": true,
        "external_video": false,
        "saml": false,
        "service": true,
        "chat": true,
        "jitsi_phone": true
    },
    "services": {
        "schooling": false,
        "local_service": true,
        "phone": true
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
    "billing_address": {
        "name": "name",
        "extra": "extra",
        "street": "street 1",
        "zip": "12345",
        "city": "city",
        "country": "germany"
    },
    "tax_id": "TAXID",
    "comment": "comment"
}' http://localhost:5000/order