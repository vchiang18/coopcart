import React, { useState } from "react";
import "../style.css";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import Nav from '../components/Nav';

const RequestForm = () => {
    const [request, setRequest] = useState({
        item: "",
        brand: "",
        unit_quantity: "",
        unit_type: "",
        requestor: "",
        quantity: "",
    });

    const { token } = useAuthContext();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRequest((prevRequest) => ({
            ...prevRequest,
            [name]: value
        }));
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const requestData = {
            item: request.item,
            brand: request.brand,
            unit_quantity: request.unit_quantity,
            unit_type: request.unit_type,
            requestor: request.requestor,
            quantity: request.quantity,
        };

        const url = `${process.env.REACT_APP_API_HOST}/request/add`;
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(requestData),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

        if (response.ok) {
            const newRequest = await response.json();
            setRequest({
                item: "",
                brand: "",
                unit_quantity: "",
                unit_type: "",
                requestor: "",
                quantity: "",
            });
        } else {
            console.error("Failed to create request");
        }
        } catch (error) {
            console.error("Error creating request", error);
        }
    };

    return (
        <>
        <Nav />
        <div className="container my-5">
            <div className="card shadow">
                <div className="card-body">
                    <h1 className="card-title text-center">Create Request</h1>
                    <form onSubmit={handleSubmit} id="create-request-form">
                        <div className="mb-3">
                            <label htmlFor="item" className="form-label">
                                Item
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="item"
                                name="item"
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
                                value={request.unit_type}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="requestor" className="form-label">
                                Requestor
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="requestor"
                                name="requestor"
                                value={request.requestor}
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
                                value={request.quantity}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
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
