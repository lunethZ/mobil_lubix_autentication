# este codigo es creado para dar acceso a las rutas 
# esto sin necesitad de token de autenticacion,
# pero de igual manera se busca validar el token a la hora
# de proteger las demas rutas dependiendo del rol validando 
# en la base de datos si aquel token existe y corresponde a el usuario
from fastapi import Request
from starlette.responses import JSONResponse
from app.services.authentication.JWTService import verify_token

PUBLIC_ROUTES = [
    "/auth/login-user",
    "/auth/login-company",
    "/auth/register-user",
    "/auth/register-company",
    "/auth/verify-email-user",
    "/auth/resend-verification",
    "/auth/forgot-password-user",
    "/auth/reset-password-user",
    "/auth/refresh",
    "/auth/logout",
    "/health",
    "/health/database",
    "/health/internet",
    "/docs",
    "/openapi.json"
]

ROLES_PERMISSIONS_ROUTERS = {

    "admin": [
        "",
        "/"
    ],

    "company": [
        "/company/dashboard/me",
        "/company/dashboard/my-profile",
        "/company/dashboard/upgrade-my-profile",
        "/company/products"
    ],

    "user": [
        "/user/dashboard"
    ]
    
}

async def auth_middleware(request: Request, call_next):

    if request.method == "OPTIONS":
        return await call_next(request)

    path = request.url.path

    if path in PUBLIC_ROUTES:
        return await call_next(request)
    
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return JSONResponse(status_code=401, content={"detail": "Token requerido"})
    
    try:
        scheme, token = auth_header.split()

        print("TOKEN RAW:", token)

        if scheme.lower() != "bearer":
            return JSONResponse(status_code=401, content={"detail": "Formato de autorizacion invalido"})
        
        payload =verify_token(token)

        if not isinstance(payload, dict):
            response = JSONResponse(status_code=401, content={"detail": "Token invalido"})
            response.headers["Access-Control-Allow-Origin"] = "*"
            return response

        print("DECODE RESULT:", payload)

        if payload is None:
            return JSONResponse(status_code=401, content={"detail": "Token invalido"})
        
        if payload.get("type") != "access":
            return JSONResponse(status_code=401, content={"detail": "Access token requerido"})
        
        user_id = payload.get("sub")
        role = payload.get("role")

        if not user_id:
            return JSONResponse(status_code=401, content={"detail": "Token invalido"})
        
        request.state.user_id = user_id
        request.state.role = role

        if role == "admin":
            return await call_next(request)
        
        
        allowed_routers = ROLES_PERMISSIONS_ROUTERS.get(role, [])

        has_permission = any(
            path.startswith(route)
            for route in allowed_routers
        )

        if not has_permission:
            return JSONResponse(status_code=401, content={"detail":"no tienes permiso para acceder a este recurso"})
        
        
        return await call_next(request)
    
    except Exception as e:
        
        print("Auth Error", e)

        return JSONResponse(status_code=401, content={"detail": "Token invalido"})

    

