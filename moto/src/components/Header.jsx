import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Tên ứng dụng */}
        <Navbar.Brand as={Link} to="/motorbikes">
          🏍️ Motorbike Manager
        </Navbar.Brand>

        {/* Menu bên trái */}
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/motorbikes">
            Motorbikes
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>
        </Nav>

        {/* Bên phải hiển thị user */}
        <Nav>
          {user ? (
            <>
              <Navbar.Text className="me-3 text-white">
                Hello, {user.username}
              </Navbar.Text>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
