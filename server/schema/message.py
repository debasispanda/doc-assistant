from datetime import datetime
from typing import Literal

from pydantic import BaseModel


class ChatMessage(BaseModel):
    id: str
    content: str
    type: Literal["user", "system"]
    session_id: str
    timestamp: datetime
