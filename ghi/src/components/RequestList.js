import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import Nav from "../components/Nav";
import "./../css/requestList.css";

function RequestList() {
  const [requests, setRequests] = useState([]);
  const { token } = useAuthContext();
  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/requests`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      setRequests(data);
    } catch (error) {
      console.error("Error getting requests:", error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, [token]);

  return (
    <>
      <Nav />
      <div className="request-list">
        <h1>Requests</h1>
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Item</th>
              <th>Brand</th>
              <th>Unit Quantity</th>
              <th>Unit Type</th>
              <th>Requestor</th>
              <th>Created Date</th>
              <th>Status</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {requests
              ? requests.map((request) => {
                  return (
                    <tr key={request.request_id}>
                      <td>{request.request_id}</td>
                      <td>{request.item}</td>
                      <td>{request.brand}</td>
                      <td>{request.unit_quantity}</td>
                      <td>{request.unit_type}</td>
                      <td>{request.requestor}</td>
                      <td>
                        {new Date(request.created_date).toLocaleDateString()}
                      </td>
                      <td>{request.status}</td>
                      <td>{request.quantity}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RequestList;
