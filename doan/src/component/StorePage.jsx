import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const StorePage = () => {
  const [products, setProducts] = useState([]);

  // Lấy dữ liệu từ JSON Server
  useEffect(() => {
    fetch("http://localhost:4000/store")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          setProducts(data.products);
        } else {
          console.warn("No products found:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Hàm xử lý khi nhấn "Mua ngay"
  const handleBuy = async (id) => {
    const updatedProducts = products.map((item) => {
      if (item.id === id && item.stock > 0) {
        return { ...item, stock: item.stock - 1 };
      }
      return item;
    });

    const boughtProduct = products.find((p) => p.id === id);
    const newStock = boughtProduct.stock - 1;

    if (newStock < 0) {
      alert("This product is out of stock!");
      return;
    }

    // Gửi request PUT để cập nhật stock vào server
    try {
      const res = await fetch("http://localhost:4000/store", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storeName: "FreshFood Mart",
          location: "456 Hoàng Diệu, Hải Châu, Đà Nẵng",
          products: updatedProducts,
        }),
      });

      if (res.ok) {
        setProducts(updatedProducts);
        alert(`You have bought ${boughtProduct.name} successfully!`);
      } else {
        alert("Error updating product stock!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container className="mt-4 mb-4">
      <h2 className="text-center mb-4">Our Fresh Products</h2>
      <Row className="g-4">
        {products.map((item) => (
          <Col key={item.id} md={4} sm={6} xs={12}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={item.img}
                alt={item.name}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <Card.Body className="text-center">
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Price: {item.price.toLocaleString()} VND</Card.Text>
                <Card.Text>
                  Stock:{" "}
                  <span
                    style={{
                      color: item.stock === 0 ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {item.stock}
                  </span>
                </Card.Text>
                <Button
                  variant="success"
                  onClick={() => handleBuy(item.id)}
                  disabled={item.stock === 0}
                >
                  {item.stock === 0 ? "Out of Stock" : "Mua ngay"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StorePage;
