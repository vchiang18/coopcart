import { userEffect, useState } from React;
import { useGetUsersQuery } from './store/usersApi';
import ErrorNotification from './ErrorNotification';

function UserList(){
    const { data, error, isLoading } = useGetUsersQuery();

    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        )
    }

    return (
    <>
      <h1 className="p-3">House Members</h1>
      <ErrorNotification error={error}/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.username}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
    );
}

export default userList;
