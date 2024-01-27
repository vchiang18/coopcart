import React, { useState } from "react";
import './signup.css';
import useToken from "@galvanize-inc/jwtdown-for-react";

function SignInForm() {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const {login} = useToken()
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    try {
      // const response = await fetch('http://localhost:8000/token', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(state)
      // });
      const response = login(state.username, state.password)
      if (!response.ok) throw new Error('Login failed');
      alert('Login successful');
      setState({ username: "", password: "" });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <input type="username" name="username" value={state.username} onChange={handleChange} placeholder="Username" />
        <input type="password" name="password" value={state.password} onChange={handleChange} placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
