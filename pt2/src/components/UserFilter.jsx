import React from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";

export default function UserFilter({ onFilter }) {
  const [filter, setFilter] = useState({ search: "", role: "", status: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilter = { ...filter, [name]: value };
    setFilter(newFilter);
    onFilter && onFilter(newFilter);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Row className="g-3">
          <Col md={4}>
            <Form.Control
              placeholder="Search by username or fullName"
              name="search"
              value={filter.search}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Select name="role" value={filter.role} onChange={handleChange}>
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select name="status" value={filter.status} onChange={handleChange}>
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
