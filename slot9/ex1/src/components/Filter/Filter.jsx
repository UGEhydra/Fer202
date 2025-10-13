import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { movies } from "../../data/movies";
import MovieCard from "../Movies/MovieCard";  // ✅ Sửa đường dẫn này

export default function Filter() {
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    let result = [...movies];

    // 🔍 Search theo title hoặc description
    if (search.trim() !== "") {
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📅 Filter theo năm
    if (filterYear === "before2000") {
      result = result.filter((m) => m.year <= 2000);
    } else if (filterYear === "2001-2015") {
      result = result.filter((m) => m.year >= 2001 && m.year <= 2015);
    } else if (filterYear === "after2015") {
      result = result.filter((m) => m.year > 2015);
    }

    // ↕️ Sort
    switch (sortBy) {
      case "yearAsc":
        result.sort((a, b) => a.year - b.year);
        break;
      case "yearDesc":
        result.sort((a, b) => b.year - a.year);
        break;
      case "titleAsc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleDesc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "durationAsc":
        result.sort((a, b) => a.duration - b.duration);
        break;
      case "durationDesc":
        result.sort((a, b) => b.duration - a.duration);
        break;
      default:
        break;
    }

    setFilteredMovies(result);
  }, [search, filterYear, sortBy]);

  return (
    <div className="container mt-4">
      {/* Bộ lọc */}
      <Card className="p-3 mb-4 shadow-sm">
        <h5 className="mb-3">🎛 Movie Filter</h5>
        <Row className="g-3">
          {/* Search */}
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="🔍 Search movie title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>

          {/* Filter by year */}
          <Col md={4}>
            <Form.Select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="all">All years</option>
              <option value="before2000">≤ 2000</option>
              <option value="2001-2015">2001 – 2015</option>
              <option value="after2015">&gt; 2015</option>

            </Form.Select>
          </Col>

          {/* Sort */}
          <Col md={4}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort by...</option>
              <option value="yearAsc">Year ↑</option>
              <option value="yearDesc">Year ↓</option>
              <option value="titleAsc">Title A → Z</option>
              <option value="titleDesc">Title Z → A</option>
              <option value="durationAsc">Duration ↑</option>
              <option value="durationDesc">Duration ↓</option>
            </Form.Select>
          </Col>
        </Row>
      </Card>

      {/* Hiển thị tổng số phim */}
      <p className="text-secondary mb-3">
        🎬 {filteredMovies.length} movie{filteredMovies.length !== 1 ? "s" : ""} found
      </p>

      {/* Danh sách phim */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredMovies.length === 0 ? (
          <p className="text-muted text-center">No movies found.</p>
        ) : (
          filteredMovies.map((m) => (
            <Col key={m.id}>
              <MovieCard
                img={m.poster}
                title={m.title}
                text={m.description}
                genre={m.genre}
                year={m.year}
                country={m.country}
                duration={m.duration}
              />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}
