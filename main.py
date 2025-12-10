from fastapi import FastAPI
from app.database import Base, engine
from app.routers import user

from app.auth.models import User, AgentProfile
from app.property.models import UserProperty, PropertyImage, Favorite

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user.router)

@app.get("/")
def read_root():
    return {'Welcome': 'to the Real Estate APP'}