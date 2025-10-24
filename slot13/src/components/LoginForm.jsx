import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from './ConfirmModal';

// 1. Trạng thái ban đầu
const initialFormState = {
  identifier: '',
  password: '',
  errors: {},
  showSuccessModal: false,
};

// 2. Reducer
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.message } };
    case 'CLEAR_ERROR':
      const { [action.field]: removed, ...rest } = state.errors;
      return { ...state, errors: rest };
    case 'SHOW_MODAL':
      return { ...state, showSuccessModal: true };
    case 'HIDE_MODAL':
      return { ...state, showSuccessModal: false };
    case 'RESET':
      return initialFormState;
    default:
      return state;
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const { login, loading, error, clearError, user } = useAuth();

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = (v) => v.includes('@');

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
    clearError();

    if (!value.trim()) {
      dispatch({ type: 'SET_ERROR', field: name, message: `${name} is required.` });
    } else {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!state.identifier.trim()) errors.identifier = 'Username or Email is required.';
    else if (isEmail(state.identifier) && !emailRe.test(state.identifier))
      errors.identifier = 'Invalid email format.';
    if (!state.password.trim()) errors.password = 'Password is required.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors });
    if (Object.keys(errors).length > 0) return;

    const result = await login(state.identifier, state.password);
    if (result.ok) dispatch({ type: 'SHOW_MODAL' });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'HIDE_MODAL' });
    dispatch({ type: 'RESET' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login with AuthContext</h3>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" onClose={clearError} dismissible>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="identifier"
                    value={state.identifier}
                    onChange={handleChange}
                    isInvalid={!!state.errors.identifier}
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.identifier}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    isInvalid={!!state.errors.password}
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" className="flex-fill" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" className="me-2" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    className="flex-fill"
                    onClick={() => dispatch({ type: 'RESET' })}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </div>

                <div className="mt-3 text-center text-muted small">
                  <p>
                    Demo accounts:
                    <br /> admin / 123456 → ✅ success <br /> user1 / 123456 → ❌ denied <br /> user2
                    / 123456 → 🔒 locked
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={state.showSuccessModal}
        title="Login Successful"
        message={`Welcome, ${user?.username}! You are logged in as ${user?.role}.`}
        onConfirm={handleCloseModal}
        onHide={handleCloseModal}
      />
    </Container>
  );
}

export default LoginForm;
