from pydantic import BaseModel
from typing import Union, List
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class RequestIn(BaseModel):
    item: str
    brand: str
    unit_quantity: int
    unit_type: str
    requestor: str
    quantity: int


class RequestOut(BaseModel):
    request_id: str
    item: str
    brand: str
    unit_quantity: int
    unit_type: str
    requestor: str
    created_date: date
    status: str
    quantity: int
    last_edited_by: str
    last_edited: date


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
        except Exception:
            return {"message:" "Could not get all requests"}

    def create(self, request: RequestIn) -> Union[RequestOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO requests
                            (item,
                            brand,
                            unit_quantity,
                            unit_type,
                            requestor,
                            quantity)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING request id;
                        """,
                        [
                            request.item,
                            request.brand,
                            request.unit_quantity,
                            request.unit_type,
                            request.requestor,
                            request.created_date,
                            request.status,
                            request.quantity,
                            request.last_edited_by,
                            request.last_edited
                        ]
                    )
                    request_id = result.fetchone()[0]
                    return self.request_in_to_out(request_id, request)
        except Exception:
            return {"message:" "Could not create request"}

    def update(self, request_id: int, request: RequestIn) -> Union[RequestOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE requests
                        SET item = %s,
                            brand = %s,
                            unit_quantity = %s,
                            unit_type = %s,
                            quantity = %s
                        WHERE request_id = %s
                        """,
                        [
                            request.item,
                            request.brand,
                            request.unit_quantity,
                            request.unit_type,
                            request.quantity
                        ]
                    )
                    return self.request_in_to_out(request_id, request)
        except Exception:
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

    def request_in_to_out(self, request_id: int, request: RequestIn):
        old_data = request.dict()
        return RequestOut(request_id=request_id, **old_data)

    def record_to_request_out(self, record):
        return RequestOut(
            request_id=record[1],
            item=record[2],
            brand=record[3],
            unit_quantity=record[4],
            unit_type=record[5],
            requestor=record[6],
            created_date=record[7],
            status=record[8],
            quantity=record[9],
            last_edited_by=record[10],
            last_edited=record[11],
        )
