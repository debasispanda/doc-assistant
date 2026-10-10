from datetime import UTC, datetime


def to_camel_case(value: str) -> str:
    head, *tail = value.split("_")
    return head + "".join(part.capitalize() for part in tail)


def get_datetime_utc() -> datetime:
    return datetime.now(UTC)
