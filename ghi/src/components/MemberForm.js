import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function MemberForm() {
  // signup form state and logic
  const { login } = useToken();
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    terms_boolean: false,
  });

  const handleMemberChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignup((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();

    // post for create user
    try {
      const url = `${process.env.REACT_APP_API_HOST}/user`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });
      if (!response.ok) throw new Error("Signup failed");
      await login(signup.username, signup.password);
      alert("Signup and login successful");
      navigate("/property/add");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container margin-bottom">
        <form onSubmit={handleMemberSubmit}>
          <h2>Create Member Login</h2>
          <input
            type="text"
            name="first_name"
            value={signup.first_name}
            onChange={handleMemberChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="last_name"
            value={signup.last_name}
            onChange={handleMemberChange}
            placeholder="Last Name"
            required
          />
          <input
            type="text"
            name="username"
            value={signup.username}
            onChange={handleMemberChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={signup.password}
            onChange={handleMemberChange}
            placeholder="Password"
            required
          />
          <label>
            <input
              type="checkbox"
              name="terms_boolean"
              onChange={handleMemberChange}
              checked={signup.terms_boolean}
              required
            />
            Accept Terms & Conditions
          </label>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default MemberForm;
