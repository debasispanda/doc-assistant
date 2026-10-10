from fastapi import FastAPI

from server.routes import router as all_routes

app = FastAPI()

app.include_router(all_routes, prefix="/api/v1")
