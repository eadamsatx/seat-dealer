# main.py
import json
import logging

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests

from google.oauth2 import id_token
from google.auth.transport import requests as grequests

import config

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models.base import User
from models.word_generator import generate_word

engine = create_engine(config.DB_CONN_STRING, echo=True)

DBSessionMaker = sessionmaker(bind=engine)
db_session = DBSessionMaker()

API_ROUTE_PREFIX = '/api/v1'


def create_app():
    app = Flask(__name__)
    CORS(app, origins=['http://localhost:3000', 'https://seatdealer.app'])

    # from yourapplication.model import db
    # db.init_app(app)
    from flaskapp.views.login import login_blueprint
    from flaskapp.views.events import events_blueprint
    from flaskapp.views.invites import invites_blueprint
    from flaskapp.views.contacts import contacts_blueprint
    app.register_blueprint(login_blueprint)
    app.register_blueprint(events_blueprint)
    app.register_blueprint(invites_blueprint)
    app.register_blueprint(contacts_blueprint)

    return app


def entrypoint(request):
    app = create_app()
    # Largely inspired by https://github.com/GoogleCloudPlatform/functions-framework-python/issues/98
    # Create a new app context for the app
    internal_ctx = app.test_request_context(
        path=request.full_path, method=request.method
    )
    # Copy the request headers to the app context
    internal_ctx.request = request
    # Activate the context
    internal_ctx.push()
    # Dispatch the request to the internal app and get the result
    return_value = app.full_dispatch_request()
    # Offload the context
    internal_ctx.pop()
    # Return the result of the internal app routing and processing
    return return_value
