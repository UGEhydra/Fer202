import React from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function ContactPage() {
  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h2>Contact Us</h2>
      <p>Have questions or feedback? Send us a message below!</p>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name *</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message *</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Write your message..." required />
        </Form.Group>

        <Button variant="primary" type="submit">Send Message</Button>
      </Form>
    </Container>
  );
}
