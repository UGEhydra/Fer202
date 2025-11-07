import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const MotorbikeDetailPage = () => {
  const { id } = useParams(); // lấy id từ URL (/view/:id)
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { user } = useAuth();

  // ✅ Lấy thông tin motorbike theo id
  useEffect(() => {
    axios
      .get(`http://localhost:4000/motorbikes/${id}`)
      .then((res) => {
        if (res.data) setBike(res.data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true));
  }, [id]);

  // ✅ Thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (!user) {
      alert("You must login first to add items to cart!");
      navigate("/");
      return;
    }

    axios
      .post("http://localhost:4000/cart", bike)
      .then(() => alert(`${bike.model} added to cart!`))
      .catch((err) => console.error("Add to cart failed:", err));
  };

  // ✅ Nếu không tìm thấy
  if (notFound)
    return <h3 className="text-center mt-5 text-danger">404 - Motorbike Not Found</h3>;

  // ✅ Nếu chưa load xong
  if (!bike) return <h4 className="text-center mt-5">Loading...</h4>;

  // ✅ Hiển thị chi tiết xe
  return (
    <Container className="mt-5">
      <Card className="shadow mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Img
          variant="top"
          src={bike.image}
          alt={bike.model}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="text-center mb-3 fs-4">
            {bike.brand} {bike.model}
          </Card.Title>
          <Card.Text className="text-center fs-5">
            <strong>Year:</strong> {bike.year} <br />
            <strong>Price:</strong> ${bike.price.toLocaleString()} <br />
            <strong>Stock:</strong> {bike.stock}
          </Card.Text>

          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              ← Back
            </Button>
            <Button variant="success" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MotorbikeDetailPage;
