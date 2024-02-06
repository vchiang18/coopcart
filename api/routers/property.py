from fastapi import APIRouter, Depends, Response
from queries.property import PropertyIn, PropertyOut, PropertyOutSignup, PropertyQueries, Error
from typing import Union, List
from authenticator import authenticator

router = APIRouter()

@router.post("/property", response_model=Union[PropertyOut,Error])
def create_property(property: PropertyIn, repo: PropertyQueries = Depends(),
                    account_data: dict=Depends(authenticator.get_current_account_data)):
    new_property = repo.create(property)
    return new_property

@router.get("/property/{property_id}", response_model= Union[PropertyOut, Error])
def get_property(property_id: int, repo: PropertyQueries = Depends(),
                 account_data:dict=Depends(authenticator.get_current_account_data)):
    property_data = repo.get(property_id)
    return property_data

@router.put("/property/{property_id}", response_model= Union[PropertyOut, Error])
def update_property(property_id: int, property: PropertyIn, repo: PropertyQueries = Depends(),
                    account_data: dict=Depends(authenticator.get_current_account_data)):
    update_property = repo.update(property_id, property)
    return update_property

@router.get("/properties", response_model=Union[List[PropertyOutSignup], Error])
def get_all(
    response: Response,
    repo: PropertyQueries = Depends(),
):
    properties = repo.get_all()
    if properties is None:
        response.status_code = 404
    return properties
