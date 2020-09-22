import re

from flask import request
from flask_babel import Babel, refresh

from .app import app


babel = Babel(app)

BABEL_FORCE_DEFAULT_LANGUAGE = False


@babel.localeselector
def get_locale():
    global BABEL_FORCE_DEFAULT_LANGUAGE
    # for admin view: always use default language
    if BABEL_FORCE_DEFAULT_LANGUAGE or not request.referrer:
        return
    # try and get language from referrer url since that's what the user selected
    m = re.search("https?://[^/]+/([a-z]{2})", request.referrer)
    return m.group(1) if m else None


class UseDefaultLanguageContext:
    def __enter__(self):
        global BABEL_FORCE_DEFAULT_LANGUAGE
        BABEL_FORCE_DEFAULT_LANGUAGE = True
        refresh()

    def __exit__(self, *args):
        global BABEL_FORCE_DEFAULT_LANGUAGE
        BABEL_FORCE_DEFAULT_LANGUAGE = False
        refresh()
