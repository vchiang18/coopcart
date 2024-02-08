import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function MemberForm() {
  // console.log("signup prop: ", signup);
  // console.log("properties: ", properties);
  // console.log("signup.properties: ", signup.properties);

  // // signup form state and logic
  const { login } = useToken();
  const [signup, setSignup] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    terms_boolean: false,
  });
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState("");

  const getProperties = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/properties`;
    try {
      const response = await fetch(url);
      // console.log("get properties response:", response);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setProperties(data);
        console.log("properties: ", properties);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const handleMemberChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignup((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log("user signup change: ", signup);

    if (name === "newProperty") {
      setNewProperty(value);
    }
    console.log("property on change: ", newProperty);
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
    } catch (error) {
      alert(error.message);
    }

    // // put for add property to user
    try {
      const url = `${process.env.REACT_APP_API_HOST}/user`;

      const data = {
        first_name: signup.first_name,
        last_name: signup.last_name,
        username: signup.username,
        terms_boolean: signup.terms_boolean,
        property: newProperty,
      };

      console.log("updated data: ", data);

      const fetConfig = {
        method: "PUT",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, fetConfig);
      if (response.ok) {
        const addProperty = await response.json();
        setNewProperty("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="container margin-bottom">
        {properties === undefined ? null : (
          <form onSubmit={handleMemberSubmit}>
            <h2>1. Create Your Login</h2>
            <input
              type="text"
              name="first_name"
              value={signup.first_name}
              onChange={handleMemberChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="last_name"
              value={signup.last_name}
              onChange={handleMemberChange}
              placeholder="Last Name"
            />
            <input
              type="text"
              name="username"
              value={signup.username}
              onChange={handleMemberChange}
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              value={signup.password}
              onChange={handleMemberChange}
              placeholder="Password"
            />
            <label>
              <input
                type="checkbox"
                name="terms_boolean"
                onChange={handleMemberChange}
                checked={signup.terms_boolean}
              />
              Accept Terms & Conditions
            </label>
            <h2>2. Select Your Coop</h2>
            <p>If you don't see your coop in this list, please add it below</p>
            <div className="form-floating mb-3">
              <select onChange={handleMemberChange}>
                <option>Choose Property</option>
                {properties.map((property) => {
                  return (
                    <option
                      key={property.property_id}
                      value={property.property_id}
                    >
                      {property.property_name}, {property.street},{" "}
                      {property.state}
                    </option>
                  );
                })}
              </select>
            </div>
            <button>Submit</button>
          </form>
        )}
      </div>
    </>
  );
}

export default MemberForm;
