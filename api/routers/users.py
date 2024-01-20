from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.users import UserIn, UserOut, UserQueries, DuplicateAccountError
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: UserOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

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

@router.get("/users/{user_id}", response_model=UserOut)
def get_user(
    user_id: int,
    response: Response,
    repo: UserQueries = Depends()
) -> UserOut:
    return repo.get_user(user_id)

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

@router.get("/api/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return "This is a placeholder for a login-protected page"


# @router.post("/user")
# def create_user(user: UserIn, repo: UserQueries = Depends()):
# 	# print ('user', user)
# 	# print(repo)
# 	repo.create(user)
# 	return user
