import json

import requests
from flask import request, jsonify
from google.auth.transport import requests as grequests
from google.oauth2 import id_token
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import config
from models.base import User
from models.word_generator import generate_word
from flask import Blueprint
engine = create_engine(config.DB_CONN_STRING, echo=True)

DBSessionMaker = sessionmaker(bind=engine)
db_session = DBSessionMaker()

API_ROUTE_PREFIX = '/api/v1'


login_blueprint = Blueprint('login', __name__, url_prefix='/api/v1')


@login_blueprint.route('/api/v1/login', methods=["POST"])
def login():
    code = request.json['code']

    params = {
        'code': code,
        'client_id': config.OAUTH2_CLIENT_ID,
        'client_secret': config.OAUTH2_CLIENT_SECRET,
        'redirect_uri': config.OAUTH2_REDIRECT_URI,
        'grant_type': 'authorization_code'
    }

    response = requests.post('https://oauth2.googleapis.com/token', data=params)
    if not response.ok:
        return "{}", 400

    token = response.json()['id_token']

    id_info = id_token.verify_oauth2_token(
        token, grequests.Request(), config.OAUTH2_CLIENT_ID)

    user = db_session.query(User).get(id_info['email'])
    if user is None:
        user = User(email=id_info['email'], name=id_info['name'])

    user.auth_token = generate_word(20)
    db_session.add(user)
    db_session.commit()
    return json.dumps({
        'email': user.email,
        'name': user.name,
        'authToken': user.auth_token
    }), 200
