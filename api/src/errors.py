from jsonschema.exceptions import ValidationError

from .app import app


class ViewError(Exception):
    def __init__(self, message, status_code=400):
        super().__init__(self)
        self.message = message
        self.status_code = status_code


@app.errorhandler(ViewError)
def handle_view_error(error):
    return {"error": error.message}, error.status_code


@app.errorhandler(ValidationError)
def handle_validation_error(error):
    return {"error": error.message}, 400
