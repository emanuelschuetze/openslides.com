import smtplib

from flask_babel import gettext as _
from flask_mail import Mail

from .app import app
from .errors import ViewError


mail = Mail(app)


def try_send_mail(msg):
    try:
        mail.send(msg)
    except smtplib.SMTPServerDisconnected:
        raise ViewError(_("Der Server ist nicht korrekt konfiguriert"))
    except smtplib.SMTPRecipientsRefused as e:
        messages = [
            "{}: {} {}".format(r, errno, msg.decode())
            for r, (errno, msg) in e.recipients.items()
        ]
        raise ViewError(
            _("Konnte E-Mail nicht versenden an:") + " " + ", ".join(messages)
        )
