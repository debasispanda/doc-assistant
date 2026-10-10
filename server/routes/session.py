from uuid import UUID

from fastapi import APIRouter, HTTPException
from sqlmodel import col, select

from server.db import SessionDep
from server.model.session import ChatSession
from server.schema.session import ChatSessionPayload, ChatSessionResponse

router = APIRouter()


@router.get("/sessions")
def get_chat_sessions(session: SessionDep) -> list[ChatSessionResponse]:
    statement = select(ChatSession).order_by(col(ChatSession.created_at).desc())
    data = session.exec(statement).all()
    response = [ChatSessionResponse.model_validate(item) for item in data]
    return response


@router.post("/sessions")
def create_chat_session(
    session: SessionDep, payload: ChatSessionPayload
) -> ChatSessionResponse:
    chat_session = ChatSession.model_validate(payload)
    session.add(chat_session)
    session.commit()
    session.refresh(chat_session)
    return ChatSessionResponse.model_validate(chat_session)


@router.get("/sessions/{session_id}")
def get_chat_session(session_id: UUID, session: SessionDep) -> ChatSessionResponse:
    chat_session = session.get(ChatSession, session_id)

    if not chat_session:
        raise HTTPException(status_code=404, detail="Chat session not found")

    return ChatSessionResponse.model_validate(chat_session)
