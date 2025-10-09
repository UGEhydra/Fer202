import React, { useState } from "react";
import { Card, Button, Row, Col, Badge, Toast, Modal } from "react-bootstrap";
import { movies } from "../../data/movies";

export default function MovieCard() {
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Lưu favourites vào localStorage
  const handleAddFavourite = (movie) => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const alreadyExists = favourites.some((m) => m.id === movie.id);
    if (!alreadyExists) {
      favourites.push(movie);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      setShowToast(true);
    }
  };

  // Mở modal chi tiết
  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <div className="mt-4">
      <Row xs={1} sm={2} md={3} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <Card className="h-100 shadow-sm hover-card">
              <Card.Img
                variant="top"
                src={movie.poster}
                alt={movie.title}
                style={{ height: 260, objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>
                  {movie.title}{" "}
                  <Badge bg="info" className="text-dark">
                    {movie.genre}
                  </Badge>
                </Card.Title>
                <Card.Text style={{ fontSize: "0.9rem" }}>
                  {movie.description.length > 60
                    ? movie.description.slice(0, 60) + "..."
                    : movie.description}
                </Card.Text>
                <p className="mb-1 text-muted">
                  {movie.year} • {movie.country} • {movie.duration} mins
                </p>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleAddFavourite(movie)}
                  >
                    ❤️ Add to Favourites
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleShowDetails(movie)}
                  >
                    ℹ️ Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Toast hiển thị thông báo */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2000}
        autohide
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          minWidth: "220px",
          backgroundColor: "#198754",
          color: "white",
        }}
      >
        <Toast.Body>✅ Added to favourites!</Toast.Body>
      </Toast>

      {/* Modal chi tiết phim */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        {selectedMovie && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMovie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                className="img-fluid rounded mb-3"
              />
              <p><strong>Genre:</strong> {selectedMovie.genre}</p>
              <p><strong>Country:</strong> {selectedMovie.country}</p>
              <p><strong>Duration:</strong> {selectedMovie.duration} mins</p>
              <p><strong>Showtimes:</strong> {selectedMovie.showtimes}</p>
              <p>{selectedMovie.description}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
