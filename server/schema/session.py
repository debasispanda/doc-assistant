import datetime

from pydantic import BaseModel

from server.schema.message import ChatMessage


class ChatSession(BaseModel):
    id: str
    title: str
    messages: list[ChatMessage] = []
    created_at: datetime.datetime
    updated_at: datetime.datetime
