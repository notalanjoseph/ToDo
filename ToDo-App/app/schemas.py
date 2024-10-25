# Pydantic models for structure of request and response
from pydantic import BaseModel, EmailStr, constr
from pydantic.types import conint
from datetime import datetime
from typing import Optional


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
    content: str
    published: bool=True

class ProjectCreate(ProjectBase): # owner_id is also needed for the table posts, we will take it from the token 
    pass


class Project(ProjectBase):
    id: int
    created_at: datetime
    owner_id: int
    owner: UserOut # returns this pydantic model

    class Config:
        orm_mode = True

class ProjectOut(BaseModel):
    Project: Project
    votes: int

    class Config:
        orm_mode = True



