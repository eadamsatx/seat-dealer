import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import config
from models.base import User, Contact, Event, Invitation
from models.word_generator import generate_word
from main import create_app

engine = create_engine(config.DB_CONN_STRING, echo=True)

DBSessionMaker = sessionmaker(bind=engine)
db_session = DBSessionMaker()

LUGGAGE_CODE = '12345'


@pytest.fixture()
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })

    # other setup can go here

    yield app

    # clean up / reset resources here


@pytest.fixture()
def client(app):
    return app.test_client()


def test_api_story_happy_path(client):
    user = User(email=f'{generate_word(8)}@example.com', name='John Jack Jonathan', auth_token=LUGGAGE_CODE)
    db_session.add(user)
    # Create two contacts
    contact1 = Contact(name='Test User 1', email=f'{generate_word(8)}@example.com', phone_number='+14155551234')
    contact2 = Contact(name='Test User 2', phone_number='+14155551235')
    db_session.add(contact1)
    db_session.add(contact2)
    db_session.commit()
    # Create one event
    event1 = client.post('/api/v1/events', json={
        'ownerEmail': user.email,
        'title': 'April 1, 2023 @ 7pm',
        'description': 'Dinner Party. Three courses of jello with wine pairings.'
    }).json
    # Add contacts to event
    invite1_response = client.post('/api/v1/invites', json={
        "eventId": event1['id'],
        "contactId": contact1.id
    })
    invite2_response = client.post('/api/v1/invites', json={
        "eventId": event1['id'],
        "contactId": contact2.id
    })
    invite_response = client.get('/api/v1/invites')

    # Send invites
    # Check that contact phone numbers were sent invite texts
    # Check that URL in invite text loads
    # Clean up test data
    pass
