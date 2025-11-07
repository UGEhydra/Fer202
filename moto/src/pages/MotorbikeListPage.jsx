import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useApp } from "../contexts/AppContext"; // ✅ thêm dòng này

const MotorbikeListPage = () => {
  const { state, dispatch } = useApp(); // ✅ lấy bikes từ context
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Lấy dữ liệu từ JSON Server
  useEffect(() => {
    axios
      .get("http://localhost:4000/motorbikes")
      .then((res) => {
        dispatch({ type: "SET_BIKES", payload: res.data }); // ✅ lưu vào context
        setFilteredBikes(res.data);
      })
      .catch((err) => console.error("Error loading data:", err));
  }, [dispatch]);

  // ✅ Search + Sort
  useEffect(() => {
    let result = [...state.bikes];

    if (searchTerm) {
      result = result.filter((b) =>
        b.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "low") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "high") result.sort((a, b) => b.price - a.price);

    setFilteredBikes(result);
  }, [searchTerm, sortOrder, state.bikes]);

  // ✅ Add to Cart
  const handleAddToCart = (bike) => {
  if (!user) {
    alert("You must login first to add items to cart!");
    navigate("/");
    return;
  }

  axios
    .get(`http://localhost:4000/cart?id=${bike.id}`)
    .then((res) => {
      if (res.data.length > 0) {
        // 🟢 Nếu đã có → cập nhật quantity +1
        const existingItem = res.data[0];
        const updatedItem = {
          ...existingItem,
          quantity: (existingItem.quantity || 1) + 1,
        };
        axios
          .patch(`http://localhost:4000/cart/${existingItem.id}`, {
            quantity: updatedItem.quantity,
          })
          .then(() => {
            dispatch({
              type: "UPDATE_CART",
              payload: state.cart.map((x) =>
                x.id === existingItem.id ? updatedItem : x
              ),
            });
            alert(`${bike.model} quantity updated in cart!`);
          });
      } else {
        // 🔵 Nếu chưa có → thêm mới
        const newItem = { ...bike, quantity: 1 };
        axios.post("http://localhost:4000/cart", newItem).then(() => {
          dispatch({
            type: "UPDATE_CART",
            payload: [...state.cart, newItem],
          });
          alert(`${bike.model} added to cart!`);
        });
      }
    })
    .catch((err) => console.error("Error adding to cart:", err));
};

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Motorbike List</h2>

      {/* Search + Sort */}
      <Row className="mb-4 justify-content-center">
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder="Search by model"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Danh sách motorbikes */}
      <Row>
        {filteredBikes.length > 0 ? (
          filteredBikes.map((bike) => (
            <Col key={bike.id} md={3} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={bike.image}
                  alt={bike.model}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{bike.brand + " " + bike.model}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    <strong>Year:</strong> {bike.year} <br />
                    <strong>Price:</strong> ${bike.price.toLocaleString()} <br />
                    <strong>Stock:</strong> {bike.stock}
                  </Card.Text>

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/motorbikes/${bike.id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleAddToCart(bike)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h5 className="text-center text-muted mt-5">No motorbikes found.</h5>
        )}
      </Row>
    </Container>
  );
};

export default MotorbikeListPage;
