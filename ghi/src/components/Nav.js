import { NavLink } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import SignOutButton from "./Signout";

function Nav() {
  const { token } = useAuthContext();

  return (
    <nav className="coopcart-navbar navbar navbar-expand-lg bg-success">
      <div className="coopcart-container container-fluid">
        <NavLink className="coopcart-navbar-brand navbar-brand" to="/">
          🥬
        </NavLink>
        <div className="d-flex align-items-center">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          </div>
        </div>
        <button
          className="coopcart-navbar-toggler navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#coopcart-navbarSupportedContent"
          aria-controls="coopcart-navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="coopcart-navbar-toggler-icon navbar-toggler-icon"></span>
        </button>
        <div
          className="coopcart-collapse collapse navbar-collapse"
          id="coopcart-navbarSupportedContent"
        >
          <ul className="coopcart-navbar-nav navbar-nav me-auto mb-2 mb-lg-0">
            <li className="coopcart-nav-item nav-item">
              <NavLink className="coopcart-nav-link nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="coopcart-nav-item nav-item dropdown">
              <button
                className="coopcart-nav-link nav-link dropdown-toggle coopcart-btn btn btn-link"
                id="coopcart-dropdownRequests"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Requests
              </button>
              <ul
                className="coopcart-dropdown-menu dropdown-menu"
                aria-labelledby="coopcart-dropdownRequests"
              >
                <li>
                  <NavLink
                    className="coopcart-dropdown-item dropdown-item"
                    to="/request/add"
                  >
                    Create Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="coopcart-dropdown-item dropdown-item"
                    to="/requests"
                  >
                    View Requests
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="coopcart-nav-item nav-item dropdown">
              <button
                className="coopcart-nav-link nav-link dropdown-toggle coopcart-btn btn btn-link"
                id="coopcart-dropdownOrders"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Orders
              </button>
              <ul
                className="coopcart-dropdown-menu dropdown-menu"
                aria-labelledby="coopcart-dropdownOrders"
              >
                <li>
                  <NavLink
                    className="coopcart-dropdown-item dropdown-item"
                    to="/order/create"
                  >
                    Create Order
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="coopcart-dropdown-item dropdown-item"
                    to="/orders"
                  >
                    View Orders
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="coopcart-nav-item nav-item dropdown">
              <button
                className="coopcart-nav-link nav-link dropdown-toggle coopcart-btn btn btn-link"
                id="coopcart-dropdownProperty"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Coop
              </button>
              <ul
                className="coopcart-dropdown-menu dropdown-menu"
                aria-labelledby="coopcart-dropdownProperty"
              >
                <li>
                  <NavLink
                    className="coopcart-dropdown-item dropdown-item"
                    to="/property/add"
                  >
                    Change Coop
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="coopcart-nav-item nav-item">
              <NavLink className="coopcart-nav-link nav-link" to="/user">
                Edit User Info
              </NavLink>
            </li>
            <li className="coopcart-nav-item nav-item">
              <NavLink className="coopcart-nav-link nav-link" to="/budgets">
                Budget
              </NavLink>
            </li>
          </ul>
          {token && (
            <div className="ms-auto padding-right-2">
              <SignOutButton />
            </div>
          )}
          <div style={{ width: "20px" }}></div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
