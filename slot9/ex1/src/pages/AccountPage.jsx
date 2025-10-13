import React, { useState } from "react";
import { Container, Card, ProgressBar, Button } from "react-bootstrap";
import AboutForm from "../components/Account/AboutForm";
import AccountForm from "../components/Account/AccountForm";
import AddressForm from "../components/Account/AddressForm";

export default function AccountPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const getProgress = () => (step === 1 ? 33 : step === 2 ? 67 : 100);

  return (
    <Container className="mt-5" style={{ maxWidth: 700 }}>
      <Card className="p-4 shadow-sm">
        <h3 className="text-center mb-4">🧭 Build Your Profile</h3>
        <ProgressBar now={getProgress()} label={`${getProgress()}%`} className="mb-4" />

        {step === 1 && <AboutForm />}
        {step === 2 && <AccountForm />}
        {step === 3 && <AddressForm />}

        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={prevStep} disabled={step === 1}>
            Previous
          </Button>

          {step < 3 ? (
            <Button variant="primary" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button variant="success">Finish</Button>
          )}
        </div>
      </Card>
    </Container>
  );
}
