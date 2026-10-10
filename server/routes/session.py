import datetime
import uuid
from fastapi import APIRouter

from server.data.chat import fake_chat_session, fake_chat_session_with_messages
from server.schema.session import ChatSession

router = APIRouter()


@router.get("/sessions")
def get_chat_sessions():
    return fake_chat_session


@router.post("/sessions")
def create_chat_session():
    return ChatSession(
        id=str(uuid.uuid4()),
        title="New Session",
        messages=[],
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )


@router.get("/sessions/{session_id}")
def get_chat_session(session_id: str):
    return next(
        (
            session
            for session in fake_chat_session_with_messages
            if str(session.id) == session_id
        ),
        None,
    )
