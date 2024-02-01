from pydantic import BaseModel
from typing import Union, List
from datetime import datetime
from queries.pool import pool
from psycopg.rows import dict_row


class Error(BaseModel):
    message: str


class RequestIn(BaseModel):
    item: str
    brand: str
    unit_quantity: int
    unit_type: str
    requestor: int
    quantity: int


class RequestOut(BaseModel):
    request_id: int
    item: str
    brand: str
    unit_quantity: int
    unit_type: str
    requestor: int
    created_date: datetime
    status: str
    quantity: int
    last_edited_by: str | None
    last_edited: datetime | None


class RequestRepository:
    def get_all(self) -> Union[Error, List[RequestOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            request_id,
                            item,
                            brand,
                            unit_quantity,
                            unit_type,
                            requestor,
                            created_date,
                            status,
                            quantity,
                            last_edited_by,
                            last_edited
                        FROM requests
                        ORDER BY created_date;
                        """
                    )
                    return [
                        self.record_to_request_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message:" "Could not get all requests"}

    def create(self, request: RequestIn) -> Union[RequestOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO requests
                            (item, brand, unit_quantity, unit_type, requestor, quantity)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING request_id;
                        """,
                        [
                            request.item,
                            request.brand,
                            request.unit_quantity,
                            request.unit_type,
                            request.requestor,
                            request.quantity
                        ]
                    )
                    request_id = db.fetchone()[0]
                    created_date = datetime.now()
                    status = "New"
                    return RequestOut(request_id=request_id, created_date=created_date, status=status, **request.dict())
        except Exception as e:
            print(e)
            return {"message:" "Could not create request"}

    def update(self, request_id: int, request: RequestIn) -> RequestOut:
        if request_id is None:
            return None
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    record = db.execute(
                        """
                        UPDATE requests
                        SET item = %s,
                            brand = %s,
                            unit_quantity = %s,
                            unit_type = %s,
                            requestor = %s,
                            quantity = %s
                        WHERE request_id = %s
                        RETURNING *;

                        """,
                        [
                            request.item,
                            request.brand,
                            request.unit_quantity,
                            request.unit_type,
                            request.requestor,
                            request.quantity,
                            request_id
                        ]
                    )
                    result = record.fetchone()
                    return self.request_in_to_out(result)
        except Exception as e:
            print(e)
            return {"message:" "Could not update the request"}

    def delete(self, request_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM requests
                        WHERE request_id = %s
                        """,
                        [request_id]
                    )
                    return True
        except Exception:
            return False

    def request_in_to_out(self, request: RequestIn):
        try:
            old_data = request
            return RequestOut(**old_data)
        except Exception as e:
            print(e)

    def record_to_request_out(self, record):
        return RequestOut(
            request_id=record[0],
            item=record[1],
            brand=record[2],
            unit_quantity=record[3],
            unit_type=record[4],
            requestor=record[5],
            created_date=record[6],
            status=record[7],
            quantity=record[8],
            last_edited_by=record[9],
            last_edited=record[10],
        )
