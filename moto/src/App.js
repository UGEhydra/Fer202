import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} />} />
          {/* Sau này thêm motorbike list page ở đây */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
