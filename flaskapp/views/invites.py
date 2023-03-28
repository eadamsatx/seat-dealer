from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import config
from flask import Blueprint, jsonify

from models.base import Invitation, Event, Contact
from flask import request

from twilio.rest import Client

engine = create_engine(config.DB_CONN_STRING, echo=True)

DBSessionMaker = sessionmaker(bind=engine)
db_session = DBSessionMaker()

API_ROUTE_PREFIX = '/api/v1'

invites_blueprint = Blueprint('invites', __name__, url_prefix='/api/v1')


@invites_blueprint.route(f'/invites', methods=['GET', 'POST'])
def post_invites():
    if request.method == 'POST':
        invitation = Invitation(event_id=request.json['eventId'], contact_id=request.json['contactId'])
        db_session.add(invitation)
        db_session.commit()
        contact = db_session.query(Contact).get(invitation.contact_id)
        event = db_session.query(Event).get(invitation.event_id)
        sms_message = f'You are invited to {event.title}. Please rsvp at {config.FRONTEND_BASE_URI}/invites/{invitation.id}'
        twilio_client = Client(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)
        to_phone = config.TWILIO_TO_NUMBER_OVERRIDE or contact.phone_number
        twilio_response = twilio_client.messages.create(
            to=to_phone,
            body=sms_message,
            from_=config.TWILIO_PHONE_NUMBER
        )
        return jsonify(invitation.as_dict()), 200

    if request.method == 'GET':
        invitations = db_session.query(Invitation).all()
        return jsonify([i.as_dict() for i in invitations]), 200


@invites_blueprint.route(f'/invites/<int:id_>', methods=['GET'])
def get_invite_by_id(id_: int):
    invitation = db_session.query(Invitation).get(id_)
    return jsonify(invitation.as_dict()), 200
