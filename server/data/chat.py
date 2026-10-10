from datetime import datetime
from typing import Literal

from pydantic import BaseModel


class ChatMessage(BaseModel):
    id: str
    content: str
    type: Literal["user", "system"]
    session_id: str
    timestamp: datetime


class ChatSession(BaseModel):
    id: str
    title: str
    messages: list[ChatMessage] = []
    created_at: datetime
    updated_at: datetime


fake_chat_history = [
    ChatMessage(
        id="c02ad2ac-8dfb-4573-83ff-79e191503796",
        content="Hi",
        type="user",
        session_id="cf02ad2ac-8dfb-4573-83ff-79e191503794",
        timestamp=datetime.now(),
    ),
    ChatMessage(
        id="c02ad2ac-8dfb-4573-83ff-79e191503795",
        content="Hello! How can I assist you today?",
        type="system",
        session_id="cf02ad2ac-8dfb-4573-83ff-79e191503794",
        timestamp=datetime.now(),
    ),
    ChatMessage(
        id="c02ad2ac-8dfb-4573-83ff-79e191503797",
        content="I need help with my project.",
        type="user",
        session_id="cf02ad2ac-8dfb-4573-83ff-79e191503794",
        timestamp=datetime.now(),
    ),
]

fake_chat_session = [
    ChatSession(
        id="cf02ad2ac-8dfb-4573-83ff-79e191503794",
        title="Session 1",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    ),
]

fake_chat_session_with_messages = [
    ChatSession(
        id="cf02ad2ac-8dfb-4573-83ff-79e191503794",
        title="Session 1",
        messages=[
            message
            for message in fake_chat_history
            if message.session_id == "cf02ad2ac-8dfb-4573-83ff-79e191503794"
        ],
        created_at=datetime.now(),
        updated_at=datetime.now(),
    ),
]
