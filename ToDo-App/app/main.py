from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

#from .models import Base
#from .database import engine
from .routers import user, project
#from .config import settings

#uvicorn app.main:app --reload  ##fetch('http://localhost:8000/').then(res => res.json()).then(console.log)

#Base.metadata.create_all(bind=engine) # no need if u r using alembic

app = FastAPI()

origins = ["*"] # domains which can access api

app.add_middleware( 
    CORSMiddleware, #middleware runs before every request
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(project.router)
# app.include_router(auth.router)
# app.include_router(vote.router)

@app.get("/")
def root():
    return {"message":"Todo App"}
