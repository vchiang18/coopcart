import React, { useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import "./../css/createorder.css";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const [order, setOrder] = useState({
    item: "",
    brand: "",
    unit_quantity: "",
    unit_type: "",
    vendor: "",
    requestor: "",
    quantity: "",
    purchased_price: "",
    purchased_quantity: "",
    notes: "",
  });

  const [orderCreated, setOrderCreated] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const validateForm = () => {
    const errors = {};

    if (!order.item) errors.item = "Item is required";
    if (!order.brand) errors.brand = "Brand is required";
    if (!order.unit_quantity)
      errors.unit_quantity = "Unit quantity is required";
    if (!order.unit_type) errors.unit_type = "Unit type is required";
    if (!order.vendor) errors.vendor = "Vendor is required";
    if (!order.requestor) errors.requestor = "Requestor is required";
    if (!order.quantity) errors.quantity = "Quantity is required";
    if (!order.purchased_price)
      errors.purchased_price = "Purchased price is required";
    if (!order.purchased_quantity)
      errors.purchased_quantity = "Purchased quantity is required";

    return errors;
  };

  const handleOrderChange = (event) => {
    const { name, value } = event.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const orderData = {
      item: order.item,
      brand: order.brand,
      unit_quantity: order.unit_quantity,
      unit_type: order.unit_type,
      vendor: order.vendor,
      requestor: order.requestor,
      quantity: order.quantity,
      purchased_price: order.purchased_price,
      purchased_quantity: order.purchased_quantity,
      notes: order.notes,
    };

    const url = `${process.env.REACT_APP_API_HOST}/order/create`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setOrder({
          item: "",
          brand: "",
          unit_quantity: "",
          unit_type: "",
          vendor: "",
          requestor: "",
          quantity: "",
          purchased_price: "",
          purchased_quantity: "",
          notes: "",
        });
        setOrderCreated(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      setErrorMessage(error.toString());
    }
  }

  const handleCreateAnother = () => {
    setOrderCreated(false);
    setOrder({});
  };

  const handleGoToOrders = () => {
    navigate("/orders");
  };

  return (
    <>
      <Nav />
      <div className="container2">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {orderCreated ? (
          <div>
            <p>Order created successfully. What would you like to do next?</p>
            <button onClick={handleCreateAnother}>Create Another Order</button>
            <button onClick={handleGoToOrders}>Go to Orders List</button>
          </div>
        ) : (
          <div className="container2">
            <h2>Create Order</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="item"
                  name="item"
                  placeholder="Item"
                  value={order.item}
                  onChange={handleOrderChange}
                />
                {formErrors.item && <p>{formErrors.item}</p>}
                <label htmlFor="item">Item</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  name="brand"
                  placeholder="Brand"
                  value={order.brand}
                  onChange={handleOrderChange}
                />
                {formErrors.brand && <p>{formErrors.brand}</p>}
                <label htmlFor="brand">Brand</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="unit_quantity"
                  name="unit_quantity"
                  placeholder="Unit Quantity"
                  value={order.unit_quantity}
                  onChange={handleOrderChange}
                />
                {formErrors.unit_quantity && <p>{formErrors.unit_quantity}</p>}
                <label htmlFor="unit_quantity">Unit Quantity</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="unit_type"
                  name="unit_type"
                  placeholder="Unit Type"
                  value={order.unit_type}
                  onChange={handleOrderChange}
                />
                {formErrors.unit_type && <p>{formErrors.unit_type}</p>}
                <label htmlFor="unit_type">Unit Type</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="vendor"
                  name="vendor"
                  placeholder="Vendor"
                  value={order.vendor}
                  onChange={handleOrderChange}
                />
                {formErrors.vendor && <p>{formErrors.vendor}</p>}
                <label htmlFor="vendor">Vendor</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="requestor"
                  name="requestor"
                  placeholder="Requestor"
                  value={order.requestor}
                  onChange={handleOrderChange}
                />
                {formErrors.requestor && <p>{formErrors.requestor}</p>}
                <label htmlFor="requestor">Requestor</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  placeholder="Quantity"
                  value={order.quantity}
                  onChange={handleOrderChange}
                />
                {formErrors.quantity && <p>{formErrors.quantity}</p>}
                <label htmlFor="quantity">Quantity</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="purchased_price"
                  name="purchased_price"
                  placeholder="Purchased Price"
                  value={order.purchased_price}
                  onChange={handleOrderChange}
                />
                {formErrors.purchased_price && (
                  <p>{formErrors.purchased_price}</p>
                )}
                <label htmlFor="purchased_price">Purchased Price</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="purchased_quantity"
                  name="purchased_quantity"
                  placeholder="Purchased Quantity"
                  value={order.purchased_quantity}
                  onChange={handleOrderChange}
                />
                {formErrors.purchased_quantity && (
                  <p>{formErrors.purchased_quantity}</p>
                )}
                <label htmlFor="purchased_quantity">Purchased Quantity</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="notes"
                  name="notes"
                  placeholder="Notes"
                  value={order.notes}
                  onChange={handleOrderChange}
                />
                <label htmlFor="notes">Notes</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Create Order
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateOrder;
