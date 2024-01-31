from fastapi import APIRouter, Depends
from typing import List, Union
from queries.requests import Error, RequestIn, RequestOut, RequestRepository
from authenticator import authenticator


router = APIRouter()


@router.get("/requests", response_model=Union[List[RequestOut], Error])
def get_all(repo: RequestRepository = Depends(),
            account_data: dict = Depends(authenticator.get_current_account_data)):
    return repo.get_all(account_data)


@router.post("/requests")
def create_request(request: RequestIn, repo: RequestRepository = Depends()):
    return repo.create(request)


@router.put("/requests/{request_id}", response_model=RequestOut)
def update_request(request_id: int, request: RequestIn, repo: RequestRepository = Depends()) -> Union[Error, RequestOut]:
    updated = repo.update(request_id, request)
    return updated


@router.delete("/requests/{request_id}", response_model=bool)
def delete_request(request_id: int, repo: RequestRepository = Depends()) -> bool:
    return repo.delete(request_id)
