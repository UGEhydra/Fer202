import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MoviePage from "./pages/MoviePage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </>
  );
}

export default App;
