"""Added invitation table

Revision ID: b06aebd7c249
Revises: 236b407e0c0e
Create Date: 2023-03-27 13:29:08.798725

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b06aebd7c249'
down_revision = '236b407e0c0e'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('invitations',
    sa.Column('id', sa.String(length=10), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('invitations')
    # ### end Alembic commands ###