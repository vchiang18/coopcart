from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool
from psycopg.rows import dict_row


class Error(BaseModel):
    message: str


class BudgetIn(BaseModel):
    property: int
    food_fee: Optional[int]
    total_members: Optional[int]
    monthly_budget: Optional[int]
    monthly_spend: Optional[int]
    monthly_remaining: Optional[int]
    YTD_budget: Optional[int]
    YTD_spend: Optional[int]
    YTD_remaining_budget: Optional[float]


class BudgetOut(BaseModel):
    property: int
    food_fee: Optional[int]
    total_members: Optional[int]
    monthly_budget: Optional[int]
    monthly_spend: Optional[int]
    monthly_remaining: Optional[int]
    ytd_budget: Optional[int]
    ytd_spend: Optional[int]
    ytd_remaining_budget: Optional[float]
    budget_id: int


class BudgetQueries:
    def create(self, budget: BudgetIn) -> Union[BudgetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO budgets
                            (property,
                            food_fee,
                            total_members,
                            monthly_budget,
                            monthly_spend,
                            monthly_remaining,
                            YTD_budget,
                            YTD_spend,
                            YTD_remaining_budget)
                        VALUES (%s, %s, %s,
                            %s::float8::numeric::money,
                            %s::float8::numeric::money,
                            %s::float8::numeric::money,
                            %s::float8::numeric::money,
                            %s::float8::numeric::money,
                            %s::float8::numeric::money)
                        RETURNING budget_id;
                        """,
                        [
                            budget.property,
                            budget.food_fee,
                            budget.total_members,
                            budget.monthly_budget,
                            budget.monthly_spend,
                            budget.monthly_remaining,
                            budget.YTD_budget,
                            budget.YTD_spend,
                            budget.YTD_remaining_budget
                        ]
                    )
                    budget_id = db.fetchone()[0]
                    if budget_id is None:
                        return {"message": "Could not create that budget"}
                    return BudgetOut(budget_id=budget_id, **budget.dict())
        except Exception as e:
            return Error(message=str(e))

    def get(self, budget_id: int) -> Union[BudgetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    db.execute(
                        """
                        SELECT
                            budget_id,
                            property,
                            food_fee,
                            total_members,
                            monthly_budget::numeric::integer,
                            monthly_spend::numeric::integer,
                            monthly_remaining::numeric::integer,
                            YTD_budget::numeric::integer,
                            YTD_spend::numeric::integer,
                            YTD_remaining_budget::numeric::integer
                        FROM budgets
                        WHERE budget_id = %s;
                        """,
                        [budget_id]
                    )
                    result = db.fetchone()
                    if result is None:
                        return Error(message="Could not find that budget")
                    return BudgetOut(**result)
        except Exception as e:
            return Error(message=str(e))

    def get_all(self) -> Union[List[BudgetOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    db.execute(
                        """
                        SELECT
                            budget_id,
                            property,
                            food_fee,
                            total_members,
                            monthly_budget::numeric::integer,
                            monthly_spend::numeric::integer,
                            monthly_remaining::numeric::integer,
                            YTD_budget::money::numeric::integer,
                            YTD_spend::numeric::integer,
                            YTD_remaining_budget::money::numeric::float8
                        FROM budgets
                        ORDER BY property;
                        """,
                    )
                    results = db.fetchall()
                    if results is None:
                        return {"message": "Could not find any budgets"}
                    return [BudgetOut(**result) for result in results]
        except Exception as e:
            return Error(message=str(e))

    def update(self, budget_id: int, budget: BudgetIn) -> Union[BudgetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE budgets
                        SET food_fee = %s,
                            total_members = %s,
                            monthly_budget = %s::float8::numeric::money,
                            monthly_spend = %s::float8::numeric::money,
                            monthly_remaining = %s::float8::numeric::money,
                            YTD_budget = %s::float8::numeric::money,
                            YTD_spend = %s::float8::numeric::money,
                            YTD_remaining_budget = %s::float8::numeric::money
                        WHERE budget_id = %s
                        RETURNING *;
                        """,
                        [
                            budget.food_fee,
                            budget.total_members,
                            budget.monthly_budget,
                            budget.monthly_spend,
                            budget.monthly_remaining,
                            budget.YTD_budget,
                            budget.YTD_spend,
                            budget.YTD_remaining_budget,
                            budget_id
                        ]
                    )
                    return self.budget_in_to_out(budget_id, budget)
        except Exception as e:
            return Error(message=str(e))

    def delete(self, budget_id: int) -> Union[BudgetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM budgets
                        WHERE budget_id = %s
                        """,
                        [budget_id]
                    )
                    return {"message": "Budget deleted"}
        except Exception as e:
            return Error(message=str(e))

    def budget_in_to_out(self, budget_id: int, budget: BudgetIn):
        return BudgetOut(budget_id=budget_id, **budget.dict())
