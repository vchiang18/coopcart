import React, { useState, useEffect } from "react";
import "./signin.css";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const { token, login } = useToken();
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      alert("Login successful");
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    console.log("got here");
    e.preventDefault();
    if (!state.username.trim() || !state.password.trim()) {
      alert("Username and password cannot be empty");
      return;
    }
    await login(state.username, state.password).catch(() => {
      alert("Login failed, please check your username and password");
    });
  };

  return (
    <div className="sign-in-form-container">
      <form onSubmit={(e) => handleOnSubmit(e)} className="sign-in-form">
        <h1>Sign in</h1>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={(e) => handleChange(e)}
          placeholder="Username"
          className="sign-in-input"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={(e) => handleChange(e)}
          placeholder="Password"
          className="sign-in-input"
        />
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
