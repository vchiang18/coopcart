from fastapi import APIRouter, Depends
from queries.orders import OrderIn, OrderOut, OrderRepository, Error
from typing import List, Union

router = APIRouter()


@router.post("/orders")
def create_order(order: OrderIn, repo: OrderRepository = Depends()):
    return repo.create(order)


@router.get("/orders", response_model=Union[List[OrderOut], Error])
def get_all(repo: OrderRepository = Depends()):
    return repo.get_all()


@router.put("/orders/{order_id}", response_model=OrderOut)
def update_order(order_id: int, order: OrderIn, repo: OrderRepository = Depends()) -> Union[Error, OrderOut]:
    updated = repo.update(order_id, order)
    return updated


@router.get("/orders/{order_id}", response_model=Union[OrderOut, Error])
def get_one(order_id: int, repo: OrderRepository = Depends()):
    return repo.get_one(order_id)
