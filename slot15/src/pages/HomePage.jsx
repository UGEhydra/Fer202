import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="container text-center mt-5">
      <h1>🎬 Chào mừng đến với hệ thống quản lý phim!</h1>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/login")}>
        Đăng nhập
      </button>
    </div>
  );
};

export default HomePage;
