import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const { login, error } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState(""); // lỗi khi bỏ trống input
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError(""); // reset lỗi khi người dùng nhập lại
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Kiểm tra nếu để trống
    if (!form.username.trim() || !form.password.trim()) {
      setFormError("Username and password are required");
      return;
    }

    const success = await login(form.username, form.password);
    if (success) {
      navigate("/movies");
    }
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "80px" }}>
      <h2 className="text-center mb-4">🔑 Đăng nhập hệ thống</h2>

      {/* Hiển thị lỗi bỏ trống */}
      {formError && <Alert variant="warning">{formError}</Alert>}

      {/* Hiển thị lỗi sai tài khoản hoặc lỗi server */}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Nhập tên đăng nhập"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Đăng nhập
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
