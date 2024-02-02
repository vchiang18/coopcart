import React, { useState, useEffect } from "react";
// import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function UserDetail() {
  const [user, setUser] = useState();
  //   const { token } = useAuthContext();

  //   console.log(token);

  return (
    <>
      <p>Hello!</p>
      <table>
        <thead>My User Info</thead>
        <tbody>
          <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.username}</td>
            <td>Been member since {user.created_date}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default UserDetail;

//   const getUser = async () => {
//     const url = "http://localhost:8000/user";
//     try {
//       const response = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setUser(data.user);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   if (user === undefined) {
//     return null;
//   }
