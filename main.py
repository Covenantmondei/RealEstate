from fastapi import FastAPI
from app.database import Base, engine
from app.routers import user, property, admin
from app.auth.models import User, AgentProfile, ActivityLog
from app.property.models import UserProperty, PropertyImage, Favorite

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Real Estate API",
    description="A comprehensive real estate management system",
    version="1.0.0"
)

app.include_router(user.router)
app.include_router(property.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {
        'message': 'Welcome to the Real Estate API',
        'version': '1.0.0',
        'docs': '/docs',
        'redoc': '/redoc'
    }