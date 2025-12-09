import os
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

conf = ConnectionConfig(
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME"),
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD"),
    MAIL_FROM = os.environ.get("MAIL_FROM"),
    MAIL_PORT = os.environ.get("MAIL_PORT"),
    MAIL_SERVER = os.environ.get("MAIL_SERVER"),

    
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False, 
)