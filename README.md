# seat-dealer
Automate the sending of invites and management of RSVPs for seat-limited social events like dinner parties.

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
- Evaluate FastAPI as a Python framework.


## Front End Development
Watcher to render typescript
```bash
source .env
cd frontend/seat-dealer
yarn start
```

Watcher to render CSS
```bash
cd frontend/seat-dealer
npx tailwindcss -i ./src/index.css -o ./src/styles/index.css --watch
```

Yeah, we will probably end up rendering that to a dist directory at some point.

## Unresolved questions
- revisit later: https://www.jetbrains.com/help/webstorm/tailwind-css.html
- Fix alignment of profile name in app bar