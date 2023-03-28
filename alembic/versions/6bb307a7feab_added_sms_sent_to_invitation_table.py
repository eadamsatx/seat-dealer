"""Added sms_sent to invitation table

Revision ID: 6bb307a7feab
Revises: a3c6af7cfc26
Create Date: 2023-03-27 13:30:43.036185

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6bb307a7feab'
down_revision = 'a3c6af7cfc26'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('invitations', sa.Column('sms_sent', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('invitations', 'sms_sent')
    # ### end Alembic commands ###