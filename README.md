# Openslides

This is the repository of the official [OpenSlides website](https://www.openslides.com/).

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4201/`. The app will automatically reload if you change any of the source files.

To start the server which is responsible for handling the orders and newsletter registrations, change to the directory `api` and run `flask run`. For a development server with auto-reload, run `export FLASK_ENV=development` beforehand.

## Uploading translations

For easier translation handling, you have to have the transifex client installed (either from the `requirements-development.txt` or manually). Make sure you exported your API token as described in https://docs.transifex.com/client/init#before-running-tx-init.

After you made some changes to the website, run `./scripts/extract-translations.sh` to update the `template-de.pot` file. Then, upload the file with `tx push --source`. You can now edit the translations as usual on transifex.

When you are finished, just run `tx pull --all` and then `./scripts/compile-translations.sh` to generate the JSON/MO files.
