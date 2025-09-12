import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#85586F" : "#fff",
    backgroundColor: isActive ? "#DEB6AB" : "transparent",
    padding: "6px 12px",
    borderRadius: "4px",
    fontWeight: "bold",
    textDecoration: "none",
    transition: "all 0.3s"
  });

  return (
    <nav className="navbar">
      <h2>Wings Cafe Inventory</h2>
      <div className="nav-links-container">
        <ul className="nav-links">
          <li>
            <NavLink to="/" style={linkStyle}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" style={linkStyle}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/inventory" style={linkStyle}>
              Inventory
            </NavLink>
          </li>
          <li>
            <NavLink to="/sales" style={linkStyle}>
              Sales
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" style={linkStyle}>
              Reports
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;








