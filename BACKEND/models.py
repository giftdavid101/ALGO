# from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean, ForeignKey
# from sqlalchemy.orm import relationship
#
# from database import Base
#
#
# class User(Base):
#     __tablename__ = "users"
#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, unique=True, index=True)
#     email = Column(String, unique=True, index=True)
#     full_name = Column(String, unique=False, index=True)
#     hashed_password = Column(String)
#
#
# class Challenge(Base):
#     __tablename__ = 'challenges'
#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String)
#     owner_id = Column(Integer, ForeignKey('users.id'))  # Linking to User
#     owner = relationship("User", back_populates="challenges")
#     questions = relationship("Question", back_populates="challenge")
#
#
# class Question(Base):
#     __tablename__ = 'questions'
#     id = Column(Integer, primary_key=True, index=True)
#     challenge_id = Column(Integer, ForeignKey('challenges.id'))  # Linking to Challenge
#     text = Column(String)
#     challenge = relationship("Challenge", back_populates="questions")

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String, index=True)  # Unique=False is the default, so can be omitted
    hashed_password = Column(String)

    # Define the relationship to Challenges
    challenges = relationship("Challenge", back_populates="owner")

class Challenge(Base):
    __tablename__ = 'challenges'
    id = Column(Integer, primary_key=True, index=True)
    challenge_title = Column(String)
    owner_id = Column(Integer, ForeignKey('users.id'))  # Linking to User
    owner = relationship("User", back_populates="challenges")  # Back-reference to User
    questions = relationship("Question", back_populates="challenge")

class Question(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True, index=True)
    challenge_id = Column(Integer, ForeignKey('challenges.id'))  # Linking to Challenge
    text = Column(String)
    challenge = relationship("Challenge", back_populates="questions")
