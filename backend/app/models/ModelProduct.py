from sqlalchemy import String, Numeric, Boolean, Text, JSON, ForeignKey, Integer
from decimal import Decimal
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.database.Connection import Base

class Product(Base):
    __tablename__ = "products"
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True, 
        default=uuid.uuid4
    )

    name: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        unique=True
    )

    price: Mapped[Decimal] = mapped_column(
        Numeric(10,2),
        default=0,
        nullable=False
    )

    images:  Mapped[list[str]] = mapped_column(
        JSON,
        nullable=True
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="active",
        nullable=False,
        server_default="active"
    )


    discount_enable: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    discount_value: Mapped[int] = mapped_column(
        Numeric(10,2),
        default=0,
        nullable=False
    )

    stock: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    descripcion: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    technical_spec: Mapped[dict] = mapped_column(
        JSON,
        nullable=True
    )


    company_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("company.id"),
        nullable=False
    )

    catalog_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("catalog.id"),
        nullable=True
    )

    #Relacion con empresa
    company: Mapped["Company"] = relationship(
        "Company",
        back_populates="products"
    )

    #Relacion con la tabla products
    catalog: Mapped["Catalog"] = relationship(
        "Catalog",
        back_populates="products"
    )

    reviews: Mapped[list["Review"]] = relationship(
        "Review",
        back_populates="product",
        cascade="all, delete-orphan"
    )

    favorites: Mapped[list["Favorite"]] = relationship(
        "Favorite",
        back_populates="product",
        cascade="all, delete-orphan"
    )

class Catalog(Base):
    __tablename__ = "catalog"
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True, 
        default=uuid.uuid4
    )

    name: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        unique=True
    )

    products: Mapped[list["Product"]] = relationship(
        "Product",
        back_populates="catalog"
    )
