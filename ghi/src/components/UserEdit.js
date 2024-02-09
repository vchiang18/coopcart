import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function UserEdit() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [isKM, setIsKM] = useState("");
  const [property, setProperty] = useState("");
  const { token } = useAuthContext();
  const [submitted, setSubmitted] = useState(false);

  const getUser = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/user`;
    const fetchOptions = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (token) {
        try {
          const response = await fetch(url, fetchOptions);
          if (response.ok) {
            const data = await response.json();
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setUsername(data.username);
            setIsKM(data.is_km);
            setProperty(data.property);
          }
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [token]);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const submittedMessage = submitted
    ? "alert alert-success mb-0"
    : "alert alert-success d-none mb-0";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_HOST}/user`;

    const data = {};
    data.first_name = firstName;
    data.last_name = lastName;
    data.username = username;
    data.terms_boolean = true;
    data.is_km = isKM;
    data.property = property;

    const fetchOptions = {
      method: "PUT",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (token) {
        try {
          const response = await fetch(url, fetchOptions);
          if (response.ok) {
            await response.json();
            setSubmitted(true);
            e.target.reset();
          }
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>My User Info</h1>
            <form onSubmit={handleSubmit} id="user-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleFirstNameChange}
                  placeholder="first name"
                  required
                  value={firstName}
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="form-control"
                />
                <label htmlFor="first_name">First Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handleLastNameChange}
                  placeholder="last name"
                  required
                  type="text"
                  value={lastName}
                  name="last_name"
                  id="last_name"
                  className="form-control"
                />
                <label htmlFor="last_name">Last Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handleUsernameChange}
                  placeholder="email"
                  required
                  type="text"
                  value={username}
                  name="username"
                  id="username"
                  className="form-control"
                />
                <label htmlFor="employee_id">Email</label>
              </div>
              <button className="btn btn-primary mb-3">Submit</button>
            </form>
            <div className={submittedMessage}>Success! Details updated.</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserEdit;
