import React, { useState, useEffect } from "react";

function PropertyAdd() {
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState("");

  const getProperties = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/properties`;
    try {
      const response = await fetch(url);
      console.log("get properties response:", response);
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
    const url = `${process.env.REACT_APP_API_HOST}/properties`;
  };
  return (
    <>
      <div className="container margin-bottom">
        <h2>2. Select Your Coop</h2>
        <p>If you don't see your coop in this list, please add it below</p>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <select>
              <option>Choose Property</option>
              {properties.map((property) => {
                return (
                  <option
                    key={property.property_id}
                    value={property.property_id}
                  >
                    {property.property_name}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </div>
    </>
  );
}

export default PropertyAdd;
