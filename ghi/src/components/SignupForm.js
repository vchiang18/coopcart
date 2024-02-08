import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function TestForm() {
  const { login } = useToken();
  const [signup, setSignup] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    terms_boolean: false,
  });

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignup((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log("signup: ", signup);

    try {
      const url = `${process.env.REACT_APP_API_HOST}/user`;
      const fetchConfig = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      };
      const response = await fetch(url, fetchConfig);
      console.log("response: ", response);

      if (!response.ok) throw new Error("Signup failed");
      await login(signup.username, signup.password);
      alert("Signup and login successful.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignupSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          name="first_name"
          value={signup.first_name}
          onChange={handleSignupChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={signup.last_name}
          onChange={handleSignupChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="username"
          value={signup.username}
          onChange={handleSignupChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={signup.password}
          onChange={handleSignupChange}
          placeholder="Password"
        />
        <label>
          <input
            type="checkbox"
            name="terms_boolean"
            checked={signup.terms_boolean}
            onChange={handleSignupChange}
          />
          Accept Terms & Conditions
        </label>
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default TestForm;
