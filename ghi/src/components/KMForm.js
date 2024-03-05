import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function KMForm() {
  // signup form state and logic
  const { login } = useToken();
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({
      ...prev,
      [name]: value,
      is_km: true,
    }));
  };

  const handleSubmit = async (e) => {
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
      navigate("/property/create");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container margin-bottom">
        <form onSubmit={handleSubmit}>
          <h3>Create Your Kitchen Manager Account</h3>
          <input
            type="text"
            name="first_name"
            value={signup.first_name}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="last_name"
            value={signup.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            type="text"
            name="username"
            value={signup.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={signup.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default KMForm;
