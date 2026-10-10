from contextlib import asynccontextmanager

from fastapi import FastAPI

from server.db import create_db_and_tables
from server.routes import router as all_routes


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting lifespan.")
    create_db_and_tables()
    yield
    print("Ended lifespan.")


app = FastAPI(lifespan=lifespan)

app.include_router(all_routes, prefix="/api/v1")
