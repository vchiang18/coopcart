from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.food_items import Error, FoodItemIn, FoodItemQueries, FoodItemOut
from authenticator import authenticator

router = APIRouter()

@router.post("/food_item", response_model=Union[FoodItemOut, Error])
async def create_food_item(
    food_item: FoodItemIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FoodItemQueries = Depends(),
):
    return repo.create(food_item)

@router.get("/food_item/{food_item_id}", response_model=Union[FoodItemOut, Error])
async def get_food_item(
    food_item_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FoodItemQueries = Depends(),
):
    return repo.get(food_item_id)

@router.get("/food_items", response_model=Union[List[FoodItemOut], Error])
async def get_food_items(
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FoodItemQueries = Depends(),
):
    return repo.get_all()

@router.put("/food_item/{food_item_id}", response_model=Union[FoodItemOut, Error])
async def update_food_item(
    food_item_id: int,
    food_item: FoodItemIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FoodItemQueries = Depends(),
):
    return repo.update(food_item_id, food_item)

@router.delete("/food_item/{food_item_id}", response_model=Union[FoodItemOut, Error])
async def delete_food_item(
    food_item_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FoodItemQueries = Depends(),
):
    return repo.delete(food_item_id)


