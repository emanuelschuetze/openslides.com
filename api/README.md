# Deployment

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
