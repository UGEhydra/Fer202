import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand>🎬 Movie System</Navbar.Brand>
        {user ? (
          <div className="text-white d-flex align-items-center gap-3">
            <span>Xin chào, <strong>{user.fullname}</strong></span>
            <Button variant="outline-light" size="sm" onClick={() => { logout(); navigate("/"); }}>
              Đăng xuất
            </Button>
          </div>
        ) : (
          <Button variant="outline-light" size="sm" onClick={() => navigate("/")}>
            Đăng nhập
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
