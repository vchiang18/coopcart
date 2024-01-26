import React, { useState } from "react";
import './signup.css'

function SignUpForm() {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    term_boolean: false
  });

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    setState({
      ...state,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });
      if (!response.ok) throw new Error('Signup failed');
      alert('Signup successful');
      setState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        term_boolean: false
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <input type="text" name="first_name" value={state.first_name} onChange={handleChange} placeholder="First Name" />
        <input type="text" name="last_name" value={state.last_name} onChange={handleChange} placeholder="Last Name" />
        <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={state.password} onChange={handleChange} placeholder="Password" />
        <label>
          <input type="checkbox" name="term_boolean" checked={state.term_boolean} onChange={handleChange} />
          Accept Terms & Conditions
        </label>
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
