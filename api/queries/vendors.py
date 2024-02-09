from pydantic import BaseModel
from typing import Union, List
from queries.pool import pool
from psycopg.rows import dict_row


class Error(BaseModel):
    message: str


class VendorIn(BaseModel):
    name: str
    logo_url: str


class VendorOut(BaseModel):
    name: str
    logo_url: str
    vendor_id: int


class VendorQueries:
    def create(self, vendor: VendorIn) -> Union[VendorOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    curr = db.execute(
                        """
                        INSERT INTO vendors (
                        name,
                        logo_url
                        )
                        VALUES (%s, %s)
                        RETURNING vendor_id;
                        """,
                        [
                            vendor.name,
                            vendor.logo_url
                        ]
                    )
                    id = curr.fetchone()["vendor_id"]
                    return VendorOut(vendor_id=id, **vendor.dict())
        except Exception as e:
            print(e)
            return {"message:" "Create did not work"}

    def get_one(self, vendor_id: int) -> VendorOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    curr = db.execute(
                        """
                        SELECT *
                        FROM vendors
                        where vendor_id = %s
                        """,
                        [
                            vendor_id
                        ]
                    )
                    record = curr.fetchone()
                    print(record)
                    return VendorOut(**record)
        except Exception as e:
            print(e)
            return {"message:" "Get vendor did not work"}

    def get_all(self) -> List[VendorOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    curr = db.execute(
                        """
                        SELECT *
                        FROM vendors
                        ORDER BY name;
                        """
                    )
                    result = curr.fetchall()
                    return [VendorOut(**row) for row in result]
        except Exception as e:
            print(e)
            return {"message": "Could not get all vendors"}

    def update(self, vendor_id: int, vendor: VendorIn) -> VendorOut:
        if vendor_id is None:
            return None
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    db.execute(
                        """
                        UPDATE vendors
                        SET name = %s,
                            logo_url = %s
                        WHERE vendor_id = %s
                        """,
                        [
                            vendor.name,
                            vendor.logo_url,
                            vendor_id
                        ]
                    )
                    return self.vendor_in_to_out(vendor_id, vendor)
        except Exception as e:
            print(e)
            return {"message": "Could not update vendor"}

    def delete(self, vendor_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM vendors
                        WHERE vendor_id = %s
                        """,
                        [vendor_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def vendor_in_to_out(self, vendor_id: int, vendor: VendorIn):
        data = vendor.dict()
        return VendorOut(vendor_id=vendor_id, **data)
