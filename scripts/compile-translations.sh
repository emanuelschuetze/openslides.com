#!/bin/bash

# change to root dir
cd "${0%/*}/.."

npx po2json -f mf i18n/en/LC_MESSAGES/messages.po /dev/stdout | sed -r 's:(<[^>/ ]+)[^>]*?(/?>):\1\2:g' > src/assets/i18n/en.json
pybabel compile -d i18n -f
