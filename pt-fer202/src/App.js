// src/App.jsx
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';

function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <AppRoutes />
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;
