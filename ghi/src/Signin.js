import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import './signin.css'

function SignInForm() {
  const { login } = useToken();
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await login(state.username, state.password);
      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };


  return (
    <div className="sign-in-form-container">
      <form onSubmit={handleOnSubmit} className= "sign-in-form">
        <h1>Sign in</h1>
        <input
          type="username"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Username"
          className="sign-in-input"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          className="sign-in-input"
        />
        <button className="sign-in-form-button">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
