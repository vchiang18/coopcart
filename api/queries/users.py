from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool
from psycopg.rows import dict_row


class Error(BaseModel):
    message: str


class DuplicateAccountError(BaseModel):
    pass


class UserIn(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str


class UserOut(BaseModel):
    first_name: str
    last_name: str
    username: str
    id: int


class UserInEdit(BaseModel):
    first_name: str
    last_name: str
    username: str
    is_km: Optional[bool]
    property: Optional[int]


class UserOutEdit(UserOut):
    is_km: Optional[bool]
    property: Optional[int]


class UserOutMembers(BaseModel):
    first_name: str
    last_name: str
    username: str


class UserOutWithPw(UserOut):
    hashed_password: str


class UserQueries:
    def get_one(self, username: str) -> UserOutWithPw:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            first_name,
                            last_name,
                            username,
                            password,
                            user_id
                        FROM users
                        WHERE username = %s
                        """,
                        [
                            username
                        ]
                    )
                    record = result.fetchone()
                    print("record: ", record)
                    first_name = record[0]
                    last_name = record[1]
                    username = record[2]
                    hashed_password = record[3]
                    id = record[4]
                    if id is None:
                        return None
                    return UserOutWithPw(
                        first_name=first_name,
                        last_name=last_name,
                        username=username,
                        id=id,
                        hashed_password=hashed_password)

        except Exception:
            return {"message:" "Get user did not work"}

    def get_one_no_pw(self, id: int) -> UserOutEdit:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    result = db.execute(
                        """
                        SELECT first_name,
                            last_name,
                            username,
                            user_id,
                            is_km,
                            property
                        FROM users
                        WHERE user_id = %s
                        """,
                        [
                            id
                        ]
                    )
                    data = result.fetchone()
                    return UserOutEdit(id=id, **data)
        except Exception:
            return {"message:" "Get user did not work"}

    def create(self, user: UserIn, hashed_password: str) -> Union[UserOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (first_name,
                            last_name,
                            username, password)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING user_id;
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.username,
                            hashed_password,
                        ]
                    )
                    id = result.fetchone()[0]
                    account_data = user.dict()
                    account_data.pop("password")
                    return UserOut(id=id, **account_data)

        except Exception:
            return {"message:" "Create did not work"}

    def user_in_to_out(self, id: int, user: UserIn):
        data = user.dict()
        return UserOut(id=id, **data)

    def get_all(self, property_id: int) -> List[UserOutMembers]:
        if property_id is None:
            return None
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    curr = db.execute(
                        """
                        SELECT
                            first_name,
                            last_name,
                            username
                        FROM users
                        WHERE property = %s
                        ORDER BY last_name;
                        """,
                        [
                            property_id
                        ]
                    )
                    result = curr.fetchall()
                    return [UserOutMembers(**row) for row in result]

        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

    def update(self, user_id: int, user: UserInEdit) -> UserOutEdit:
        if user_id is None:
            return None
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    result = db.execute(
                        """
                        UPDATE users
                        SET first_name = %s,
                            last_name = %s,
                            username = %s,
                            is_km = %s,
                            property = %s
                        WHERE user_id = %s
                        RETURNING first_name,
                            last_name,
                            username,
                            is_km,
                            property,
                            user_id;
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.username,
                            user.is_km,
                            user.property,
                            user_id
                        ]
                    )
                    data = result.fetchone()
                    return UserOutEdit(id=user_id, **data)
        except Exception as e:
            print(e)
            return {f"Could not update user. An error occurred: {e}"}
