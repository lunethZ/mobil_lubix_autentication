# Este esquema define los modelos de datos para la autenticación de usuarios,
# incluyendo la creación de usuarios, verificación de correo electrónico, 
# inicio de sesión,
from pydantic import BaseModel, EmailStr, field_validator
import re

class createUser(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    tell: str
    isActive: bool = True
    verified: bool = False

    @field_validator('email')
    def validate_email(cls, v: str):
        if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', v):
            raise ValueError('correo electrónico no válido')
        return v
    
    @field_validator('fullName')
    def validate_fullName(cls, v: str):
        if len(v) < 3:
            raise ValueError('el nombre completo debe tener al menos 3 caracteres')
        if len(v) > 60:
            raise ValueError('el nombre completo no debe exceder los 60 caracteres')
        return v

    @field_validator('password')
    def validate_password(cls, v: str):
        if len(v) < 8:
            raise ValueError('la contraseña debe tener al menos 8 caracteres')
        if not re.search(r'[A-Z]', v):
            raise ValueError('la contraseña debe contener al menos una letra mayúscula')
        if not re.search(r'[a-z]', v):
            raise ValueError('la contraseña debe contener al menos una letra minúscula')
        if not re.search(r'[0-9]', v):
            raise ValueError('la contraseña debe contener al menos un número')
        return v
    
    @field_validator('tell')
    def validate_tell(cls, v: str):
        if len(v) < 10:
            raise ValueError('el número de teléfono debe tener al menos 10 caracteres')
        return v

class verifyEmail(BaseModel):
    email: EmailStr
    code: str

    @field_validator('code')
    def validate_code(cls, v: str):
        if len(v) != 6:
            raise ValueError('el código debe tener exactamente 6 caracteres')
        if not v.isdigit():
            raise ValueError('el código debe contener solo números')
        return v

class userLogin(BaseModel):
    email: EmailStr
    password: str
    

class forgotPassword(BaseModel):
    email: EmailStr

class ResetPassword(BaseModel):
    email: EmailStr
    code: str
    new_password: str

    @field_validator('code')
    def validate_code(cls, v: str):
        if len(v) != 6:
            raise ValueError('el código debe tener exactamente 6 caracteres')
        if not v.isdigit():
            raise ValueError('el código debe contener solo números')
        return v

    @field_validator('new_password')
    def validate_new_password(cls, v: str):
        if len(v) < 8:
            raise ValueError('la contraseña debe tener al menos 8 caracteres')
        if not re.search(r'[A-Z]', v):
            raise ValueError('la contraseña debe contener al menos una letra mayúscula')
        if not re.search(r'[a-z]', v):
            raise ValueError('la contraseña debe contener al menos una letra minúscula')
        if not re.search(r'[0-9]', v):
            raise ValueError('la contraseña debe contener al menos un número')
        return v

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    role: str
    id: str = None
    Nombre: str = None
    email: str = None

class RefreshRequest(BaseModel):
    old_refresh_token: str

class ResendVerification(BaseModel):
    email: EmailStr

class LogoutRequest(BaseModel):
    refresh_token: str = None
