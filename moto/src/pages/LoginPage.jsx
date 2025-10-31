import React, { useState } from "react";
import { Form, Button, Container, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const LoginPage = ({ setUser }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
    setError("Username and password are required.");
    return;
  }
    try {
      const res = await axios.get("http://localhost:4000/users");
      const user = res.data.find(
        (u) =>
          u.username === form.username && u.password === form.password
      );
      if (user) {
        setUser(user);
        setError("");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/motorbikes");
        }, 1500);
      } else {
        setError("Invalid username or password!");
      }
    } catch (err) {
      console.error(err);
      setError("Server error!");
    }
  };

  const handleCancel = () => {
    setForm({ username: "", password: "" });
    setError("");
  };

   return (
    <Container className="mt-5 d-flex justify-content-center">
      <div className="p-4 shadow-lg rounded bg-white" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button type="submit" variant="primary">
              Login
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>

        {/* ✅ hiển thị alert nếu có lỗi */}
        {error && (
          <Alert variant="danger" className="mt-3 text-center">
            {error}
          </Alert>
        )}

        {/* Modal chào mừng */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Welcome, <strong>{form.username}</strong> login successful!
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
};

LoginPage.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginPage;