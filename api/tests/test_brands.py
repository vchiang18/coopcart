from fastapi.testclient import TestClient
from main import app
from queries.brands import BrandQueries

client = TestClient(app)


class CreateBrandQueries:
    def create(self, brand):
        result = {
            "name": "Living Tree",
            "logo_url": "https://www.livingtreecommunityfoods.com/sites/default/files/styles/product_image_product_page/public/2020-11/CashewButter16oz1120.jpg?itok=GZl4a5zk",
            "brand_id": 11
        }
        result.update()
        return result


class EmptyBrandQuery:
    def get_one(self, brand_id):
        result = {
            "name": "Living Tree",
            "logo_url": "https://www.livingtreecommunityfoods.com/sites/default/files/styles/product_image_product_page/public/2020-11/CashewButter16oz1120.jpg?itok=GZl4a5zk",
            "brand_id": 11
        }
        return result


class EmptyBrandQueries:
    def get_all(self):
        return []


class EditBrandQuery:
    def update(self, *args, **kwargs):
        result = {
            "name": "Living Tree 2",
            "logo_url": "https://www.livingtreecommunityfoods.com/sites/default/files/styles/product_image_product_page/public/2020-11/CashewButter16oz1120.jpg?itok=GZl4a5zk",
            "brand_id": 11
        }
        return result


def test_edit():
    app.dependency_overrides[BrandQueries] = EditBrandQuery
    brand_id = 11
    updated_data = {"name": "Living Tree 2",
                    "logo_url": "https://www.livingtreecommunityfoods.com/sites/default/files/styles/product_image_product_page/public/2020-11/CashewButter16oz1120.jpg?itok=GZl4a5zk"
                    }
    expected = {
        "name": "Living Tree 2",
        "logo_url": "https://www.livingtreecommunityfoods.com/sites/default/files/styles/product_image_product_page/public/2020-11/CashewButter16oz1120.jpg?itok=GZl4a5zk",
        "brand_id": 11
    }
    response = client.put(f"/brands/{brand_id}", json=updated_data)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_create():
    app.dependency_overrides[BrandQueries] = CreateBrandQueries
    brand_sample = {
        "name": "Living Tree",
        "logo_url": "https://www.livingtreecommunityfoods.com/sites/default/files/styles/product_image_product_page/public/2020-11/CashewButter16oz1120.jpg?itok=GZl4a5zk",
    }
    expected = {
        "name": "Living Tree",
        "logo_url": "https://www.livingtreecommunityfoods.com/sites/default/files/styles/product_image_product_page/public/2020-11/CashewButter16oz1120.jpg?itok=GZl4a5zk",
        "brand_id": 11
    }
    response = client.post("/brand", json=brand_sample)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_get_one():
    app.dependency_overrides[BrandQueries] = EmptyBrandQuery
    brand_id = 11
    expected = {
        "name": "Living Tree",
        "logo_url": "https://www.livingtreecommunityfoods.com/sites/default/files/styles/product_image_product_page/public/2020-11/CashewButter16oz1120.jpg?itok=GZl4a5zk",
        "brand_id": 11
    }
    response = client.get(f"/brands/{brand_id}")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_get_all():
    app.dependency_overrides[BrandQueries] = EmptyBrandQueries
    response = client.get("/brands")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
