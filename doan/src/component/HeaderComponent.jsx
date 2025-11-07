import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Carousel } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const HeaderComponent = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation(); // 👉 để biết đang ở trang nào

  useEffect(() => {
    fetch("http://localhost:4000/store")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm py-2">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold d-flex align-items-center"
          >
            <img
              src="/logo192.png"
              alt="logo"
              width="40"
              height="40"
              className="d-inline-block align-top me-2 rounded"
            />
            FreshFood Mart
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/" className="text-light">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/store" className="text-light">
                Store
              </Nav.Link>
              <Button
                variant="light"
                size="sm"
                className="ms-3 px-3 fw-semibold"
              >
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ Chỉ hiển thị Carousel ở trang Home */}
      {location.pathname === "/" && (
        <Carousel fade interval={2500} pause="hover">
          {products.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                className="d-block w-100"
                src={item.img}
                alt={item.name}
                style={{
                  height: "400px",
                  objectFit: "cover",
                }}
              />
              <Carousel.Caption
                style={{
                  background: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <h5>{item.name}</h5>
                <p>{item.price.toLocaleString()} VND</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default HeaderComponent;
