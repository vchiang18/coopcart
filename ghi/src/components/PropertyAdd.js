import React, { useState, useEffect } from "react";

function PropertyAdd() {
  const [properties, setProperties] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/properties";
  };
  return (
    <>
      <div className="container margin-bottom">
        <h1>Add Property</h1>
      </div>
    </>
  );
}

export default PropertyAdd;
