from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import user, project

#uvicorn app.main:app --reload  ##fetch('http://localhost:8000/').then(res => res.json()).then(console.log)

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

@app.get("/")
def root():
    return {"message":"Todo App"}
