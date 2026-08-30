from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.database.Connection import Base

class Address(Base):
    __tablename__ = "addresses"
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    label: Mapped[str] = mapped_column(
        String(50),
        nullable=True
    )

    address: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    city: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    department: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    postal_code: Mapped[str] = mapped_column(
        String(20),
        nullable=True
    )

    is_default: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    user: Mapped["Users"] = relationship(
        "Users",
        back_populates="addresses"
    )