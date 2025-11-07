// src/components/NavigationHeader.jsx
import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavigationHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fullName = user?.fullName || user?.username || 'Student';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/home">TuitionTracker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="me-3">Signed in as: <strong>{fullName}</strong></Navbar.Text>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationHeader;
