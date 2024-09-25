from fastapi import HTTPException
from sqlalchemy.orm import Session

import models
import schemas
from models import User, Challenge, Question
from schemas import UserSignUp, QuestionCreate
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt

SECRET_KEY = "your_secret_key"  # Change this to a secure random key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, users: UserSignUp):
    hashed_password = pwd_context.hash(users.password)
    db_user = User(
        username=users.username,
        full_name=users.full_name,
        email=users.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Challenges
def create_question(db: Session, challenge_id: int, question: schemas.QuestionCreate):
    db_question = models.Question(**question.dict(), challenge_id=challenge_id,)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question


# def get_question(db: Session, challenge_id: int, question_id: int):
#     return db.query(models.Question).filter(models.Question.challenge_id == challenge_id,
#                                             models.Question.id == question_id).first()
def get_question(db: Session, challenge_id: int, question_id: int):
    question = db.query(models.Question).filter(
        models.Question.challenge_id == challenge_id,
        models.Question.id == question_id
    ).first()
    if question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    return question


# def get_questions(db: Session, challenge_id: int):
#     return db.query(models.Question).filter(models.Question.challenge_id == challenge_id).all()

def get_questions(db: Session, challenge_id: int):
    questions = db.query(models.Question).filter(models.Question.challenge_id == challenge_id).all()
    if not questions:
        raise HTTPException(status_code=404, detail="No questions found for this challenge")
    return questions