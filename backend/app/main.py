from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database.Connection import SessionLocal
from app.routers import AuthRouters, HealthRouter, CompanyRouter, UserRouter, admin
import app.models
from app.middleware.AuthMiddleware import auth_middleware
from app.middleware.CorsMiddleware import setup_cors
from app.utils.seed import run_seed
from app.Config import config


# =========================
# LIFESPAN
# =========================
@asynccontextmanager
async def lifespan(app):
    db = SessionLocal()

    if config.RUN_SEED:
        run_seed(db)

    db.close()
    yield

# =========================
# APP
# =========================
app = FastAPI(lifespan=lifespan)

# =========================
# MIDDLEWARE
# =========================
setup_cors(app)
app.middleware("http")(auth_middleware)

# =========================
# ROUTERS
# =========================
app.include_router(AuthRouters.router)
app.include_router(HealthRouter.router)
app.include_router(CompanyRouter.router)
app.include_router(UserRouter.router)
app.include_router(admin.router)