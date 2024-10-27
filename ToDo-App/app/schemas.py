# Pydantic models for structure of request and response
from pydantic import BaseModel, EmailStr, constr
from pydantic.types import conint
from datetime import datetime
from typing import Optional, List


class UserCreate(BaseModel):
    email: EmailStr
    password: constr(min_length=4)

class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True # to convert to a pydantic model since this class is used as a response

# use Outh2PasswordRequestForm instead
# class UserLogin(BaseModel):
#     email: EmailStr
#     password: constr(min_length=4)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[int] = None


class ProjectBase(BaseModel):
    title: str
    todos: Optional[List[int]] = None
    #published: bool=True

class ProjectCreate(ProjectBase): # owner_id is take from jwt 
    pass

class Project(ProjectBase):
    id: int
    owner_id: int
    created_at: datetime
    #owner: UserOut # returns this pydantic model

    class Config:
        orm_mode = True

class ProjectOut(BaseModel):
    Project: Project

    class Config:
        orm_mode = True


class TodoBase(BaseModel):
    description: str
    status: bool=False

class TodoCreate(TodoBase): # no owner_id
    pass

class TodoUpdate(BaseModel):
    description: Optional[str] = None
    status: Optional[bool] = None