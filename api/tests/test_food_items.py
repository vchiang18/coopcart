# from fastapi import FastAPI
from fastapi.testclient import TestClient
from main import app
from queries.food_items import FoodItemQueries


client = TestClient(app)

class EmptyFoodItemQueries:
    def get_food_items(self):
        return []

class CreateFoodItemQueries:
    def create(self, food_item):
        result = {"food_item_id": 1}

        result.update(food_item)
        return result

def get_all_food_items():
    app.dependency_overrides[FoodItemQueries] = EmptyFoodItemQueries

    response = client.get("/food_items")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"food_items": []}

def test_create_food_item():
    app.dependency_overrides[FoodItemQueries] = CreateFoodItemQueries
    response = client.post(
        "/food_item",
        json={
            "item_name": "test item",
            "brand": 1,
            "vendor": 1,
            "unit_type": "test unit",
            "unit_quantity": 1,
            "price": 1.00
        }
    )

    assert response.status_code == 200
    assert response.json() == {
        "item_name": "test item",
        "brand": 1,
        "vendor": 1,
        "unit_type": "test unit",
        "unit_quantity": 1,
        "price": 1.00,
        "food_item_id": 1
    }


def test_init():
    assert 1 == 1



# def test_init_food_items():
#     food_items = FoodItems()
#     assert food_items.food_items == []
