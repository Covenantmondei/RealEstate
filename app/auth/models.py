from app.database import Base
from sqlalchemy import Boolean, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import enum


class UserRole(str, enum.Enum):
    BUYER = "buyer"
    AGENT = "agent"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    password = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    is_verified = Column(Boolean, default=False)
    role = Column(String, default=UserRole.BUYER.value)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    agent_profile = relationship("AgentProfile", back_populates="user", uselist=False)
    properties = relationship("UserProperty", back_populates="agent")
    favorites = relationship("Favorite", back_populates="user")


class AgentProfile(Base):
    __tablename__ = "agent_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    phone_number = Column(String)
    bio = Column(Text)
    profile_picture = Column(String)  # Cloudinary URL
    company = Column(String)
    license_number = Column(String)
    years_experience = Column(Integer)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="agent_profile")
