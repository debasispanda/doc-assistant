import datetime
from uuid import UUID

from server.schema import ApiModel


class ChatSessionPayload(ApiModel):
    title: str


class ChatSessionResponse(ChatSessionPayload):
    id: UUID
    created_at: datetime.datetime
    updated_at: datetime.datetime | None
