from fastapi import APIRouter

from server.routes.message import router as message_router
from server.routes.session import router as session_router

router = APIRouter()
router.include_router(session_router)
router.include_router(message_router)
