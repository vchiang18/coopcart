from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool
from psycopg.rows import dict_row


class Error(BaseModel):
    message: str


class FoodItemIn(BaseModel):
    item_name: str
    brand: int
    vendor: int
    unit_type: str
    unit_quantity: int
    price: float


class FoodItemOut(BaseModel):
    item_name: str
    brand: int
    vendor: int
    unit_type: str
    unit_quantity: int
    price: float
    food_item_id: int


class FoodItemQueries:
    def create(self, food_items: FoodItemIn) -> Union[Error, FoodItemOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO food_items
                            (item_name,
                            brand, vendor,
                            unit_type,
                            unit_quantity,
                            price)
                        VALUES (%s, %s, %s, %s, %s, %s::numeric::money)
                        RETURNING food_item_id, price
                        """,
                        [
                            food_items.item_name,
                            food_items.brand,
                            food_items.vendor,
                            food_items.unit_type,
                            food_items.unit_quantity,
                            food_items.price
                        ]
                    )
                    result = db.fetchone()
                    if result is not None:
                        food_item_id = result[0]
                        return self.food_item_in_to_out(food_item_id, food_items)
                    else:
                        return {"message": "Could not create that food item"}
        except Exception as e:
            return Error(message=str(e))

    def get(self, food_item_id: int) -> Union[Error, FoodItemOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            item_name,
                            brand,
                            vendor,
                            unit_type,
                            unit_quantity,
                            price::money::numeric::float8
                        FROM food_items
                        WHERE food_item_id = %s
                        """,
                        [food_item_id]
                    )
                    result = db.fetchone()
                    food_item = FoodItemIn(item_name=result[0], brand=result[1], vendor=result[2], unit_type=result[3], unit_quantity=result[4], price=result[5])
                    if result is None:
                        return {"message": "No food item with that id"}
                    return self.food_item_in_to_out(food_item_id, food_item)
        except Exception as e:
            return Error(message=str(e))

    def get_all(self) -> Union[Error, List[FoodItemOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    db.execute(
                        """
                        SELECT
                            item_name,
                            brand,
                            vendor,
                            unit_type,
                            unit_quantity,
                            price::money::numeric::float8,
                            food_item_id
                        FROM food_items
                        ORDER BY item_name;
                        """,
                    )
                    result = db.fetchall()
                    if result is None:
                        return {"message": "No food items"}
                    return [FoodItemOut(**row) for row in result]
        except Exception as e:
            return Error(message=str(e))

    def update(self, food_item_id: int, food_items: FoodItemIn) -> Union[Error, FoodItemOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE food_items
                        SET
                            item_name = %s,
                            brand = %s,
                            vendor = %s,
                            unit_type = %s,
                            unit_quantity = %s,
                            price = %s::numeric::money
                        WHERE food_item_id = %s
                        """,
                        [
                            food_items.item_name,
                            food_items.brand,
                            food_items.vendor,
                            food_items.unit_type,
                            food_items.unit_quantity,
                            food_items.price,
                            food_item_id
                        ]
                    )
                    return self.food_item_in_to_out(food_item_id, food_items)
        except Exception as e:
            return Error(message=str(e))

    def delete(self, food_item_id: int) -> Union[Error, FoodItemOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM food_items WHERE food_item_id = %s
                        """,
                        [food_item_id]
                    )
                    return {"message": "Food item deleted"}
        except Exception as e:
            return Error(message=str(e))

    def food_item_in_to_out(self, food_item_id: int, food_items: FoodItemIn):
        old_data = food_items.dict()
        return FoodItemOut(food_item_id=food_item_id, **old_data)
