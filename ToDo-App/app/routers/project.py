from fastapi import FastAPI, Body, HTTPException, Response, status, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import schemas, oauth2
from ..database import conn, cursor
from datetime import datetime, timezone

router = APIRouter(
    prefix="/projects",
    tags=['Projects']
)


@router.get("/", response_model=List[schemas.ProjectOut])
def get_projects(current_user: int = Depends(oauth2.get_current_user)):
    cursor.execute("""SELECT * FROM projects WHERE owner_id = %s""", (current_user,))        
    projects = cursor.fetchall()
    return [{"Project": project} for project in projects]

@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=schemas.ProjectOut)
def create_project(project: schemas.ProjectCreate, current_user: int = Depends(oauth2.get_current_user)):
    cursor.execute("""INSERT INTO projects (title, owner_id, todos) VALUES (%s, %s, %s) RETURNING *""", (project.title, current_user, project.todos))
    new_project = cursor.fetchone()
    conn.commit()
    return {"Project": new_project}

@router.get("/{project_id}")#, response_model=List[schemas.TodoOut])
def get_project(project_id: int, current_user: int = Depends(oauth2.get_current_user)):
    # Check if the project exists and belongs to the current user
    cursor.execute("""SELECT * FROM projects WHERE id = %s AND owner_id = %s""", (project_id, current_user))
    project = cursor.fetchone()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    # Get the todos
    cursor.execute("""SELECT * FROM todos WHERE id = ANY(%s)""", (project['todos'],))
    todos = cursor.fetchall()
    return [{"Todo": todo} for todo in todos]

@router.put("/{project_id}/rename", response_model=schemas.ProjectOut)
def rename_project(project_id: int, project: schemas.ProjectBase, current_user: int = Depends(oauth2.get_current_user)):
    # Check if the project exists and belongs to the current user
    cursor.execute("""SELECT * FROM projects WHERE id = %s AND owner_id = %s""", (project_id, current_user))
    proj = cursor.fetchone()
    if not proj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    # Update the project
    cursor.execute("""UPDATE projects SET title = %s WHERE id = %s RETURNING *""", (project.title, project_id))
    updated_project = cursor.fetchone()
    conn.commit()
    return {"Project": updated_project}



@router.post("/{project_id}/todos/create", status_code=status.HTTP_201_CREATED, response_model=schemas.ProjectOut)
def create_todo(project_id: int, todo: schemas.TodoCreate, current_user: int = Depends(oauth2.get_current_user)):
    # Check if the project exists and belongs to the current user
    cursor.execute("""SELECT * FROM projects WHERE id = %s AND owner_id = %s""", (project_id, current_user))
    project = cursor.fetchone()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    # Insert the new todo
    cursor.execute("""INSERT INTO todos (description) VALUES (%s) RETURNING *""", (todo.description,))
    new_todo = cursor.fetchone()
    conn.commit()

    # Update the project with the new todo
    cursor.execute("""UPDATE projects SET todos = array_append(todos, %s) WHERE id = %s RETURNING *""", (new_todo['id'], project_id))
    updated_project = cursor.fetchone()
    conn.commit()

    # Return the updated project
    cursor.execute("""SELECT * FROM projects WHERE id = %s""", (project_id,))
    updated_project = cursor.fetchone()
    return {"Project": updated_project}

# works for both edit and mark as done todo
@router.put("/{project_id}/todos/update/{todo_id}", response_model=schemas.ProjectOut)
def update_todo(project_id: int, todo_id: int, todo: schemas.TodoBase, current_user: int = Depends(oauth2.get_current_user)):
    # Check if the project exists and belongs to the current user
    cursor.execute("""SELECT * FROM projects WHERE id = %s AND owner_id = %s""", (project_id, current_user))
    project = cursor.fetchone()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    # Update the todo
    cursor.execute("""UPDATE todos SET description = %s, status = %s, updated_at = %s WHERE id = %s RETURNING *""", (todo.description, todo.status, datetime.now(timezone.utc), todo_id))
    updated_todo = cursor.fetchone()
    conn.commit()

    # Return the updated project
    cursor.execute("""SELECT * FROM projects WHERE id = %s""", (project_id,))
    updated_project = cursor.fetchone()
    return {"Project": updated_project}

@router.delete("/{project_id}/todos/delete/{todo_id}", response_model=schemas.ProjectOut)
def delete_todo(project_id: int, todo_id: int, current_user: int = Depends(oauth2.get_current_user)):
    # Check if the project exists and belongs to the current user
    cursor.execute("""SELECT * FROM projects WHERE id = %s AND owner_id = %s""", (project_id, current_user))
    project = cursor.fetchone()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    # Check if the todo exists and belongs to the project
    # cursor.execute("""SELECT * FROM todos WHERE id = %s""", (todo_id,))
    # todo = cursor.fetchone()
    # if not todo:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")

    # Delete the todo
    cursor.execute("""DELETE FROM todos WHERE id = %s RETURNING *""", (todo_id,))
    deleted_todo = cursor.fetchone()
    conn.commit()

    # Update the project
    cursor.execute("""UPDATE projects SET todos = array_remove(todos, %s) WHERE id = %s RETURNING *""", (todo_id, project_id))
    updated_project = cursor.fetchone()
    conn.commit()

    # Return the updated project
    cursor.execute("""SELECT * FROM projects WHERE id = %s""", (project_id,))
    updated_project = cursor.fetchone()
    return {"Project": updated_project}
