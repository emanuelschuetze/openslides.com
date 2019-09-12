# Deployment

# Installation of uwsgi
For uwsgi `python3-dev` is required.

## copying of staticfiles:
on server:
- rm /srv/www/html/*
- cp -r /srv/www/.htaccess.bak /srv/www/html/.htaccess
- scp dist/openslides/* web-openslides:/srv/www/html/

## Setup
- Install the service (see openslides-backend.service.tpl) in systemd.
- create a uwsgi.sock
- Change ownership of api folder to www-data:www-data
- touch /var/log/openslides-backend.log and change ownership
- Add configuration to nginx/apache
- start service and reload the webserver

## Updating:
- Stop the service and update the repository
- Verify ownerships etc. (is this necessary?)
- start the service

## Starting
- dev: python app.py (export FLASK_ENV=development)
- uwsgi --socket 0.0.0.0:5000 --protocol=http -w app:app
