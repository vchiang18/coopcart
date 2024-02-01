import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function SignupProperty() {
  const [isKM, setIsKM] = useState("");
  const { token } = useAuthContext();
  //   const [properties, setProperties] = useState([]);
  //   const [property, setProperty] = useState([]);

    const handleIsKM = async () => {


      const url = `http://localhost:8000/user`;
      const user = {};
      const fetchConfig = {
        method: "PUT",
        body: JSON.stringify({user}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
          const response = await fetch(url, fetchConfig);
          if (response.ok) {

          }
      }
    };

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

  return (
    <>
      <input type="radio"/>
      <input type="radio"/>
    </>
  );
}
