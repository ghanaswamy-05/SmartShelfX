import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Layout.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const handleProtectedNav = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    navigate(isLoggedIn ? "/products" : "/login");
  };

  const handleEmployeeNav = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    navigate(isLoggedIn ? "/employees" : "/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="layout-container">
      <nav className="navbar">
        <div className="navbar-brand">SmartShelfX</div>
        <div className="navbar-links">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <button
            onClick={handleProtectedNav}
            className={`nav-button ${currentLocation.pathname === "/products" ? "active" : ""}`}
          >
            Add Product
          </button>
          <button
            onClick={handleEmployeeNav}
            className={`nav-button ${currentLocation.pathname === "/employees" ? "active" : ""}`}
          >
            Employee Info
          </button>
          <button onClick={handleLogout} className="nav-button logout">Logout</button>
        </div>
      </nav>

      <main className="page-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;