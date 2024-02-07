from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.users import (UserIn, UserOut, UserQueries, UserInEdit, DuplicateAccountError,
                           Error, UserOutMembers, UserOutEdit)
from queries.manager import (ManagerQueries, ManagerOut)
from typing import Optional, Union, List
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


# creates and logs in new user
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
    form = AccountForm(username=info.username, password=info.password)
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


# protected list of users
@router.get("/users", response_model=Union[List[UserOutMembers], Error])
def get_users(
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: UserQueries = Depends(),
    managers: ManagerQueries = Depends()
):
    user_id = account_data["id"]
    manager = managers.get_manager_by_km(user_id)
    # if user_id in manager table
    if isinstance(manager, ManagerOut):
        if manager.kitchen_manager == user_id:
            # get the property id of the logged in user
            property_id = manager.property
    else:
        response.status_code = 404
        # returns Error if no manager found
        return manager
    users = repo.get_all(property_id)
    if users is None:
        response.status_code = 404
    return users


# user detail
@router.get("/user", response_model=Optional[UserOut])
def get_user(
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: UserQueries = Depends()
) -> UserOut:
    user_id = account_data["id"]
    user = repo.get_one_no_pw(user_id)
    if user is None:
        response.status_code = 404
    return user



# edit user details
@router.put("/user", response_model=Union[UserOut, Error])
def update_user(
    user: UserInEdit,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: UserQueries = Depends()
):
    user_id = account_data["id"]
    return repo.update(user_id, user)

# edit user add property
@router.put("/user", response_model=Union[UserOut, Error])
def update_user(
    user: UserInEdit,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: UserQueries = Depends()
):
    user_id = account_data["id"]
    return repo.update(user_id, user)
