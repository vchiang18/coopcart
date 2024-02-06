from fastapi.testclient import TestClient
from main import app
from queries.budgets import BudgetQueries
from authenticator import authenticator
from pydantic import BaseModel


client = TestClient(app)


class UserOut(BaseModel):
    first_name: str
    last_name: str
    username: str
    id: int
    term_boolean: bool


def fake_authenticator_get_current_account_data():
    return UserOut(
        first_name="test",
        last_name="user",
        username="testuser",
        id=1,
        term_boolean=True)


class EmptyBudgetQueries:
    def get_budgets(self):
        return []


class CreateBudgetQueries:
    def create(self, budget):
        result = {"budget_id": 1}
        result.update(budget)
        return result


def test_create_budget():
    app.dependency_overrides[authenticator.get_current_account_data] = fake_authenticator_get_current_account_data
    app.dependency_overrides[BudgetQueries] = CreateBudgetQueries
    response = client.post(
        "/budget",
        json={
            "property": 1,
            "food_fee": 1,
            "total_members": 1,
            "monthly_budget": 1.00,
            "monthly_spend": 1.00,
            "monthly_remaining": 1.00,
            "ytd_budget": 1.00,
            "ytd_spend": 1.00,
            "ytd_remaining_budget": 1.00
        }
    )

    assert response.status_code == 200
    assert response.json() == {
        "property": 1,
        "food_fee": 1,
        "total_members": 1,
        "monthly_budget": 1.00,
        "monthly_spend": 1.00,
        "monthly_remaining": 1.00,
        "ytd_budget": 1.00,
        "ytd_spend": 1.00,
        "ytd_remaining_budget": 1.00,
        "budget_id": 1
    }


class GetBudgetQueries:
    def get(self, budget_id):
        return {
            "property": 1,
            "food_fee": 1,
            "total_members": 1,
            "monthly_budget": 1.00,
            "monthly_spend": 1.00,
            "monthly_remaining": 1.00,
            "ytd_budget": 1.00,
            "ytd_spend": 1.00,
            "ytd_remaining_budget": 1.00,
            "budget_id": 1
        }


def test_get_budget():
    app.dependency_overrides[authenticator.get_current_account_data] = fake_authenticator_get_current_account_data
    app.dependency_overrides[BudgetQueries] = GetBudgetQueries
    response = client.get("/budget/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "property": 1,
        "food_fee": 1,
        "total_members": 1,
        "monthly_budget": 1.00,
        "monthly_spend": 1.00,
        "monthly_remaining": 1.00,
        "ytd_budget": 1.00,
        "ytd_spend": 1.00,
        "ytd_remaining_budget": 1.00,
        "budget_id": 1
    }


class UpdateBudgetQueries:
    def update(self, budget_id, budget):
        result = {"budget_id": 1}
        result.update(budget)
        return result


def test_update_budget():
    app.dependency_overrides[authenticator.get_current_account_data] = fake_authenticator_get_current_account_data
    app.dependency_overrides[BudgetQueries] = UpdateBudgetQueries
    response = client.put(
        "/budget/1",
        json={
            "property": 1,
            "food_fee": 1,
            "total_members": 1,
            "monthly_budget": 1.00,
            "monthly_spend": 1.00,
            "monthly_remaining": 1.00,
            "ytd_budget": 1.00,
            "ytd_spend": 1.00,
            "ytd_remaining_budget": 1.00
        }
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "property": 1,
        "food_fee": 1,
        "total_members": 1,
        "monthly_budget": 1.00,
        "monthly_spend": 1.00,
        "monthly_remaining": 1.00,
        "ytd_budget": 1.00,
        "ytd_spend": 1.00,
        "ytd_remaining_budget": 1.00,
        "budget_id": 1
    }


class DeleteBudgetQueries:
    def delete(self, budget_id):
        return {"message": "Budget deleted"}


def test_delete_budget():
    app.dependency_overrides[authenticator.get_current_account_data] = fake_authenticator_get_current_account_data
    app.dependency_overrides[BudgetQueries] = DeleteBudgetQueries
    response = client.delete("/budget/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {"message": "Budget deleted"}


class GetBudgetsQueries:
    def get_all(self):
        return [
            {
                "property": 1,
                "food_fee": 1,
                "total_members": 1,
                "monthly_budget": 1.00,
                "monthly_spend": 1.00,
                "monthly_remaining": 1.00,
                "ytd_budget": 1.00,
                "ytd_spend": 1.00,
                "ytd_remaining_budget": 1.00,
                "budget_id": 1
            }
        ]


def test_get_budgets():
    app.dependency_overrides[authenticator.get_current_account_data] = fake_authenticator_get_current_account_data
    app.dependency_overrides[BudgetQueries] = GetBudgetsQueries
    response = client.get("/budgets")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == [
        {
            "property": 1,
            "food_fee": 1,
            "total_members": 1,
            "monthly_budget": 1.00,
            "monthly_spend": 1.00,
            "monthly_remaining": 1.00,
            "ytd_budget": 1.00,
            "ytd_spend": 1.00,
            "ytd_remaining_budget": 1.00,
            "budget_id": 1
        }
    ]
