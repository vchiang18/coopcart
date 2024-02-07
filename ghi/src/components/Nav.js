import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CoopCart
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-wrap">
            <li className="nav-item">
              <NavLink className="nav-link" to="/requests">
                Create a Request
              </NavLink>
              <NavLink className="nav-link" to="/requests">
                View Requests
              </NavLink>
              <NavLink className="nav-link" to="/orders">
                View Orders
              </NavLink>
              <NavLink className="nav-link" to="/property">
                My Coop
              </NavLink>
              <NavLink className="nav-link" to="/user">
                Edit My Info
              </NavLink>
              <NavLink className="nav-link" to="/property/add">
                Add Property
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
