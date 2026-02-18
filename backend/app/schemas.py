from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime
from uuid import UUID

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    status: Optional[str] = "TODO"

class TaskCreate(TaskBase):
    pass

class TaskSmartCreate(BaseModel):
    raw_text: str

class TaskResponse(TaskBase):
    id: UUID
    user_id: Optional[UUID] = None
    priority_score: int
    smart_tags: List[str] = []
    raw_nlp_input: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class QuantumSortResponse(BaseModel):
    sorted_task_ids: List[UUID]
