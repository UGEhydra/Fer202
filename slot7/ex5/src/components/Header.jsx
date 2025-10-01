import React from "react";
import { FaHome, FaBookOpen, FaUserGraduate, FaList } from "react-icons/fa";

function Header() {
  return (
    <header
      style={{
        backgroundColor: "#eac6a6",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {/* Logo + Text */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logo.jpg" // file logo trong public/logo.jpg
          alt="FPT University"
          style={{ height: "100px" }}
        />
        
      </div>

      {/* Menu */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          color: "orangered"
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            textDecoration: "none",
            color: "orangered"
          }}
        >
          <FaHome /> Trang chủ
        </a>
        <a
          href="/nganhhoc"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            textDecoration: "none",
            color: "orangered"
          }}
        >
          <FaBookOpen /> Ngành học
        </a>
        <a
          href="/tuyensinh"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            textDecoration: "none",
            color: "orangered"
          }}
        >
          <FaUserGraduate /> Tuyển sinh
        </a>
        <a
          href="/sinhvien"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            textDecoration: "none",
            color: "orangered"
          }}
        >
          <FaList /> Sinh viên
        </a>
      </nav>

      {/* Search */}
      <div>
        <label
          htmlFor="search"
          style={{ marginRight: "5px", fontSize: "14px" }}
        >
          Search:
        </label>
        <input
          id="search"
          type="text"
          style={{ padding: "4px", border: "1px solid #333" }}
        />
      </div>
    </header>
  );
}

export default Header;
