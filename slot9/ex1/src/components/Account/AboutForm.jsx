import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

export default function AboutForm() {
  return (
    <Form>
      <h5 className="mb-3">
        <PersonCircle className="me-2" /> About Information
      </h5>
      <Row className="mb-3">
        <Col>
          <Form.Label>First Name *</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" isInvalid />
          <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
        </Col>
        <Col>
          <Form.Label>Last Name *</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" isInvalid />
          <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Email *</Form.Label>
        <Form.Control type="email" placeholder="Enter email" isInvalid />
        <Form.Control.Feedback type="invalid">Invalid or empty email</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone *</Form.Label>
        <Form.Control type="tel" placeholder="Enter phone" isInvalid />
        <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Age *</Form.Label>
        <Form.Control type="number" placeholder="Enter age" min="1" isInvalid />
      <Form.Control.Feedback type="invalid">Must be &gt; 0</Form.Control.Feedback>

      </Form.Group>

      <Form.Group>
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
    </Form>
  );
}
