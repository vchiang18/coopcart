import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import React, { useState, useEffect } from "react";
import "./../css/orderhistory.css";
import Nav from "./Nav";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) {
      setError("You need to Login!");
      return;
    }

    fetch(`${process.env.REACT_APP_API_HOST}/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Please log in again.");
          } else {
            throw new Error("Network response was not ok!");
          }
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching the orders:", error);
        setError(error.message);
      });
  }, [token, error]);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    return (
      order.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(order.created_date).toLocaleDateString().includes(searchTerm)
    );
  });

  return (
    <>
      <Nav />
      <div className="order-history">
        <h1>Order History</h1>
        <input
          type="text"
          placeholder="Search by date, search by item"
          value={searchTerm}
          onChange={handleSearch}
        />
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Requestor</th>
              <th>Date Ordered</th>
              <th>Item</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.requestor}</td>
                <td>{new Date(order.created_date).toLocaleDateString()}</td>
                <td>{order.item}</td>
                <td>{order.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderHistory;
