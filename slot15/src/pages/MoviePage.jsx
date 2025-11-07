import React from "react";
import MovieTable from "../components/MovieTable";
import MovieForm from "../components/MovieForm";

const MoviePage = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🎬 Quản lý Phim</h2>
      
      {/* Form thêm/sửa phim */}
      <MovieForm />

      {/* Bảng danh sách phim */}
      <MovieTable />
    </div>
  );
};

export default MoviePage;
