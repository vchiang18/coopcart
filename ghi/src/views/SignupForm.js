import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function LoginForm() {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        termsBoolean: false,
        isKM: false
    });

    const { login } = useToken();
    const { token } = useAuthContext();

    console.log(token);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setState({
            ...state,
            [name]: type === "checkbox" ? checked : value
        });
    };


  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    e.target.reset();

    const url = "http://localhost:8000/user";
    const data = {};

    data.username = username;
    data.password = password;
    data.first_name = firstName;
    data.last_name = lastName;
    data.terms_boolean = termsBoolean;
    data.is_km = isKM;

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const
      }
    }

  };

  return (
    <div clasName="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Sign In</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              name="username"
              placeholder="email"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
