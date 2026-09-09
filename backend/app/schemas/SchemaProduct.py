from typing import Optional
from pydantic import BaseModel, field_validator

class CreateProductRequest(BaseModel):
    name: str
    price: float
    images: list[str] = []
    discount_enable: bool = False
    discount_value: float = 0
    stock: int = 0
    descripcion: str
    technical_spec: dict = {}
    catalog_id: Optional[str] = None
    catalog_name: Optional[str] = None

    @field_validator('price')
    def validate_price(cls, v):
        if v <= 0:
            raise ValueError('el precio debe ser mayor a 0')
        return v

    @field_validator('stock')
    def validate_stock(cls, v):
        if v <= 0:
            raise ValueError('el stock debe ser un número entero mayor a 0')
        return v

    @field_validator('name')
    def validate_name(cls, v):
        if not v or not str(v).strip():
            raise ValueError('el nombre del producto es obligatorio')
        return v.strip()

    @field_validator('descripcion')
    def validate_descripcion(cls, v):
        if not v or not str(v).strip():
            raise ValueError('la descripción es obligatoria')
        return str(v).strip()

    @field_validator('technical_spec')
    def validate_technical_spec(cls, v):
        if v is None:
            return v
        required = ['brand', 'model', 'warranty', 'weight', 'dimensions']
        for k in required:
            val = v.get(k)
            if val is not None and (not isinstance(val, str) or not val.strip()):
                raise ValueError(f'{k} no puede estar vacío en las especificaciones técnicas')
        return v

    @field_validator('catalog_name')
    def validate_catalog_name(cls, v):
        if v is not None and not str(v).strip():
            raise ValueError('la categoría no puede estar vacía')
        return v

    @field_validator('discount_value')
    def validate_discount_value(cls, v):
        if v < 0 or v > 100:
            raise ValueError('el descuento debe estar entre 0 y 100')
        return v

class UpdateProductRequest(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    images: Optional[list[str]] = None
    discount_enable: Optional[bool] = None
    discount_value: Optional[float] = None
    stock: Optional[int] = None
    descripcion: Optional[str] = None
    technical_spec: Optional[dict] = None
    catalog_id: Optional[str] = None
    catalog_name: Optional[str] = None

    @field_validator('price')
    def validate_price(cls, v):
        if v is not None and v <= 0:
            raise ValueError('el precio debe ser mayor a 0')
        return v

    @field_validator('stock')
    def validate_stock(cls, v):
        if v is not None and v <= 0:
            raise ValueError('el stock debe ser un número entero mayor a 0')
        return v

    @field_validator('name')
    def validate_name(cls, v):
        if v is not None and not str(v).strip():
            raise ValueError('el nombre del producto no puede estar vacío')
        return v

    @field_validator('descripcion')
    def validate_descripcion(cls, v):
        if v is not None and not str(v).strip():
            raise ValueError('la descripción no puede estar vacía')
        return v

    @field_validator('technical_spec')
    def validate_technical_spec(cls, v):
        if v is None:
            return v
        required = ['brand', 'model', 'warranty', 'weight', 'dimensions']
        for k in required:
            val = v.get(k)
            if val is not None and (not isinstance(val, str) or not val.strip()):
                raise ValueError(f'{k} no puede estar vacío en las especificaciones técnicas')
        return v

    @field_validator('catalog_name')
    def validate_catalog_name(cls, v):
        if v is not None and not str(v).strip():
            raise ValueError('la categoría no puede estar vacía')
        return v