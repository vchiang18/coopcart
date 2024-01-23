from pydantic import BaseModel, Field
from typing import Optional, Union
from datetime import datetime
from decimal import Decimal
from queries.pool import pool  
from psycopg.rows import dict_row


class Error(BaseModel):
    message: str


class PropertyIn(BaseModel):
    street: str
    city: str
    zip: str
    state: str
    total_members: Optional[int] = None
    food_fee: str
    property_picture_url: Optional[str] = None


class PropertyOut(BaseModel):
    property_id: int
    street: str
    city: str
    zip: str
    state: str
    total_members: Optional[int]
    food_fee: str
    created_at: datetime
    property_picture_url: Optional[str]


class PropertyQueries:
    def create(self, property: PropertyIn) -> Union[PropertyOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    curr = db.execute(
                        """
                        INSERT INTO properties (street, city, zip, state, total_members, food_fee, property_picture_url)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING property_id, created_at; 
                        """,
                        (
                            property.street,
                            property.city,
                            property.zip,
                            property.state,
                            property.total_members,
                            property.food_fee,
                            property.property_picture_url
                        )
                    )
                    properties = curr.fetchone()
                    return PropertyOut(property_id=properties[0], created_at=properties[1], **property.dict())
        except Exception:
            return {"message:" "Create did not work"}


    def get(self, property_id: int) -> Union[PropertyOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    db.execute("SELECT * FROM properties WHERE property_id = %s;", (property_id,))
                    property_record = db.fetchone()
                    print(property_record)
                    if property_record:
                        return PropertyOut(**property_record)
                    else:
                        return Error(message="Property not found")
        except Exception:
            return {"message:" "An Error Occured"}


    def update(self, property_id: int, property: PropertyIn) -> Union[PropertyOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    db.execute(
                        """
                        UPDATE properties
                        SET street = %s, city = %s, zip = %s, state = %s, total_members = %s, food_fee = %s, property_picture_url = %s
                        WHERE property_id = %s
                        RETURNING *;
                        """,
                        (
                            property.street,
                            property.city,
                            property.zip,
                            property.state,
                            property.total_members,
                            property.food_fee,
                            property.property_picture_url,
                            property_id
                        )
                    )
                    updated_record = db.fetchone()
                    if updated_record:
                        return PropertyOut(**updated_record)
                    else:
                        return Error(message="Property not found")
        except Exception as e:
            print(e)
            return {"message:" "An Error Occured"}


    def get_all_properties(self):
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as cur:
                    cur.execute("SELECT * FROM properties;")
                    properties = cur.fetchall()
                    print(properties)
                    property1 = [PropertyOut(**property) for property in properties]
                    print(property1)
                    return property1
        except Exception as e: 
            print(e)
            return {"message:" "An Error Occured"}
        




