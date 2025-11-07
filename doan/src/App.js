import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderComponent from "./component/HeaderComponent";
import FooterComponent from "./component/FooterComponent";
import HomePage from "./component/HomePage";
import StorePage from "./component/StorePage";
import { StoreProvider } from "./contexts/StoreContext"; // ⬅️ Thêm dòng này

function App() {
  return (
    <StoreProvider>
      <Router>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <HeaderComponent />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/store" element={<StorePage />} />
            </Routes>
          </div>
          <FooterComponent />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
