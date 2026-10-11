import asyncio
from uuid import UUID

from fastapi import APIRouter, Request
from fastapi.sse import EventSourceResponse
from sqlmodel import col, select

from server.db import SessionDep
from server.model.message import ChatMessage
from server.schema.message import ChatMessagePayload, ChatMessageResponse

router = APIRouter()


session_subscribers: dict[UUID, set[asyncio.Queue[ChatMessageResponse]]] = {}


@router.get("/messages")
def get_chat_messages(
    session: SessionDep, session_id: UUID
) -> list[ChatMessageResponse]:
    statement = (
        select(ChatMessage)
        .where(ChatMessage.session_id == session_id)
        .order_by(col(ChatMessage.created_at))
    )
    data = session.exec(statement).all()
    response = [ChatMessageResponse.model_validate(item) for item in data]
    return response


@router.get("/messages/stream")
async def stream_chat_messages(
    request: Request, session_id: UUID
) -> EventSourceResponse:
    event_queue: asyncio.Queue[ChatMessageResponse] = asyncio.Queue()
    session_subscribers.setdefault(session_id, set()).add(event_queue)

    async def event_generator():
        try:
            while True:
                if await request.is_disconnected():
                    break
                try:
                    message = await asyncio.wait_for(event_queue.get(), timeout=1.0)
                    yield f"data: {message.json()}\n\n"
                except asyncio.TimeoutError:
                    continue
        finally:
            subscribers = session_subscribers.get(session_id)
            if subscribers is not None:
                subscribers.discard(event_queue)
                if not subscribers:
                    session_subscribers.pop(session_id, None)

    return EventSourceResponse(event_generator())


@router.post("/messages")
async def create_chat_message(
    session: SessionDep, payload: ChatMessagePayload
) -> ChatMessageResponse:
    chat_message = ChatMessage.model_validate(payload)
    session.add(chat_message)
    session.commit()
    session.refresh(chat_message)
    serialized_message = ChatMessageResponse.model_validate(chat_message)
    subscribers = tuple(session_subscribers.get(serialized_message.session_id, set()))
    for subscriber in subscribers:
        await subscriber.put(serialized_message)
    return serialized_message
