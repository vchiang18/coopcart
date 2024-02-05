import React, { useState, useEffect } from "react";

function PropertyAdd() {
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState("");

  const getProperties = async () => {
    const url = "http://localhost:8000/properties";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/properties";
  };
  return (
    <>
      <div className="container margin-bottom">
        <h1>Add Property</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <select>
              <option>Choose Property</option>
              {/* {properties.map((property) => {
                return (
                    <option key={property.}>

                    </option>
                )
              })} */}
            </select>
          </div>
        </form>
      </div>
    </>
  );
}

export default PropertyAdd;
