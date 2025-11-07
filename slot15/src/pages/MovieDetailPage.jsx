import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";
import movieApi from "../api/movieAPI";

const genreMap = {
  1: "Sci-Fi",
  2: "Comedy",
  3: "Drama",
  4: "Horror",
  5: "Romance",
  6: "Action",
  7: "Thriller",
};

const MovieDetailPage = () => {
  const { id } = useParams(); // lấy id từ URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await movieApi.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết phim:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Đang tải thông tin phim...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center mt-5">
        <p>Không tìm thấy phim!</p>
        <Button onClick={() => navigate("/movies")}>Quay lại</Button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Card className="p-3 shadow-sm">
        <div className="d-flex">
          <img
            src={movie.avatar || "https://via.placeholder.com/150"}
            alt={movie.title}
            style={{ width: 200, height: 200, objectFit: "cover", borderRadius: 10, marginRight: 20 }}
          />
          <div>
            <h3>{movie.title}</h3>
            <p><strong>Thể loại:</strong> {genreMap[movie.genreId] || "Không rõ"}</p>
            <p><strong>Năm:</strong> {movie.year}</p>
            <p><strong>Thời lượng:</strong> {movie.duration} phút</p>
          </div>
        </div>
        <hr />
        <p><strong>Mô tả:</strong></p>
        <p>{movie.description}</p>

        <Button variant="secondary" onClick={() => navigate("/movies")}>
          ← Quay lại danh sách
        </Button>
      </Card>
    </div>
  );
};

export default MovieDetailPage;
