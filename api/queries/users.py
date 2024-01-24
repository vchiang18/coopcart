from pydantic import BaseModel
from typing import Optional, Union, List
from datetime import date
from queries.pool import pool
from psycopg.rows import dict_row

class Error(BaseModel):
    message: str

class DuplicateAccountError(BaseModel):
    pass


class UserIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    term_boolean: bool


class UserOut(BaseModel):
    first_name: str
    last_name: str
    email: str
    id: int
    term_boolean: bool

class UserOutMembers(BaseModel):
    first_name: str
    last_name: str
    email: str

#classes w hashed pw, and w property ID
class UserOutWithPw(UserOut):
    hashed_password: str

class UserInWithProperty(UserIn):
    property_id: int


class UserQueries:
    def get_one(self, email:str) -> UserOutWithPw:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM users
                        WHERE email = %s
                        """,
                        [
                            email
                        ]
                    )
                    record=result.fetchone()
                    hashed_password = record[3]
                    first_name = record[0]
                    last_name = record[1]
                    email = record[2]
                    id = record[7]
                    term_boolean = record[4]
                    if id is None:
                        return None
                    return UserOutWithPw(
                        first_name=first_name,
                        last_name=last_name,
                        email=email,
                        id=id,
                        term_boolean=term_boolean,
                        hashed_password=hashed_password)

        except Exception:
            return {"message:" "Get user did not work"}

    def get_one_no_pw(self, id:int) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM users
                        WHERE user_id = %s
                        """,
                        [
                            id
                        ]
                    )
                    record=result.fetchone()
                    print(record)
                    first_name = record[0]
                    last_name = record[1]
                    email = record[2]
                    id = record[7]
                    term_boolean = record[4]
                    if id is None:
                        return None
                    return UserOut(
                        first_name=first_name,
                        last_name=last_name,
                        email=email,
                        id=id,
                        term_boolean=term_boolean)

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
                            email, password_hash, terms_boolean)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING user_id;
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.email,
                            hashed_password,
                            user.term_boolean
                        ]
                    )
                    id = result.fetchone()[0]
                    # data = user.dict()
                    # return UserOut(id=id, **old_data)

                    account_data=user.dict()
                    account_data.pop("password")
                    return UserOut(id=id,**account_data)
                    # return self.user_in_to_out(id, user)

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
                            email
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

    def update(self, user_id: int, user: UserIn) -> UserOut:
        if user_id is None:
            return None
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET first_name = %s,
                            last_name = %s,
                            email = %s,
                            password_hash = %s
                        WHERE user_id = %s
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.email,
                            user.password,
                            user_id
                        ]
                    )
                    return self.user_in_to_out(user_id, user)
        except Exception as e:
            print(e)
            return{"message": "Could not update user"}

    def delete(self, user_id: int) -> bool:
        try:
             with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE user_id = %s
                        """,
                        [user_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
