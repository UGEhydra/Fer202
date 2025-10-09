import React from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieCard from "../components/Movies/MovieCard";  // ✅ thêm dòng này

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      <div className="mt-4 text-center">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">
          Thêm thông tin về các bộ sưu tập phim nổi bật ở đây.
        </p>
      </div>

      <MovieCard /> {/* ✅ thêm component hiển thị danh sách phim */}
    </div>
  );
}
