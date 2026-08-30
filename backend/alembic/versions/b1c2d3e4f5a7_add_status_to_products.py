"""add status column to products

Revision ID: b1c2d3e4f5a7
Revises: a1b2c3d4e5f6
Create Date: 2026-08-27 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b1c2d3e4f5a7'
down_revision: Union[str, Sequence[str], None] = 'a1b2c3d4e5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('products', sa.Column('status', sa.String(length=20), server_default='active', nullable=False))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('products', 'status')
