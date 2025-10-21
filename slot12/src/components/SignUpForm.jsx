import React, { useReducer } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

// 1️⃣ Trạng thái khởi tạo
const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  usernameError: "",
  emailError: "",
  passwordError: "",
  confirmPasswordError: "",
  isSubmitted: false,
};

// 2️⃣ Hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        [`${action.field}Error`]: "",
        isSubmitted: false,
      };

    case "VALIDATE":
      let { username, email, password, confirmPassword } = state;
      let usernameError = "";
      let emailError = "";
      let passwordError = "";
      let confirmPasswordError = "";

      // ✅ Validate username
      const usernameRegex = /^[a-zA-Z0-9_.]{3,}$/;
      if (!usernameRegex.test(username)) {
        usernameError =
          "Tên người dùng phải ≥ 3 ký tự, chỉ gồm chữ, số, dấu _ hoặc .";
      }

      // ✅ Validate email
      if (!email.includes("@") || !email.includes(".")) {
        emailError = "Email không hợp lệ (phải chứa @ và .)";
      }

      // ✅ Validate password
      if (password.length < 8) {
        passwordError = "Mật khẩu phải có ít nhất 8 ký tự";
      }

      // ✅ Validate confirm password
      if (confirmPassword !== password) {
        confirmPasswordError = "Mật khẩu xác nhận không khớp";
      }

      return {
        ...state,
        usernameError,
        emailError,
        passwordError,
        confirmPasswordError,
      };

    case "SUBMIT":
      return { ...state, isSubmitted: true };

    case "RESET":
      return { ...initialState };

    default:
      return state;
  }
}

// 3️⃣ Component chính
function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    username,
    email,
    password,
    confirmPassword,
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
    isSubmitted,
  } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "VALIDATE" });

    // Kiểm tra nếu không có lỗi
    if (
      username &&
      email &&
      password &&
      confirmPassword &&
      !usernameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      /^[a-zA-Z0-9_.]{3,}$/.test(username) &&
      email.includes("@") &&
      email.includes(".") &&
      password.length >= 8 &&
      confirmPassword === password
    ) {
      dispatch({ type: "SUBMIT" });
    }
  };

  return (
    <Card className="p-4" style={{ width: "450px", margin: "50px auto" }}>
      <h3 className="text-center mb-3">Đăng ký tài khoản</h3>

      {isSubmitted && (
        <Alert variant="success" className="text-center">
          🎉 Đăng ký thành công!
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Username */}
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập username"
            value={username}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "username",
                value: e.target.value.trim(),
              })
            }
          />
          {usernameError && <small className="text-danger">{usernameError}</small>}
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "email",
                value: e.target.value.trim(),
              })
            }
          />
          {emailError && <small className="text-danger">{emailError}</small>}
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "password",
                value: e.target.value,
              })
            }
          />
          {passwordError && <small className="text-danger">{passwordError}</small>}
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "confirmPassword",
                value: e.target.value,
              })
            }
          />
          {confirmPasswordError && (
            <small className="text-danger">{confirmPasswordError}</small>
          )}
        </Form.Group>

        <div className="text-center">
          <Button
            type="submit"
            variant="primary"
            disabled={!username || !email || !password || !confirmPassword}
          >
            Đăng ký
          </Button>{" "}
          <Button
            type="button"
            variant="secondary"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Làm mới
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default SignUpForm;
