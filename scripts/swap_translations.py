import glob
import re

# babel needed - pip install babel
from babel.messages.pofile import read_po, write_po
from babel.messages.catalog import Catalog


with open("../src/assets/i18n/de.po") as f:
    catalog = read_po(f)

messages = sorted([message for message in catalog if message.id and message.string], key=lambda m: len(m.id), reverse=True)

missing = list(range(len(messages)))

for filepath in glob.iglob('../src/**/*.html', recursive=True):
    print(filepath)
    with open(filepath) as file:
        s = file.read()

    for i, message in enumerate(messages):
        s = re.sub(rf">([\s\n]*){re.escape(message.id)}([\s\n]*)<", rf">\1###{i}###\2<", s, flags=re.MULTILINE)
        s = s.replace(f'"{message.id}"', f'"###{i}###"')
        s = s.replace(f"'{message.id}'", f"'###{i}###'")

    for i in missing.copy():
        if f"###{i}###" in s:
            missing.remove(i)

    for i, message in enumerate(messages):
        s = s.replace(f"###{i}###", message.string)

    with open(filepath, "w") as file:
        file.write(s)

for filepath in glob.iglob('../src/**/*.ts', recursive=True):
    print(filepath)
    with open(filepath) as file:
        s = file.read()

    for i, message in enumerate(messages):
        s = re.sub(rf"_\(([\s\n]*)'{re.escape(message.id)}'", rf"_(\1'###{i}###'", s, flags=re.MULTILINE)

    for i in missing.copy():
        if f"###{i}###" in s:
            missing.remove(i)

    for i, message in enumerate(messages):
        s = s.replace(f"###{i}###", message.string)

    with open(filepath, "w") as file:
        file.write(s)

print("\n\nNot found:")
for i in missing:
    print(f"Key: {messages[i].id}")
    print(f"Value: {messages[i].string}")

switched = Catalog()
for message in catalog:
    if message.id and message.string:
        switched.add(message.string, message.id)

with open("../src/assets/i18n/en.po", "bw") as f:
    write_po(f, switched)
