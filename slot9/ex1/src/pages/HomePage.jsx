import React from "react";
import MyNavBar from "../components/Navbar/NavBar";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import Filter from "../components/Filter/Filter";

export default function HomePage() {
  return (
    <div>
      <MyNavBar />   {/* ✅ Thanh NavBar nằm ở đầu trang */}
      <HomeCarousel />
      <div className="container mt-5">
        <h4 className="mb-3">🎬 Featured Movies</h4>
        <Filter />
      </div>
    </div>
  );
}
