from pydantic import BaseModel, ConfigDict

from server.utils import to_camel_case


class ApiModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel_case,
        from_attributes=True,
        populate_by_name=True,
        serialize_by_alias=True,
    )
