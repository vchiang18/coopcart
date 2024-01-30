from fastapi import APIRouter, Depends
from queries.property import PropertyIn, PropertyOut, PropertyQueries, Error
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import Union,List

router = APIRouter()

@router.post("/property", response_model=Union[PropertyOut,Error])
def create_property(property: PropertyIn, repo: PropertyQueries = Depends()):
    new_property = repo.create(property)
    return new_property

@router.get("/property/{property_id}", response_model= Union[PropertyOut, Error])
def get_property(property_id: int, repo: PropertyQueries = Depends()):
    property_data = repo.get(property_id)
    return property_data

@router.put("/property/{property_id}", response_model= Union[PropertyOut, Error])
def update_property(property_id: int, property: PropertyIn, repo: PropertyQueries = Depends()):
    update_property = repo.update(property_id, property)
    return update_property
