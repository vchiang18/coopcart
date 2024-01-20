from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.requests import Error, RequestIn, RequestOut, RequestRepository


router = APIRouter()


@router.get("/requests")
def get_all(repo: RequestRepository = Depends()):
    return repo.get_all()


@router.post("/requests")
def create_request(request: RequestIn, repo: RequestRepository = Depends()):
    repo.create(request)
    return request


@router.put("/requests/{request_id}")
def update_request(request_id: int, request: RequestIn, repo: RequestRepository = Depends()) -> Union[Error, RequestOut]:
    return repo.update(request_id, request)


@router.delete("/requests/{request_id}")
def delete_request(request_id: int, repo: RequestRepository = Depends()) -> bool:
    return repo.delete(request_id)
