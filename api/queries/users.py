from pydantic import BaseModel
from typing import Optional, Union
from datetime import date
from queries.pool import pool


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

#classes w hashed pw, and w property ID
class UserOutWithPw(UserOut):
    password_hash: str


class UserQueries:
    def get_one(self, email:str) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute (
                        """
                        SELECT *
                        FROM users
                        WHERE email = %s
                        """,
                        [
                            email
                        ]
                    )
                    id = result.fetchone()
                    if id is None:
                        return None
                    #fetchone, turn data into dict (like old_data = user.dict())
                    return self.user_in_to_out(email)
        except Exception:
            return {"message:" "Get user did not work"}


    def create(self, user: UserIn, password: str) -> Union[UserOutWithPw, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            ()
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.email,
                            user.password,
                            user.term_boolean
                        ]
                    )
                    id = result.fetchone()[0]
                    # old_data = user.dict()
                    # return UserOut(id=id, **old_data)
                    return self.user_in_to_out(id, user)

        except Exception:
            return {"message:" "Create did not work"}

    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)
