from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.food_items import Error, FoodItemIn, FoodItemQueries, FoodItemOut

router = APIRouter()

@router.post("/food_item", response_model=Union[FoodItemOut, Error])
def create_food_item(
    food_item: FoodItemIn,
    response: Response,
    repo: FoodItemQueries = Depends(),
):
    return repo.create(food_item)

@router.get("/food_item/{food_item_id}", response_model=Union[FoodItemOut, Error])
def get_food_item(
    food_item_id: int,
    response: Response,
    repo: FoodItemQueries = Depends(),
):
    return repo.get(food_item_id)

@router.get("/food_items", response_model=Union[List[FoodItemOut], Error])
def get_food_items(
    response: Response,
    repo: FoodItemQueries = Depends(),
):
    return repo.get_all()

@router.put("/food_item/{food_item_id}", response_model=Union[FoodItemOut, Error])
def update_food_item(
    food_item_id: int,
    food_item: FoodItemIn,
    response: Response,
    repo: FoodItemQueries = Depends(),
):
    return repo.update(food_item_id, food_item)

@router.delete("/food_item/{food_item_id}", response_model=Union[FoodItemOut, Error])
def delete_food_item(
    food_item_id: int,
    response: Response,
    repo: FoodItemQueries = Depends(),
):
    return repo.delete(food_item_id)
