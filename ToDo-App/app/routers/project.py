from fastapi import FastAPI, Body, HTTPException, Response, status, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import schemas, oauth2
from ..database import conn, cursor

router = APIRouter(
    prefix="/projects",
    tags=['Projects']
)


@router.get("/")#, response_model=List[schemas.ProjectOut])
def get_projects(current_user: int = Depends(oauth2.get_current_user)):
    cursor.execute("""SELECT * FROM projects WHERE owner_id = %s""", (current_user,))        
    projects = cursor.fetchall()
    return projects
