import React, { useEffect, useState } from "react";
import "./../css/requestForm.css";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

const RequestForm = () => {
  const [request, setRequest] = useState({
    item: "",
    brand: "",
    unit_quantity: "",
    unit_type: "",
    quantity: "",
  });
  const [requestor, setRequestor] = useState("");
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const fetchToken = async () => {
    try {
      const tkn = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
        credentials: "include",
      });
      const account_data = await tkn.json();
      setRequestor(account_data.account.id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchToken();
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const requestData = {
      item: request.item,
      brand: request.brand,
      unit_quantity: request.unit_quantity,
      unit_type: request.unit_type,
      requestor: requestor,
      quantity: request.quantity,
    };

    const url = `${process.env.REACT_APP_API_HOST}/request/add`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setRequest({
          item: "",
          brand: "",
          unit_quantity: "",
          unit_type: "",
          requestor: "",
          quantity: "",
        });
        navigate("/requests");
      } else {
        console.error("Failed to create request");
      }
    } catch (error) {
      console.error("Error creating request", error);
    }
  }

  return (
    <>
      <Nav />
      <div className="request-form">
        <div className="card shadow">
          <div className="card-body">
            <h1>Create Request</h1>
            <form onSubmit={handleSubmit} id="create-request-form">
              <div className="mb-3">
                <label
                  htmlFor="item"
                  className="form-label"
                  style={{ width: "400px" }}
                >
                  Item
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="item"
                  name="item"
                  placeholder="Item"
                  value={request.item}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="brand" className="form-label">
                  Brand
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  name="brand"
                  placeholder="Brand"
                  value={request.brand}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="unit_quantity" className="form-label">
                  Unit Quantity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="unit_quantity"
                  name="unit_quantity"
                  placeholder="Unit Quantity"
                  value={request.unit_quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="unit_type" className="form-label">
                  Unit Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="unit_type"
                  name="unit_type"
                  placeholder="Unit Type"
                  value={request.unit_type}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  placeholder="Quantity"
                  value={request.quantity}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn-primary w-100">
                Create Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestForm;
