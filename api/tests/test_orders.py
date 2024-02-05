from fastapi.testclient import TestClient
from main import app
from queries.orders import OrderRepository
from authenticator import authenticator
from pydantic import BaseModel
from datetime import datetime

client = TestClient(app)


class UserOut(BaseModel):
    first_name: str
    last_name: str
    username: str
    id: int
    term_boolean: bool


def fake_get_current_account_data():
    return UserOut(
        first_name="David",
        last_name="Beckham",
        username="DavidBeckham",
        id=1,
        term_boolean=True
    )


class GetOrdersRepository:
    def get_all(self):
        return []


class CreateOrderRepository:
    def create(self, order):
        result = {"order_id": 1}
        result.update(order)
        return result


class UpdateOrderRepository:
    def update(self, order_id, order):
        result = {
            "order_id": 1,
            "created_date": datetime.now(),
        }
        result.update(order)
        return result


class GetOrderRepository:
    def get_one(self, order_id):
        return {
              "order_id": 1,
              "item": 1,
              "brand": 1,
              "unit_quantity": 1,
              "unit_type": 1,
              "vendor": 1,
              "requestor": 1,
              "created_date": datetime.now(),
              "quantity": 1,
              "purchased_price": 1.00,
              "purchased_quantity": 1,
              "notes": "hello",
              "last_edited_by": None,
              "last_edited": None
         }


def test_get_all():
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    app.dependency_overrides[OrderRepository] = GetOrdersRepository

    response = client.get("/orders")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


def test_create():
    app.dependency_overrides[OrderRepository] = CreateOrderRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    response = client.post(
        "/orders",
        json={
            "item": "apple",
            "brand": "Fuji",
            "unit_quantity": 1,
            "unit_type": "red",
            "vendor": "Costco",
            "requestor": 1,
            "quantity": 6,
            "purchased_price": 1,
            "purchased_quantity": 1
        }
    )

    assert response.status_code == 200
    assert response.json() == {
        "order_id": 1,
        "item": "apple",
        "brand": "Fuji",
        "unit_quantity": 1,
        "unit_type": "red",
        "vendor": "Costco",
        "requestor": 1,
        "quantity": 6,
        "purchased_price": 1,
        "purchased_quantity": 1,
        "notes": None
    }


def test_update():
    app.dependency_overrides[OrderRepository] = UpdateOrderRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    response = client.put(
        "/orders/1",
        json={
            "item": "apple",
            "brand": "Fuji",
            "unit_quantity": 1,
            "unit_type": "red",
            "vendor": "Costco",
            "requestor": 1,
            "quantity": 6,
            "purchased_price": 1,
            "purchased_quantity": 1
        }
    )

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "order_id": 1,
        "item": "apple",
        "brand": "Fuji",
        "unit_quantity": 1,
        "unit_type": "red",
        "vendor": "Costco",
        "requestor": 1,
        "quantity": 6,
        "purchased_price": 1,
        "purchased_quantity": 1,
        "created_date": response.json()["created_date"],
        "last_edited": None,
        "last_edited_by": None,
        "notes": None,
    }


def test_get_one():
    app.dependency_overrides[OrderRepository] = GetOrderRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    response = client.get("orders/1")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "order_id": 1,
        "item": "1",
        "brand": "1",
        "unit_quantity": 1,
        "unit_type": "1",
        "vendor": "1",
        "requestor": 1,
        "created_date": response.json()["created_date"],
        "quantity": 1,
        "purchased_price": 1.00,
        "purchased_quantity": 1,
        "notes": "hello",
        "last_edited_by": None,
        "last_edited": None
    }
