from datetime import datetime

from sqlmodel import Column, DateTime, Field

from server.model import Base
from server.utils import get_datetime_utc


class ChatSession(Base, table=True):
    title: str = Field(default="New Session")
    updated_at: datetime | None = Field(
        default=None,
        sa_column=Column(
            DateTime(timezone=True), onupdate=get_datetime_utc, nullable=True
        ),
    )
