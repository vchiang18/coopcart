from pydantic import BaseModel
from typing import Union, List
from queries.pool import pool
from psycopg.rows import dict_row


class Error(BaseModel):
    message: str


class BrandIn(BaseModel):
    name: str
    logo_url: str


class BrandOut(BaseModel):
    name: str
    logo_url: str
    brand_id: int


class BrandQueries:
    def create(self, brand: BrandIn) -> Union[BrandOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    curr = db.execute(
                        """
                        INSERT INTO brands (
                        name,
                        logo_url
                        )
                        VALUES (%s, %s)
                        RETURNING brand_id;
                        """,
                        [
                            brand.name,
                            brand.logo_url
                        ]
                    )
                    id = curr.fetchone()["brand_id"]
                    return BrandOut(brand_id=id, **brand.dict())
        except Exception as e:
            print(e)
            return {"message:" "Create did not work"}

    def get_one(self, brand_id: int) -> BrandOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    curr = db.execute(
                        """
                        SELECT *
                        FROM brands
                        where brand_id = %s
                        """,
                        [
                            brand_id
                        ]
                    )
                    record = curr.fetchone()
                    return BrandOut(**record)
        except Exception as e:
            print(e)
            return {"message:" "Get brand did not work"}

    def get_all(self) -> List[BrandOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    curr = db.execute(
                        """
                        SELECT *
                        FROM brands
                        ORDER BY name;
                        """
                    )
                    result = curr.fetchall()
                    return [BrandOut(**row) for row in result]
        except Exception as e:
            print(e)
            return {"message": "Could not get all brands"}

    def update(self, brand_id: int, brand: BrandIn) -> BrandOut:
        if brand_id is None:
            return None
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    db.execute(
                        """
                        UPDATE brands
                        SET name = %s,
                            logo_url = %s
                        WHERE brand_id = %s
                        """,
                        [
                            brand.name,
                            brand.logo_url,
                            brand_id
                        ]
                    )
                    return self.brand_in_to_out(brand_id, brand)
        except Exception as e:
            print(e)
            return {"message": "Could not update brand"}

    def delete(self, brand_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE user_id = %s
                        """,
                        [brand_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def brand_in_to_out(self, brand_id: int, brand: BrandIn):
        data = brand.dict()
        return BrandOut(brand_id=brand_id, **data)
