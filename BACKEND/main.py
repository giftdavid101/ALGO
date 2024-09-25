from datetime import timedelta
import jwt
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
from database import engine, Base, get_db
import schemas, crud
from jwt import PyJWTError
from fastapi.security import OAuth2PasswordBearer
import logging

from models import Question
from schemas import QuestionCreate, QuestionBase

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # Allow specific origin
    # "https://your-frontend-domain.com",  # Allow another domain
    "*",  # Allow all origins (use with caution)
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # List of origins that are allowed to make requests
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


# Set up logging
# logging.basicConfig(level=logging.INFO)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("app.log"),  # Log to a file
        logging.StreamHandler()  # Also log to console
    ]
)
logger = logging.getLogger(__name__)


# Add middleware to log requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response


# Add custom exception handler
@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"An error occurred: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred."}
    )


# Define your database models
Base.metadata.create_all(bind=engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, crud.SECRET_KEY, algorithms=[crud.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except PyJWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=username)
    if user is None:
        raise credentials_exception
    return user


@app.get("/users/me", response_model=schemas.UserBase)
def read_users_me(current_user: schemas.UserBase = Depends(get_current_user)):
    return current_user


@app.post("/sign-up/", response_model=schemas.User)
def signup_user(users: schemas.UserSignUp, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=users.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, users=users)


@app.post("/login/", response_model=schemas.Token)
def login_for_access_token(user: schemas.UserLogin, db: Session = Depends(get_db)):
    try:
        db_user = crud.get_user_by_email(db, email=user.email)
        if not db_user or not crud.pwd_context.verify(user.password, db_user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect email or password")

        access_token_expires = timedelta(minutes=crud.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = crud.create_access_token(data={"sub": db_user.email}, expires_delta=access_token_expires)
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        logger.error(f"Login failed: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


# quiz's

@app.post("/challenges/{challenge_id}/questions/", response_model=schemas.Question)
def create_question(challenge_id: int, question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    db_question = models.Question(challenge_id=challenge_id, text=question.text)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

@app.get("/challenges/{challenge_id}/questions/{question_id}", response_model=schemas.Question)
def read_question(challenge_id: int, question_id: int, db: Session = Depends(get_db)):
    question = crud.get_question(db, challenge_id=challenge_id, question_id=question_id)
    if question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    return question


@app.get("/challenges/{challenge_id}/questions/", response_model=list[schemas.Question])
def read_questions(challenge_id: int, db: Session = Depends(get_db)):
    return crud.get_questions(db, challenge_id=challenge_id)
