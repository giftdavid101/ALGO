# from datetime import date
# from pydantic import BaseModel, constr, EmailStr, validator
#
#
# class User(BaseModel):
#     id: int
#
#
# class UserBase(BaseModel):
#     username: str
#     full_name: str
#     email: EmailStr
#
#
# class UserCreatePassword(BaseModel):
#     password: constr(min_length=8)
#     confirm_password: constr(min_length=8)
#
#     @validator('password')
#     def password_must_contain_number(cls, v):
#         if not any(char.isdigit() for char in v):
#             raise ValueError('Password must contain at least one digit')
#         return v
#
#     @validator('confirm_password')
#     def passwords_must_match(cls, confirm_password, values):
#         password = values.get('password')
#         if password != confirm_password:
#             raise ValueError('Passwords do not match')
#         return confirm_password
#
#
# class UserSignUp(UserBase, UserCreatePassword):
#     pass  # This will inherit from UserBase and UserCreatePassword
#
#
# class UserUpdate(BaseModel):
#     profile_picture: str = None
#     date_of_birth: date = None
#     password: constr(min_length=8) = None
#
#
# class UserLogin(BaseModel):
#     email: EmailStr
#     password: constr(min_length=8)
#
#
# class Token(BaseModel):
#     access_token: str
#     token_type: str
#
#
# # CHALLENGES
# class ErrorResponse(BaseModel):
#     detail: str
#     code: int
#
#     class Config:
#         schema_extra = {
#             "example": {
#                 "detail": "Challenge not found",
#                 "code": 404
#             }
#         }
#
# class ChallengeBase(BaseModel):
#     title: str
#
#
# class ChallengeCreate(ChallengeBase):
#     pass
#
#
# class Challenge(ChallengeBase):
#     id: int
#
#
# class QuestionBase(BaseModel):
#     challenge_title: str
#     text: str
#
#
# class QuestionCreate(QuestionBase):
#     challenge_title: str
#     pass
#
#
# class Question(QuestionBase):
#     id: int
#     challenge_id: int
#     challenge_title: str
#     text: str
#
#     class Config:
#         orm_mode = True


from datetime import date
from pydantic import BaseModel, constr, EmailStr, validator


class User(BaseModel):
    id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    full_name: str
    email: EmailStr


class UserCreatePassword(BaseModel):
    password: constr(min_length=8)
    confirm_password: constr(min_length=8)

    @validator('password')
    def password_must_contain_number(cls, v):
        if not any(char.isdigit() for char in v):
            raise ValueError('Password must contain at least one digit')
        return v

    @validator('confirm_password')
    def passwords_must_match(cls, confirm_password, values):
        password = values.get('password')
        if password != confirm_password:
            raise ValueError('Passwords do not match')
        return confirm_password


class UserSignUp(UserBase, UserCreatePassword):
    pass


class UserUpdate(BaseModel):
    profile_picture: str = None
    date_of_birth: date = None
    password: constr(min_length=8) = None


class UserLogin(BaseModel):
    email: EmailStr
    password: constr(min_length=8)


class Token(BaseModel):
    access_token: str
    token_type: str


# CHALLENGES
class ErrorResponse(BaseModel):
    detail: str
    code: int

    class Config:
        schema_extra = {
            "example": {
                "detail": "Challenge not found",
                "code": 404
            }
        }


class ChallengeBase(BaseModel):
    title: str


class ChallengeCreate(ChallengeBase):
    pass


class Challenge(ChallengeBase):
    id: int

    class Config:
        orm_mode = True


class QuestionBase(BaseModel):
    text: str


class QuestionCreate(QuestionBase):
    pass


class Question(QuestionBase):
    id: int
    challenge_id: int

    class Config:
        orm_mode = True
