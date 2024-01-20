from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.requests import (
    Error,
    RequestIn,
    RequestOut,
    RequestRepository,
)


router = APIRouter()


@router.get("/requests", response_model=Union[List[RequestOut], Error])
def get_all(
    repo: RequestRepository = Depends(),
):
    return repo.get_all()


@router.post("/requests", response_model=Union[RequestOut, Error])
def create_request(
    request: RequestIn,
    response: Response,
    repo: RequestRepository = Depends(),
):
    response.status_code = 400
    return repo.create(request)


@router.put("/requests/{request_id}", response_model=Union[RequestOut, Error])
def update_request(
    request_id: int,
    request: RequestIn,
    repo: RequestRepository = Depends(),
) -> Union[Error, RequestOut]:
    return repo.update(request_id, request)


@router.delete("/requests/{request_id}", response_model=bool)
def delete_request(
    request_id: int,
    repo: RequestRepository = Depends(),
) -> bool:
    return repo.delete(request_id)
