// src/pages/AccountPage.jsx
import React, { useState } from "react";
import { Card, ProgressBar, Button, Nav } from "react-bootstrap";
import AboutForm from "../components/Account/AboutForm";
import AccountForm from "../components/Account/AccountForm";
import AddressForm from "../components/Account/AddressForm";

export default function AccountPage() {
  const [step, setStep] = useState(1);
  const progress = step === 1 ? 33 : step === 2 ? 67 : 100;

  return (
    <div className="container mt-4">
      <Card className="shadow p-4">
        <h4 className="mb-3">
          <i className="bi bi-person-circle me-2"></i>Build Your Profile
        </h4>

        <ProgressBar now={progress} label={`${progress}%`} className="mb-4" />

        <Nav variant="tabs" activeKey={step} className="mb-3">
          <Nav.Item><Nav.Link eventKey={1} onClick={() => setStep(1)}>About</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey={2} onClick={() => setStep(2)}>Account</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey={3} onClick={() => setStep(3)}>Address</Nav.Link></Nav.Item>
        </Nav>

        <Card.Body>
          {step === 1 && <AboutForm />}
          {step === 2 && <AccountForm />}
          {step === 3 && <AddressForm />}
        </Card.Body>

        <div className="d-flex justify-content-between mt-3">
          <Button disabled={step === 1} variant="secondary" onClick={() => setStep(step - 1)}>Previous</Button>
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          ) : (
            <Button variant="success">Finish</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
