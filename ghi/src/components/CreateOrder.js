import React, { useState } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import "../style.css";


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

    const { token } = useAuthContext();

    const handleOrderChange = (event) => {
        const { name, value } = event.target;
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    async function handleSubmit(event) {
        event.preventDefault();
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
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const newOrder = await response.json();
                console.log(newOrder);
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
                console.log("Order created successfully");
            } else {
                console.error("Failed to create order");
            }
        } catch (error) {
            console.error("Error creating order", error);
        }
    }

  return (
    <div className="container">
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
  );
};

export default CreateOrder;
