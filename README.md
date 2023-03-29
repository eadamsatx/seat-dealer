# seat-dealer
Automate the sending of invites and management of RSVPs for seat-limited social events like dinner parties.

## Project Status
Having started with the idea of building ci/cd skills, the deployment baseline is largely in place:
- `terraform` is configured to store state with gcp as a back end. It sets up cloudsql and a user.
- `github actions` is configured to lint and test python and to deploy to GCP Cloud Functions.

The `test/test_api_story_happy_path.py` describes much of the existing functionality, which is incomplete. Currently:
- DB models are established for User, Contact, Event, and Invitation
- Endpoints are established for invites (which successfully send SMS messages) events, and login

On the UI,
- Login works with Google OAuth2. It posts the auth code to the `/login` endpoint on the seat-dealer server which exchanges it for an id token and sets up a session
- A session api key is stored in localStorage
- Users can add and list contacts.
- Users can add and list events.
- The next step (show an event page with a list of contacts that can be invited) is not yet implemented. The back end is implemented and tested.

## How to host an event
Login to the web UI, add contacts, schedule the event, and ask the seat-dealer to start dealing. Invitations will be sent out a few at a time until seats are filled with "YES" and "PROBABLY" responses. Those responding "MAYBE" will be notified that they are not guaranteed a seat. The web UI will update showing invitations sent, the method of delivery and responses received.

Contacts will require a name, a default priority, and a phone number or email address.

Events require a user-facing event description and a seat count. Optionally, they may contain specific contacts that should be invited first.

## How to attend an event
A contact will receive an event invite via SMS or email containing a link to RSVP. That link will be unique to the invitation, so the user need not authenticate- simply read the event description and issue a response to the RSVP in the form of "YES", "PROBABLY", "MAYBE", or "NO".

## Personal Growth Goals
Alas - this project is designed to scratch a personal itch in both features and code.

- Work on deploying the project using different deploy technologies.
- Gain exposure to the setup and configuration of secret management technologies.
- Evaluate Cloud Functions and/or FastAPI as a Python framework.
- Gain exposure to the latest front-end technologies like yarn (pnpm?), typescript, and tailwind


## Setting up dev environment
### Dependent services
This app relies on:
- Google for OAuth2 authentication
- mysql (hosted in GCP)
- twilio

### Required environment variables
OAUTH2_CLIENT_ID
OAUTH2_CLIENT_SECRET
DB_CONN_STRING
API_BASE_URI
FRONTEND_BASE_URI
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER
TWILIO_TO_NUMBER_OVERRIDE (optional)

### Front End
Watcher to render typescript
```bash
source .env
cd frontend/seat-dealer
yarn start
```

Watcher to render CSS (not currently needed)
```bash
cd frontend/seat-dealer
npx tailwindcss -i ./src/index.css -o ./src/styles/index.css --watch
```

Yeah, we will probably end up rendering that to a dist directory at some point.

## Unresolved Stuff
- revisit later: https://www.jetbrains.com/help/webstorm/tailwind-css.html
- Fix alignment of profile name in app bar
- OpenAPI Spec
- alembic.ini is not committed because it contains creds
- Create db connection string on deploy
- Using a real db to test for now
- Not yet marshalling
- as_dict on models should be moved to a base class or otherwise extracted
- sqlalchemy can definitely join instead of getting by id...

## Endpoints
contacts (add, delete)
event (add, update, delete)
invitation (add, update)

## Weird Findings
OSX Monterey and later have VERY STRANGE BEHAVIOR on port 5000- the default flask dev server port. Chromium browsers will connect to that port and find an AirTunes server. Copy/pasting the request as CURL into iTerm2 will cause it to connect a python dev server running on that port, NOT the AirPlay server the browser sees. That's why we are configured off of 5000 for flask dev server.
