import React from "react";
import { Navbar, Nav, Container, Form, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PersonCircle, HeartFill, BoxArrowInRight } from "react-bootstrap-icons";

export default function MyNavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">🎬 MovieZone</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

            <NavDropdown title={<><PersonCircle className="me-1" />Accounts</>} id="nav-dropdown">
              <NavDropdown.Item as={Link} to="/account">Build Your Account</NavDropdown.Item>
              <NavDropdown.Item>Manage Your Profiles</NavDropdown.Item>
              <NavDropdown.Item>Change Password</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex">
            <Form.Control type="search" placeholder="Quick search" className="me-2" />
            <Button variant="outline-info">Search</Button>
          </Form>

          <div className="d-flex align-items-center ms-3">
            <Button variant="link" className="text-light me-2">
              <HeartFill size={20} />
            </Button>
            <Button variant="link" className="text-light">
              <BoxArrowInRight size={20} />
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
