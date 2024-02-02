import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import TestForm from "./components/SignupForm.js";
import PropertyForm from "./components/PropertyForm.js";

function SignupProperty() {
  const { token } = useAuthContext();
  const [isKM, setIsKM] = useState(false);
  const [isMember, setIsMember] = useState(true);

  const handleKMChange = (e) => {
    setIsKM(!isKM);
    setIsMember(!isMember);
  };
  let comp = null;

  if (isMember) {
    comp = (
      <p>
        If you don't see your property, please ask your Kitchen Manager to add
        one!
      </p>
    );
  } else if (isKM) {
    comp = <PropertyForm />;
  } else {
    comp = null;
  }

  return (
    <>
      <h1>Create an Account</h1>
      <div>
        <input
          type="radio"
          name="km"
          value="km"
          id="km"
          checked={isKM === true}
          onChange={handleKMChange}
        />
        <label htmlFor="km"></label>
        I'm a Kitchen Manager
        <input
          type="radio"
          name="km"
          value="member"
          id="member"
          checked={isMember === true}
          onChange={handleKMChange}
        />
        <label htmlFor="member"></label>
        I'm a Member
      </div>
      <div>
        <TestForm />
      </div>
      <div>{comp}</div>

      {/* {isMember === true && (
        <div>
          <p>I'm a member!</p>
        </div>
      )}

      {isKM === true && (
        <div><p>I'm a kitchen manager!</p></div>
      )} */}
    </>
  );
}

export default SignupProperty;
