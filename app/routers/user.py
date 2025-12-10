from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth import user


from app.database import get_db
from app.auth.schemas import UserBase, UserDisplay, UserLogin, Token


router = APIRouter(
    prefix='/auth',
    tags=['user']
)

@router.post("/register", response_model=UserDisplay)
async def create_user(request: UserBase, db: Session = Depends(get_db)):
    return await user.create_user(db, request)

@router.post("/login", response_model=Token)
def login(request: UserLogin, db: Session = Depends(get_db)):
    return user.login_user(db, request.username, request.password)


@router.get("/verify-email")
async def verify_email(token: str, db: Session = Depends(get_db)):
    return await user.verify_email(token, db)