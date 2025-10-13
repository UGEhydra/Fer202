import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.css";

export default function MovieCard({ img, title, text, genre, year, country, duration }) {
  return (
    <Card className="movie-card shadow-sm">
      <Card.Img variant="top" src={img} alt={title} className="movie-poster" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="text-muted">{text.slice(0, 80)}...</Card.Text>

        <div className="mb-2">
          <Badge bg="info" className="text-dark me-1">{genre}</Badge>
          <Badge bg="secondary">{year}</Badge>
        </div>

        <small className="text-secondary">
          {country} • {duration} mins
        </small>

        <div className="mt-3 d-flex justify-content-between">
          <Button variant="primary" size="sm">Details</Button>
          <Button variant="outline-warning" size="sm">Add to Favourite</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
