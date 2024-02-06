import React, { useState } from "react";
import "../signup.css";

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

    if (!state.term_boolean) {
      alert("You must accept the terms and conditions to sign up. ");
      return;
    }

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
      <form>
        <h2>1. Create Your Login</h2>
        <input
          type="text"
          name="first_name"
          value={signup.first_name}
          onChange={onChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={signup.last_name}
          onChange={onChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="username"
          value={signup.username}
          onChange={onChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={signup.password}
          onChange={onChange}
          placeholder="Password"
        />
        <label>
          <input
            type="checkbox"
            name="term_boolean"
            onChange={onChange}
            checked={signup.term_boolean}
          />
          Accept Terms & Conditions
        </label>
      </form>
    </div>
  );
}

export default SignUpForm;
