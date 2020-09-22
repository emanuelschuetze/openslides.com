#!/bin/bash

# change to root dir
cd "${0%/*}/.."

# extract translations
npx ngx-translate-extract -i ./src -o ./i18n/templates/client.pot --clean --format pot -m _
pybabel extract -F api/babel.cfg -o ./i18n/templates/server.pot ./api

# merge translations
echo "merging POT files..."
cd i18n/templates
xgettext client.pot server.pot -o template-de.pot
