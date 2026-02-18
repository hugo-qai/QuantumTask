from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from . import models, schemas, crud, database, ai_engine

app = FastAPI(title="QuantumTask API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    async with database.engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

@app.get("/")
async def root():
    return {"message": "QuantumTask API is running", "latency_check": "ok"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/tasks", response_model=schemas.TaskResponse)
async def create_task(task: schemas.TaskCreate, db: AsyncSession = Depends(database.get_db)):
    return await crud.create_task(db=db, task=task)

@app.get("/tasks", response_model=List[schemas.TaskResponse])
async def read_tasks(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(database.get_db)):
    tasks = await crud.get_tasks(db, skip=skip, limit=limit)
    return tasks

@app.post("/tasks/smart-create", response_model=schemas.TaskResponse)
async def smart_create_task(request: schemas.TaskSmartCreate, db: AsyncSession = Depends(database.get_db)):
    # 1. Parse Input
    parsed_data = ai_engine.parse_smart_input(request.raw_text)
    
    # 2. Create Task
    task = await crud.create_smart_task(db, parsed_data, request.raw_text)
    return task

@app.get("/tasks/quantum-sort", response_model=schemas.QuantumSortResponse)
async def quantum_sort_tasks(db: AsyncSession = Depends(database.get_db)):
    tasks = await crud.get_tasks(db, skip=0, limit=1000)
    sorted_ids = ai_engine.quantum_sort(tasks)
    return {"sorted_task_ids": sorted_ids}
