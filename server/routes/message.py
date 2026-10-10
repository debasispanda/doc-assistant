from uuid import UUID

from fastapi import APIRouter
from sqlmodel import col, select

from server.db import SessionDep
from server.model.message import ChatMessage
from server.schema.message import ChatMessagePayload, ChatMessageResponse

router = APIRouter()


@router.get("/messages")
def get_chat_messages(
    session: SessionDep, session_id: UUID
) -> list[ChatMessageResponse]:
    statement = (
        select(ChatMessage)
        .where(ChatMessage.session_id == session_id)
        .order_by(col(ChatMessage.created_at).desc())
    )
    data = session.exec(statement).all()
    response = [ChatMessageResponse.model_validate(item) for item in data]
    return response


@router.post("/messages")
def create_chat_message(
    session: SessionDep, payload: ChatMessagePayload
) -> ChatMessageResponse:
    chat_message = ChatMessage.model_validate(payload)
    session.add(chat_message)
    session.commit()
    session.refresh(chat_message)
    return ChatMessageResponse.model_validate(chat_message)
