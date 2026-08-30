from typing import Optional
from pydantic import BaseModel, field_validator


class CreateReviewRequest(BaseModel):
    rating: int
    title: Optional[str] = None
    comment: str

    @field_validator('rating')
    def validate_rating(cls, v):
        if v < 1 or v > 5:
            raise ValueError('la calificación debe estar entre 1 y 5')
        return v

    @field_validator('comment')
    def validate_comment(cls, v):
        if len(v.strip()) < 3:
            raise ValueError('el comentario debe tener al menos 3 caracteres')
        return v.strip()
