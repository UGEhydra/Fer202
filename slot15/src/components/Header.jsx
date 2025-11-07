import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">🎬 MovieZone</Navbar.Brand>
        <Nav className="ms-auto">
          {user ? (
            <>
              <Navbar.Text className="me-3 text-light">
                Xin chào, <strong>{user.username}</strong>
              </Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <Button variant="outline-light" onClick={() => navigate("/login")}>
              Đăng nhập
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
