from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import config
from flask import Blueprint, jsonify

from models.base import Event, User
from flask import request

engine = create_engine(config.DB_CONN_STRING, echo=True)

DBSessionMaker = sessionmaker(bind=engine)
db_session = DBSessionMaker()

API_ROUTE_PREFIX = '/api/v1'

events_blueprint = Blueprint('events', __name__, url_prefix='/api/v1')


@events_blueprint.route(f'/events', methods=['GET', 'POST'])
def post_events():
    auth_token = request.headers.get('Authorization').split()[1]
    user = db_session.query(User).filter_by(auth_token=auth_token).one_or_none()
    if not user:
        return jsonify({'message': 'Invalid api key'}), 401
    if request.method == 'POST':
        event = Event(
            owner_email=request.json['ownerEmail'],
            title=request.json['title'],
            description=request.json['description']
        )
        db_session.add(event)
        db_session.commit()
        return jsonify(event.as_dict()), 200

    if request.method == 'GET':
        events = db_session.query(Event).filter_by(owner_email=user.email).all()
        return jsonify([i.as_dict() for i in events]), 200


@events_blueprint.route(f'/events/<int:id_>', methods=['GET'])
def get_invite_by_id(id_: int):
    event = db_session.query(Event).get(id_)
    return jsonify(event.as_dict()), 200
