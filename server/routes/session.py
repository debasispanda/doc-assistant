from fastapi import APIRouter

from server.data.chat import fake_chat_session, fake_chat_session_with_messages

router = APIRouter()


@router.get("/sessions")
def get_chat_sessions():
    return fake_chat_session


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
