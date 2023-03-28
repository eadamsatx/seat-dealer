from typing import Optional

from sqlalchemy import Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from models.enums import InvitationResponse
from models.word_generator import generate_word

import datetime


# declarative base class
class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(200), primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    auth_token: Mapped[str] = mapped_column(String(20))

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}

class Contact(Base):
    __tablename__ = "contacts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    email: Mapped[Optional[str]] = mapped_column(String(200))
    phone_number: Mapped[Optional[str]] = mapped_column(String(50))

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}

class Event(Base):
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    owner_email: Mapped[str] = mapped_column(String(200), ForeignKey("users.email"))
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text)

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}

class Invitation(Base):
    __tablename__ = "invitations"
    id: Mapped[str] = mapped_column(String(10),  default=generate_word, primary_key=True)
    event_id: Mapped[int] = mapped_column(Integer, ForeignKey("events.id"))
    contact_id: Mapped[int] = mapped_column(Integer, ForeignKey("contacts.id"))
    sms_sent: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime)
    email_sent: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime)
    response: Mapped[Optional[InvitationResponse]] = mapped_column(String(20))

    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}
