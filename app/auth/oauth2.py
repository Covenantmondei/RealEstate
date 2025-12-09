from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from datetime import datetime, timedelta
from jose import jwt
import os
import dotenv

dotenv.load_dotenv()

oauth2_schema = OAuth2PasswordBearer(tokenUrl='token')
 
SECRET_KEY = os.environ.get('SECRET_KEY')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30
 
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.utcnow() + expires_delta
  else:
    expire = datetime.utcnow() + timedelta(minutes=15)
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt



def create_verification_token(user_id: int):
  payload = {
    "user_id": user_id,
    "exp": datetime.utcnow() + timedelta(hours=1),
    "type": "email_verification"
  }
  
  return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str):
  return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])