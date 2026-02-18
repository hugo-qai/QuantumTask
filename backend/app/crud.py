from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from . import models, schemas
import uuid

async def get_tasks(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(models.Task).offset(skip).limit(limit))
    return result.scalars().all()

async def create_task(db: AsyncSession, task: schemas.TaskCreate):
    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    await db.commit()
    await db.refresh(db_task)
    return db_task

async def create_smart_task(db: AsyncSession, task_data: dict, raw_text: str):
    db_task = models.Task(
        title=task_data["title"],
        due_date=task_data.get("due_date"),
        smart_tags=task_data.get("smart_tags", []),
        priority_score=task_data.get("predicted_priority", 0),
        raw_nlp_input=raw_text,
        status="TODO"
    )
    db.add(db_task)
    await db.commit()
    await db.refresh(db_task)
    return db_task
