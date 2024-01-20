import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UserQueries, UserOut, UserOutWithPw


class UserAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: UserQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get_one(email)

    def get_account_getter(
        self,
        accounts: UserQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: UserOutWithPw):
        # Return the encrypted password value from your
        # account object
        return account.hashed_password

    def get_account_data_for_cookie(self, account: UserOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.email, UserOut(**account.dict())


authenticator = UserAuthenticator(os.environ.get("SIGNING_KEY"))
