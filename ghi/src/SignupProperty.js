import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import SignUpForm from "./components/Signup.js";
import PropertyForm from "./components/PropertyForm.js";
import PropertyAdd from "./components/PropertyAdd.js";
import "./SignupProperty.css";
import useToken from "@galvanize-inc/jwtdown-for-react";

function SignupProperty() {
  const { token, setToken } = useAuthContext();
  const navigate = useNavigate();
  const [isKM, setIsKM] = useState(false);
  const [isMember, setIsMember] = useState(true);

  const handleKMChange = (e) => {
    setIsKM(!isKM);
    setIsMember(!isMember);
  };

  // signup form state and logic
  const { login } = useToken();
  const [signup, setSignup] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    term_boolean: false,
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

    if (!signup.term_boolean) {
      alert("You must accept the terms and conditions to sign up. ");
      return;
    }

    try {
      const url = `${process.env.REACT_APP_API_HOST}/user`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });
      if (!response.ok) throw new Error("Signup failed");
      await login(signup.username, signup.password);
      alert("Signup and login successfully.");
    } catch (error) {
      alert(error.message);
    }
  };

  // add property state and logic
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState("");

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

  if (properties === undefined) {
    return null;
  }

  const handlePropertyChange = (e) => {
    const value = e.target.value;
    setProperty(value);
  };

  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_HOST}/properties`;
    let data = {};
    const fetConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, fetConfig);
      if (response.ok) {
        const addProperty = await response.json();
        setProperty("");
      }
    } catch (err) {
      console.error(err);
    }
    // };

  const handleSignOut = () => {
    if (setToken) {
      setToken(null);
    } else {
      localStorage.removeItem("token");
    }
    navigate("/signup");
  };

    return (
      <div className="signup-property-container">
        <h1 className="header">Create an Account</h1>
        {token && (
          <button onClick={handleSignOut} className="sign-out-button">
            Sign Out
          </button>
        )}
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
        <SignUpForm
          signup={signup}
          onChange={handleSignupChange}
          onSubmit={handleSignupSubmit}
        />
        <PropertyAdd
          properties={properties}
          onChange={handlePropertyChange}
          onSubmit={handlePropertySubmit}
        />
        {isMember && (
          <p className="info-text">
            If you don't see your property, please ask your Kitchen Manager to
            add one!
          </p>
        )}

        {isKM && <PropertyForm />}
        <button>Submit</button>
      </div>
    );
  };
}

export default SignupProperty;
