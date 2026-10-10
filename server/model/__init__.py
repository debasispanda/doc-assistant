from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import DateTime, Field, SQLModel

from server.utils import get_datetime_utc


class Base(SQLModel):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    created_at: datetime | None = Field(
        default_factory=get_datetime_utc, sa_type=DateTime(timezone=True)
    )
