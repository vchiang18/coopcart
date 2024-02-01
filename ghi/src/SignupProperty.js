import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import SignUpForm from "./Signup.js";

function SignupProperty() {
  const { token } = useAuthContext();
  const [isKM, setIsKM] = useState("");
  const [isMember, setIsMember] = useState("");

  const handleSelectKM = (e) => {
    setIsKM(e.target.value);
  };

  const handleSelectMember = (e) => {
    setIsMember(e.target.value);
  };

  console.log(isKM);
  console.log(isMember);

  return (
    <>
      <h1>Create an Account</h1>
      <div>
        <input
          type="radio"
          name="km"
          value="km"
          id="km"
          checked={isKM === "km"}
          onChange={handleSelectKM}
        />
        <label htmlFor="km"></label>
        I'm a Kitchen Manager
        <input
          type="radio"
          name="km"
          value="member"
          id="member"
          checked={isMember === "member"}
          onChange={handleSelectMember}
        />
        <label htmlFor="member"></label>
        I'm a Member
      </div>
      <div>
        <SignUpForm />
      </div>
      {isMember === "member" && <div>{/* content to show for member */}</div>}

      {isKM === "km" && <div>{/* content to show for km */}</div>}
    </>
  );
}

export default SignupProperty;

//   const [properties, setProperties] = useState([]);
//   const [property, setProperty] = useState([]);

// const handleIsKM = async () => {

//   const url = `http://localhost:8000/user`;
//   const user = {};
//   const fetchConfig = {
//     method: "PUT",
//     body: JSON.stringify({user}),
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   try {
//       const response = await fetch(url, fetchConfig);
//       if (response.ok) {

//       }
//   }
// };

//     const getProperties = async () => {
//       const url = "http://localhost:8000/properties";
//       try {
//         const response = await fetch(url);
//         if (response.ok) {
//           const data = await response.json();
//           setProperties(data.properties);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//   useEffect(() => {
//     getProperties();
//   }, []);

//   if (properties === undefined) {
//     return null;
//   }

// onSubmit - should add isKM to user (edit) / property_id to user (edit)
