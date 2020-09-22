from shutil import copyfile

from flask import Flask


app = Flask(__name__)
try:
    app.config.from_pyfile("../config.py")
except FileNotFoundError:
    app.logger.warning("Didn't find a config.py. Copied the template to config.py")
    copyfile("api/config.py.tpl", "api/config.py")
    app.config.from_pyfile("../config.py")


@app.template_filter()
def currency(value):
    return "{:,.2f} €".format(value)
