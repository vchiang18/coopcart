from pydantic import BaseModel
from queries.pool import pool
from psycopg.rows import dict_row
from fastapi import HTTPException, status


class Error(BaseModel):
    message: str


class ManagerIn(BaseModel):
    property_id: int
    user_id: int


class ManagerOut(BaseModel):
    manager_join_id: int
    property_id: int
    user_id: int


class ManagerQueries:
    def create_manager(self, manager: ManagerIn) -> ManagerOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO managers (property_id, user_id)
                        VALUES (%s, %s)
                        RETURNING manager_join_id;
                        """,
                        (
                            manager.property_id,
                            manager.user_id
                        )
                    )
                    manager_join_id = db.fetchone()[0]
                    return ManagerOut(manager_join_id=manager_join_id, **manager.dict())
        except Exception as e:
            print(e)
            return {"message:" "An Error Occured"}

    def get_manager(self, manager_join_id: int) -> ManagerOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    db.execute(
                        """SELECT * FROM managers WHERE manager_join_id = %s;""",
                        (manager_join_id,)
                    )
                    manager_record = db.fetchone()
                    if manager_record:
                        return ManagerOut(**manager_record)
                    else:
                        return Error(message="Manager not found")
        except Exception as e:
            print(e)
            return {"message:" "An Error Occured"}

    def get_manager_by_km(self, user_id: int) -> ManagerOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    db.execute(
                        """SELECT *
                        FROM managers
                        WHERE user_id = %s;
                        """,
                        (user_id,)
                    )
                    manager_record = db.fetchone()
                    if manager_record:
                        return ManagerOut(**manager_record)
                    else:
                        return Error(message="Manager not found")
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An error occurred"
            )

    def update_manager(self, manager_join_id: int, manager: ManagerIn) -> ManagerOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    db.execute(
                        """
                        UPDATE managers
                        SET property_id = %s, user_id = %s
                        WHERE manager_join_id = %s
                        RETURNING *;
                        """,
                        (
                            manager.property_id,
                            manager.user_id,
                            manager_join_id
                        )
                    )
                    updated_record = db.fetchone()
                    if updated_record:
                        return ManagerOut(**updated_record)
                    else:
                        return Error(message="Manager not found")
        except Exception as e:
            print(e)
            return {"message:" "An Error Occured"}

    def delete_manager(self, manager_join_id: int) -> Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        "DELETE FROM managers WHERE manager_join_id = %s;",
                        (manager_join_id,)
                    )
                    if db.rowcount:
                        return {"message": "Manager deleted successfully"}
                    else:
                        return Error(message="Manager not found or already deleted")
        except Exception:
            return {"message:" "An Error Occured"}
