"""Add full_name to users

Revision ID: 659339a8777e
Revises: d56166bc3ba6
Create Date: 2024-09-23 09:24:05.229913

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '659339a8777e'
down_revision: Union[str, None] = 'd56166bc3ba6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
