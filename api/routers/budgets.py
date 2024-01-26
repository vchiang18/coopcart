from fastapi import APIRouter, Depends, Response
from queries.budgets import BudgetIn, BudgetOut, BudgetQueries, Error
from typing import Union, List


router = APIRouter()

@router.post("/budget", response_model= Union[BudgetOut, Error])
def create_budget(
    budget: BudgetIn,
    response: Response,
    repo: BudgetQueries = Depends(),
):
    budget_data = repo.create(budget)
    return budget_data

@router.get("/budget/{budget_id}", response_model= Union[BudgetOut, Error])
def get_budget(
    budget_id: int,
    response: Response,
    repo: BudgetQueries = Depends(),
):
    budget_data = repo.get(budget_id)
    return budget_data

@router.get("/budgets", response_model= Union[List[BudgetOut], Error])
def get_budgets(
    response: Response,
    repo: BudgetQueries = Depends(),
):
    budget_data = repo.get_all()
    return budget_data

@router.put("/budget/{budget_id}", response_model= Union[BudgetOut, Error])
def update_budget(
    budget_id: int,
    budget: BudgetIn,
    response: Response,
    repo: BudgetQueries = Depends(),
):
    budget_data = repo.update(budget_id, budget)
    return budget_data

@router.delete("/budget/{budget_id}", response_model= Union[BudgetOut, Error])
def delete_budget(
    budget_id: int,
    response: Response,
    repo: BudgetQueries = Depends(),
):
    budget_data = repo.delete(budget_id)
    return budget_data
