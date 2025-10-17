from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

app = FastAPI(title="Task Manager API")

# CORS - Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = ""

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class Task(BaseModel):
    id: str
    title: str
    description: str
    completed: bool
    created_at: str

# In-memory database (for simplicity)
tasks_db: dict[str, Task] = {}

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Task Manager API", "version": "1.0"}

# Get all tasks
@app.get("/tasks", response_model=List[Task])
def get_tasks():
    return list(tasks_db.values())

# Get single task
@app.get("/tasks/{task_id}", response_model=Task)
def get_task(task_id: str):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    return tasks_db[task_id]

# Create task
@app.post("/tasks", response_model=Task, status_code=201)
def create_task(task: TaskCreate):
    task_id = str(uuid.uuid4())
    new_task = Task(
        id=task_id,
        title=task.title,
        description=task.description or "",
        completed=False,
        created_at=datetime.now().isoformat()
    )
    tasks_db[task_id] = new_task
    return new_task

# Update task
@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: str, task: TaskUpdate):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    
    existing_task = tasks_db[task_id]
    
    if task.title is not None:
        existing_task.title = task.title
    if task.description is not None:
        existing_task.description = task.description
    if task.completed is not None:
        existing_task.completed = task.completed
    
    tasks_db[task_id] = existing_task
    return existing_task

# Toggle task completion
@app.patch("/tasks/{task_id}/toggle", response_model=Task)
def toggle_task(task_id: str):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task = tasks_db[task_id]
    task.completed = not task.completed
    tasks_db[task_id] = task
    return task

# Delete task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    
    del tasks_db[task_id]
    return {"message": "Task deleted successfully"}

# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy", "tasks_count": len(tasks_db)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)