import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { GeoAltFill } from "react-bootstrap-icons";

export default function AddressForm() {
  return (
    <Form>
      <h5 className="mb-3">
        <GeoAltFill className="me-2" /> Address Information
      </h5>

      <Form.Group className="mb-3">
        <Form.Label>Street *</Form.Label>
        <Form.Control type="text" placeholder="123 Street Name" isInvalid />
        <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <Form.Label>City *</Form.Label>
          <Form.Control type="text" placeholder="Enter city" isInvalid />
          <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
        </Col>
        <Col>
          <Form.Label>Country *</Form.Label>
          <Form.Select isInvalid>
            <option value="">Select country</option>
            <option>Vietnam</option>
            <option>Japan</option>
            <option>USA</option>
            <option>France</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
        </Col>
      </Row>

      <Form.Group>
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="text" placeholder="Enter zip code" />
      </Form.Group>
    </Form>
  );
}
