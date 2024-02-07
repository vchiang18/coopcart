import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function PropertyAdd() {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState("");
  const { token } = useAuthContext();
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    username: "",
    is_km: false,
    property: "",
  });
  console.log(token);

  // fetch all properties for form
  const getProperties = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/properties`;
    try {
      const response = await fetch(url);
      // console.log("get properties response:", response);
      if (response.ok) {
        const data = await response.json();
        // console.log("data: ", data);
        setProperties(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const handleNewPropertyChange = (e) => {
    const value = e.target.value;
    setNewProperty(value);
  };

  // fetch user info for edit user
  const getUser = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/user`;
    const fetchOptions = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (token) {
        try {
          const response = await fetch(url, fetchOptions);
          if (response.ok) {
            const data = await response.json();
            // console.log("data: ", data);
            setUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              first_name: data.first_name,
              last_name: data.last_name,
              username: data.username,
              is_km: data.is_km,
              property: data.property,
            }));
            console.log("userInfo: ", userInfo);
          }
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // adds property to user
  const handleNewPropertySubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_HOST}/user`;

    const data = userInfo;
    data.property = newProperty;
    data.terms_boolean = true;

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

    try {
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
        <h2>2. Select Your Coop</h2>
        <p>If you don't see your coop in this list, please add it below</p>
        {properties === undefined ? null : (
          <form onSubmit={handleNewPropertySubmit}>
            <div className="form-floating mb-3">
              <select onChange={handleNewPropertyChange}>
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
            <button>Submit!</button>
          </form>
        )}
      </div>
    </>
  );
}

export default PropertyAdd;
