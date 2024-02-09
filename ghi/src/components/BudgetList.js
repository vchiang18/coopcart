import React, { useState, useEffect } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import Nav from "../components/Nav";
import "../style.css";

const BudgetList = () => {
    const [budgets, setBudgets] = useState([]);
    const { token } = useAuthContext();
    const fetchBudgets = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_HOST}/budgets`, {
                        credentials: "include",
                    });
                    const data = await response.json();

                    setBudgets(data);
                } catch (error) {
                    console.error("Error getting budgets:", error);
                }
            };
    useEffect(() => {
        fetchBudgets();
    }, [token]);

    return (
        <>
        <Nav />
        <div>
            <h1>Budget List</h1>
            {budgets.length === 0 ? (
                <p>No budgets available</p>
            ) : (
                <ul>
                    {budgets.map((budget) => (
                        <li key={budget.budget_id}>
                            <h2>Property: {budget.property}</h2>
                            <p>Food Fee: {budget.food_fee}</p>
                            <p>Total Members: {budget.total_members}</p>
                            <p>Monthly Budget: {budget.monthly_budget}</p>
                            <p>Monthly Spend: {budget.monthly_spend}</p>
                            <p>Monthly Remaining: {budget.monthly_remaining}</p>
                            <p>YTD Budget: {budget.ytd_budget}</p>
                            <p>YTD Spend: {budget.ytd_spend}</p>
                            <p>YTD Remaining Budget: {budget.ytd_remaining_budget}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </>
    );
};

export default BudgetList;
