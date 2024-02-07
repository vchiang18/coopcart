import React, { useState } from "react";
import "../signup.css";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const { login } = useToken();
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(state.username, state.password);
      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <h1>Sign in</h1>
        <input
          type="username"
          name="username"
          value={state.username}
          onChange={(e) => handleChange(e)}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={(e) => handleChange(e)}
          placeholder="Password"
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
