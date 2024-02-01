import React, { useState } from 'react';
import './style.css'

const CreateProperty = () => {
  const [property, setProperty] = useState({
    property_name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    food_fee: '',
    total_members: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProperty(prevProperty => ({
      ...prevProperty,
      [name]: value
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const propertyData = {
      property_name: property.property_name,
      street: property.street,
      city: property.city,
      state: property.state,
      zip: property.zip,
      food_fee: property.food_fee,
      total_members: property.total_members
    };

    const response = await fetch('http://localhost:8000/property', {
      method: "post",
      body: JSON.stringify(propertyData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const newProperty = await response.json();
      console.log(newProperty);
      setProperty({
        property_name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        food_fee: '',
        total_members: ''
      });
    } else {
      console.error('Failed to create property');
      const errorResponse = await response.text();
      console.error(errorResponse);
    }
  }

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title text-center">Create Property</h1>
          <form onSubmit={handleSubmit} id="create-property-form">
            {/* Property Name */}
            <div className="mb-3">
              <label htmlFor="property_name" className="form-label">Property Name</label>
              <input
                type="text"
                className="form-control"
                id="property_name"
                name="property_name"
                value={property.property_name}
                onChange={handleChange}
              />
            </div>

            {/* Street */}
            <div className="mb-3">
              <label htmlFor="street" className="form-label">Street</label>
              <input
                type="text"
                className="form-control"
                id="street"
                name="street"
                value={property.street}
                onChange={handleChange}
              />
            </div>

            {/* City */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={property.city}
                onChange={handleChange}
              />
            </div>

            {/* State */}
            <div className="mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={property.state}
                onChange={handleChange}
              />
            </div>

            {/* Zip Code */}
            <div className="mb-3">
              <label htmlFor="zip" className="form-label">Zip Code</label>
              <input
                type="text"
                className="form-control"
                id="zip"
                name="zip"
                value={property.zip}
                onChange={handleChange}
              />
            </div>

            {/* Food Fee */}
            <div className="mb-3">
              <label htmlFor="food_fee" className="form-label">Food Fee</label>
              <input
                type="text"
                className="form-control"
                id="food_fee"
                name="food_fee"
                value={property.food_fee}
                onChange={handleChange}
              />
            </div>

            {/* Total Members */}
            <div className="mb-3">
              <label htmlFor="total_members" className="form-label">Total Members</label>
              <input
                type="text"
                className="form-control"
                id="total_members"
                name="total_members"
                value={property.total_members}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProperty;
