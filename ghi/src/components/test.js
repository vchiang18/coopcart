// signupproperty page before messing w it - 6pm

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import PropertyForm from "./PropertyForm.js";
import MemberForm from "./MemberForm.js";
import "../SignupProperty.css";
import useToken from "@galvanize-inc/jwtdown-for-react";

function SignupProperty() {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [isKM, setIsKM] = useState(false);
  const [isMember, setIsMember] = useState(true);

  const handleKMChange = (e) => {
    setIsKM(!isKM);
    setIsMember(!isMember);
  };
  console.log("is member: ", isMember);

  // signup form state and logic
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

    if (name === "newProperty") {
      setNewProperty(value);
    }
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

    // put for add property to user
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
    <div className="signup-property-container">
      <h1 className="header">Create an Account</h1>
      <div className="role-selection">
        <input
          type="radio"
          name="role"
          id="member"
          checked={isMember}
          onChange={handleKMChange}
        />
        <label htmlFor="member" className="role-label">
          I'm a Member
        </label>
        <input
          type="radio"
          name="role"
          id="km"
          checked={isKM}
          onChange={handleKMChange}
        />
        <label htmlFor="km" className="role-label">
          I'm a Kitchen Manager
        </label>
      </div>
      <MemberForm
        signup={signup}
        properties={properties}
        onChange={handleMemberChange}
        onSubmit={handleMemberSubmit}
      />
      {isMember && (
        <p className="info-text">
          If you don't see your property, please ask your Kitchen Manager to add
          one!
        </p>
      )}

      {/* {isKM && <PropertyForm />} */}
    </div>
  );
}

export default SignupProperty;
