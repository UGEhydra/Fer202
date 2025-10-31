import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MovieManager from "./pages/MovieManager";
import Header from "./components/Header";
import { useAuth } from "./contexts/AuthContext";

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/movies"
          element={user ? <MovieManager /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
