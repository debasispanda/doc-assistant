from fastapi import APIRouter

from server.routes.session import router as session_router

router = APIRouter()
router.include_router(session_router)
