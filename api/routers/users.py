from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.users import (UserIn,
    UserOut, UserQueries, DuplicateAccountError,
    Error, UserOutMembers)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import Optional, Union, List

from pydantic import BaseModel

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: UserOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

#creates and logs in new user
@router.post("/user", response_model=AccountToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    users: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = users.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a user with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, users)
    return AccountToken(account=user, **token.dict())

@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: UserOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }

@router.get("/api/protected", response_model=str)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return "True"

#user detail
@router.get("/users/{user_id}", response_model=Optional[UserOut])
def get_user(
    user_id: int,
    response: Response,
    repo: UserQueries = Depends()
) -> UserOut:
    user = repo.get_one_no_pw(user_id)
    if user is None:
        response.status_code = 404
    return user

#return list of users
@router.get("/users", response_model=Union[List[UserOutMembers], Error])
def get_users(
    property_id: int,
    response: Response,
    repo: UserQueries = Depends()
):
    users = repo.get_all(property_id)
    if users is None:
        response.status_code = 404
    return users


#edit user

#delete user
