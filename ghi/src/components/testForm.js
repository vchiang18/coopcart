import React, { useState } from "react";

function SignUpForm() {
  const { login } = useToken();
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    term_boolean: false,
  });

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    setState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!response.ok) throw new Error("Signup failed");
      await login(state.username, state.password);
      alert("Signup and login successfully.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          name="first_name"
          value={state.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={state.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <label>
          <input
            type="checkbox"
            name="term_boolean"
            checked={state.term_boolean}
            onChange={handleChange}
          />
          Accept Terms & Conditions
        </label>
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default TestForm;
