from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import config
from flask import Blueprint, jsonify

from models.base import Contact, User
from flask import request

engine = create_engine(config.DB_CONN_STRING, echo=True)

DBSessionMaker = sessionmaker(bind=engine)
db_session = DBSessionMaker()

API_ROUTE_PREFIX = '/api/v1'

contacts_blueprint = Blueprint('contacts', __name__, url_prefix='/api/v1')


@contacts_blueprint.route(f'/contacts', methods=['GET', 'POST'])
def post_contacts():
    auth_token = request.headers.get('Authorization').split()[1]
    # asserted_owner = db_session.query(User).get(request.json['ownerEmail'])
    user = db_session.query(User).filter_by(auth_token=auth_token).one_or_none()
    if not User:
        return jsonify({'message': 'Invalid api key'}), 401
    if request.method == 'POST':
        contact = Contact(
            name=request.json['name'],
            email=request.json['email'],
            phone_number=request.json['phoneNumber'],
            owner_email=user.email
        )
        db_session.add(contact)
        db_session.commit()
        return jsonify(contact.as_dict()), 200

    if request.method == 'GET':
        contacts = db_session.query(Contact).filter_by(owner_email=user.email).all()
        return jsonify([i.as_dict() for i in contacts]), 200


@contacts_blueprint.route(f'/contacts/<int:id_>', methods=['GET'])
def get_invite_by_id(id_: int):
    contact = db_session.query(Contact).get(id_)
    return jsonify(contact.as_dict()), 200
