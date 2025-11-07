import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!form.username.trim()) errors.username = "⚠️ Username is required";
    if (!form.password.trim()) errors.password = "⚠️ Password is required";

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // ✅ Gọi login từ context
    const success = await login(form.username, form.password);
    if (success) navigate("/welcome"); // ✅ điều hướng sau khi đăng nhập thành công
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">🔑 Đăng nhập hệ thống</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Nhập tên đăng nhập"
            isInvalid={!!fieldErrors.username}
          />
          {fieldErrors.username && (
            <Form.Text className="text-danger">{fieldErrors.username}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            isInvalid={!!fieldErrors.password}
          />
          {fieldErrors.password && (
            <Form.Text className="text-danger">{fieldErrors.password}</Form.Text>
          )}
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Đăng nhập
        </Button>

        {error && (
          <Alert variant="danger" className="mt-3 text-center">
            {error}
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default LoginPage;
