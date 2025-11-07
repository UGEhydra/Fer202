import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const NavigationHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fullName = user?.fullName || user?.username || "Admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        >
          TuitionTracker
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/users")}>
              User Management
            </Nav.Link>
          </Nav>

          <Navbar.Text className="me-3">
            Signed in as: <strong>{fullName}</strong>
          </Navbar.Text>

          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationHeader;
