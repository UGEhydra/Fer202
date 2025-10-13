import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { PersonFill, LockFill } from "react-bootstrap-icons";

export default function AccountForm() {
  return (
    <Form>
      <h5 className="mb-3">
        <LockFill className="me-2" /> Account Information
      </h5>

      <Form.Group className="mb-3">
        <Form.Label>Username *</Form.Label>
        <InputGroup>
          <InputGroup.Text><PersonFill /></InputGroup.Text>
          <Form.Control type="text" placeholder="Enter username" isInvalid />
        </InputGroup>
        <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password *</Form.Label>
        <InputGroup>
          <InputGroup.Text><LockFill /></InputGroup.Text>
          <Form.Control type="password" placeholder="Enter password" isInvalid />
        </InputGroup>
        <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password *</Form.Label>
        <Form.Control type="password" placeholder="Confirm password" isInvalid />
        <Form.Control.Feedback type="invalid">Must match password</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Secret Question</Form.Label>
        <Form.Control type="text" placeholder="e.g. Your pet’s name?" />
      </Form.Group>

      <Form.Group>
        <Form.Label>Answer</Form.Label>
        <Form.Control type="text" placeholder="Enter answer" />
      </Form.Group>
    </Form>
  );
}
