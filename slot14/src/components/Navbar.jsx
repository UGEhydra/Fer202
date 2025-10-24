import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    marginRight: "15px",
    textDecoration: "none",
    color: isActive ? "blue" : "black",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
      <NavLink to="/" style={linkStyle}>Trang Chủ</NavLink>
      <NavLink to="/san-pham" style={linkStyle}>Sản Phẩm</NavLink>
      <NavLink to="/lien-he" style={linkStyle}>Liên Hệ</NavLink>
    </nav>
  );
}

export default Navbar;
