import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MotorbikeListPage from "./pages/MotorbikeListPage";
import MotorbikeDetailPage from "./pages/MotorbikeDetailPage";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext"; // ✅ Thêm dòng này

function App() {
  return (
    <AuthProvider>
      <AppProvider> {/* ✅ Bọc toàn bộ Router bên trong */}
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/motorbikes" element={<MotorbikeListPage />} />
            <Route path="/motorbikes/:id" element={<MotorbikeDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="*"
              element={<h2 className="text-center mt-5">404 Not Found</h2>}
            />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
