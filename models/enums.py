import enum


class InvitationResponse(enum.Enum):
    PENDING: "Pending"
    YES: "Yes"
    PROBABLY: "Probably"
    MAYBE: "Maybe"
    NO: "No"
