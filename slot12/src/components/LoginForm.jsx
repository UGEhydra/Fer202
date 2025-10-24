import React, { useReducer } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

// 1️⃣ Trạng thái khởi tạo
const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  isSubmitted: false,
  submitError: "",
};

// 2️⃣ Định nghĩa reducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload, emailError: "", isSubmitted: false };
    case "SET_PASSWORD":
      return { ...state, password: action.payload, passwordError: "", isSubmitted: false };
    case "VALIDATE":
      let emailError = "";
      let passwordError = "";

      // Validate email
      if (!state.email.includes("@") || !state.email.includes(".")) {
        emailError = "Email không hợp lệ (phải chứa @ và .)";
      }

      // Validate password
      if (state.password.length < 6) {
        passwordError = "Mật khẩu phải có ít nhất 6 ký tự";
      }

      return { ...state, emailError, passwordError };

    case "SUBMIT":
      return { ...state, isSubmitted: true };
    case "RESET":
      return { ...initialState };

    default:
      return state;
  }
}

// 3️⃣ Component chính
function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, emailError, passwordError, isSubmitted, submitError } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "VALIDATE" });

    // Nếu không có lỗi → SUBMIT
    if (
      email &&
      password &&
      !emailError &&
      !passwordError &&
      email.includes("@") &&
      password.length >= 6
    ) {
      dispatch({ type: "SUBMIT" });
    } else {
      dispatch({ type: "SUBMIT_ERROR" });
    }
  };

  return (
    <Card className="p-4" style={{ width: "400px", margin: "50px auto" }}>
      <h3 className="text-center mb-3">Đăng nhập</h3>
      {submitError && (
        <Alert variant="danger" className="text-center">
          {state.submitError}
        </Alert>
      )}

      {isSubmitted && (
        <Alert variant="success" className="text-center">
          ✅ Đăng nhập thành công!
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Email */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
          />
          {emailError && <small className="text-danger">{emailError}</small>}
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
          />
          {passwordError && (
            <small className="text-danger">{passwordError}</small>
          )}
        </Form.Group>

        <div className="text-center">
          <Button
            type="submit"
            variant="primary"
            
          >
            Đăng nhập
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

export default LoginForm;
