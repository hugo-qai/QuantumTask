from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from sqlalchemy.dialects.postgresql import UUID
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    tasks = relationship("Task", back_populates="owner")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    raw_nlp_input = Column(String, nullable=True)
    due_date = Column(DateTime, nullable=True)
    priority_score = Column(Integer, default=0)
    status = Column(String, default="TODO")
    smart_tags = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="tasks")
