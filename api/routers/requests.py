from fastapi import APIRouter, Depends
from typing import List, Union
from queries.requests import Error, RequestIn, RequestOut, RequestRepository


router = APIRouter()


@router.get("/requests", response_model=Union[List[RequestOut], Error])
def get_all(repo: RequestRepository = Depends()):
    return repo.get_all()


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
