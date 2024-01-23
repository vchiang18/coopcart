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


# classes w hashed pw, and w property ID
class UserOutWithPw(UserOut):
    hashed_password: str


class UserQueries:
    def get_one(self, email: str) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM users
                        WHERE email = %s
                        """,
                        [email],
                    )
                    record = result.fetchone()
                    hashed_password = record[3]
                    first_name = record[0]
                    last_name = record[1]
                    email_field = record[2]
                    id = record[7]
                    term_boolean = record[4]

                    return UserOutWithPw(
                        hashed_password=hashed_password,
                        first_name=first_name,
                        last_name=last_name,
                        email=email_field,
                        id=id,
                        term_boolean=term_boolean,
                    )
        except Exception:
            return {"message:" "Get user did not work"}

    def create(
        self, user: UserIn, hashed_password: str
    ) -> Union[UserOutWithPw, Error]:
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
                            user.term_boolean,
                        ],
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
