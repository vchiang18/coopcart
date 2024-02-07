from fastapi.testclient import TestClient
from main import app
from queries.requests import RequestRepository
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


class GetRequestRepository:
    def get_all(self):
        return []


class CreateRequestRepository:
    def create(self, request):
        result = {"request_id": 1}
        result.update(request)
        return result


class UpdateRequestRepository:
    def update(self, request_id, request):
        result = {
            "request_id": 1,
            "created_date": datetime.now(),
            "status": "New",
        }
        result.update(request)
        return result


class DeleteRequestRepository:
    def delete(self, request_id):
        return True


def test_get_all():
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    app.dependency_overrides[RequestRepository] = GetRequestRepository

    response = client.get("/requests")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


def test_create():
    app.dependency_overrides[RequestRepository] = CreateRequestRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    response = client.post(
        "/request/add",
        json={
            "item": "apple",
            "brand": "Fuji",
            "unit_quantity": "1",
            "unit_type": "red",
            "requestor": "1",
            "quantity": "6"
        }
    )

    assert response.status_code == 200
    assert response.json() == {
        "request_id": 1,
        "item": "apple",
        "brand": "Fuji",
        "unit_quantity": 1,
        "unit_type": "red",
        "requestor": 1,
        "quantity": 6,
    }


def test_update():
    app.dependency_overrides[RequestRepository] = UpdateRequestRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    response = client.put(
        "/requests/1",
        json={
            "item": "apple",
            "brand": "Fuji",
            "unit_quantity": "1",
            "unit_type": "green",
            "requestor": "1",
            "quantity": "6",
            "request_id": 1
        }
    )

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "request_id": 1,
        "item": "apple",
        "brand": "Fuji",
        "unit_quantity": 1,
        "unit_type": "green",
        "requestor": 1,
        "created_date": response.json()["created_date"],
        "status": "New",
        "quantity": 6,
        "last_edited_by": None,
        "last_edited": None
    }


def test_delete():
    app.dependency_overrides[RequestRepository] = DeleteRequestRepository
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    response = client.delete("requests/1")

    app.dependency_overrides = {}

    assert response.status_code == 200
