from fastapi import APIRouter, Depends
from queries.users import UserIn, UserOut, UserQueries

router = APIRouter()

@router.post("/user")
def create_user(user: UserIn, repo: UserQueries = Depends()):
	# print ('user', user)
	# print(repo)
	repo.create(user)
	return user
