import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "react-bootstrap";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/movies");
    }, 3000); // chuyển sau 3 giây

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h2>👋 Xin chào, {user?.username || "bạn"}!</h2>
      <p>Đang chuyển đến trang quản lý phim...</p>
      <Spinner animation="border" className="mt-3" />
    </div>
  );
};

export default WelcomePage;
