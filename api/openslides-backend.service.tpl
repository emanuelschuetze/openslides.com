[Unit]
Description=uWSGI instance to serve openslides-backend
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/path/to/api/folder
Environment="PATH=/path/to/api/folder/.venv/bin"
ExecStart=/path/to/api/folder/.venv/bin/uwsgi --ini uwsgi.ini

[Install]
WantedBy=multi-user.target
