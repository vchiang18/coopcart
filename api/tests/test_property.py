from fastapi.testclient import TestClient
from main import app
from queries.property import PropertyQueries, PropertyOut
from authenticator import authenticator
from pydantic import BaseModel
import datetime


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


class EmptyPropertyQueries:
    def get_property(self):
        return []


class CreatePropertyQueries:
    def create(self, property):
        result = {"property_id": 1}
        result.update(property)
        return PropertyOut(
            property_name="Dream",
            property_id=1,
            street="LA",
            city="Pasadena",
            zip="90004",
            state="CA",
            total_members=20,
            food_fee=200.0,
            created_at=datetime.datetime(2024, 2, 1),
            property_picture_url="example.url"
        )


class UpdatePropertyQueries:
    def update(self, property_id, property):
        result = {
            "property_id": 1
        }
        result.update(property)
        return PropertyOut(
            property_name="Dream",
            property_id=1,
            street="LA",
            city="Pasadena",
            zip="90004",
            state="CA",
            total_members=20,
            food_fee=200.0,
            created_at=datetime.datetime(2024, 2, 1),
            property_picture_url="example.url"
        )


class GetPropertyQueries:
    def get(self, property_id):
        return PropertyOut(
            property_name="Dream",
            property_id=1,
            street="LA",
            city="Pasadena",
            zip="90004",
            state="CA",
            total_members=20,
            food_fee=200.0,
            created_at=datetime.datetime(2024, 2, 1),
            property_picture_url="example.url"
        )


def test_create_property():
    app.dependency_overrides[authenticator.get_current_account_data] = fake_authenticator_get_current_account_data
    app.dependency_overrides[PropertyQueries] = CreatePropertyQueries
    response = client.post(
        "/property",
        json={
            "property_name": "Dream",
            "street": "LA",
            "city": "Pasadena",
            "zip": "90004",
            "state": "CA",
            "total_members": 20,
            "food_fee": "200"
        }
    )
    assert response.status_code == 200
    assert response.json() == {
        "property_id": 1,
        "property_name": "Dream",
        "street": "LA",
        "city": "Pasadena",
        "zip": "90004",
        "state": "CA",
        "total_members": 20,
        "food_fee": 200.0,
        "created_at": "2024-02-01T00: 00: 00",
        "property_picture_url": "example.url"
    }


def test_get_property():
    app.dependency_overrides[authenticator.get_current_account_data] = fake_authenticator_get_current_account_data
    app.dependency_overrides[PropertyQueries] = GetPropertyQueries
    response = client.get("/property/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "property_id": 1,
        "property_name": "Dream",
        "street": "LA",
        "city": "Pasadena",
        "zip": "90004",
        "state": "CA",
        "total_members": 20,
        "food_fee": 200.0,
        "created_at": "2024-02-01T00:00:00",
        "property_picture_url": "example.url"
    }


def test_update_property():
    app.dependency_overrides[authenticator.get_current_account_data] = fake_authenticator_get_current_account_data
    app.dependency_overrides[PropertyQueries] = UpdatePropertyQueries
    response = client.put(
        "/property/1",
        json={
            "property_name": "Dream",
            "street": "LA",
            "city": "Pasadena",
            "zip": "90004",
            "state": "CA",
            "total_members": 20,
            "food_fee": "200"
        }
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "property_id": 1,
        "property_name": "Dream",
        "street": "LA",
        "city": "Pasadena",
        "zip": "90004",
        "state": "CA",
        "total_members": 20,
        "food_fee": 200.0,
        "created_at": "2024-02-01T00:00:00",
        "property_picture_url": "example.url"
    }
