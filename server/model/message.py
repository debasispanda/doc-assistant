from enum import Enum
from uuid import UUID

from sqlmodel import Field

from server.model import Base


class MessageType(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"


class ChatMessage(Base, table=True):
    type: MessageType = Field(default=MessageType.USER)
    content: str
    session_id: UUID = Field(foreign_key="chatsession.id")
