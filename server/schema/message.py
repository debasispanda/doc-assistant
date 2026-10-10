from datetime import datetime
from typing import Literal
from uuid import UUID

from server.schema import ApiModel


class ChatMessagePayload(ApiModel):
    content: str
    type: Literal["user", "assistant"] = "user"
    session_id: UUID


class ChatMessageResponse(ChatMessagePayload):
    id: UUID
    created_at: datetime
