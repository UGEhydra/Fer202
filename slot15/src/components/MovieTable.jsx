import React from "react";
import { Table, Button, Image, Modal, Spinner, Alert, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMovieState, useMovieDispatch } from "../contexts/MovieContext";

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, loading, movieToDelete, showDeleteModal } = state;
  const navigate = useNavigate();

  const genreMap = {
    1: "Sci-Fi",
    2: "Comedy",
    3: "Drama",
    4: "Horror",
    5: "Romance",
    6: "Action",
    7: "Thriller",
  };

  // 🔍 Lọc phim theo tên
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(state.searchTerm?.toLowerCase() || "")
  );

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" className="me-2" />
          <Alert variant="info" className="mt-3">
            Đang tải dữ liệu phim...
          </Alert>
        </div>
      ) : (
        <>
          {/* Thanh tìm kiếm */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h4>🎞️ Danh sách phim</h4>
            <Form className="d-flex" style={{ width: "300px" }}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo tên phim..."
                  value={state.searchTerm}
                  onChange={(e) =>
                    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
                  }
                />
              </InputGroup>
            </Form>
          </div>

          {/* Bảng danh sách phim */}
          <Table striped bordered hover responsive className="mt-4 bg-white">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>ID</th>
                <th>Tên Phim</th>
                <th>Danh mục</th>
                <th>Thời lượng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <tr key={movie.id}>
                    <td style={{ width: 80 }}>
                      <Image
                        src={movie.avatar || "https://via.placeholder.com/80"}
                        alt={movie.title}
                        style={{ width: 60, height: 60, objectFit: "cover" }}
                        rounded
                      />
                    </td>
                    <td>#{movie.id}</td>
                    {/* 👇 Bấm vào tên phim để xem chi tiết */}
                    <td
                      style={{ cursor: "pointer", color: "#007bff" }}
                      onClick={() => navigate(`/movies/${movie.id}`)}
                    >
                      <strong>{movie.title}</strong>
                      <br />
                      <small className="text-muted">({movie.year})</small>
                    </td>
                    <td>{genreMap[movie.genreId] || "Unknown"}</td>
                    <td>{movie.duration} phút</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => navigate(`/movies/${movie.id}`)}
                        className="me-2"
                      >
                        Xem
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          dispatch({ type: "OPEN_EDIT_MODAL", payload: movie })
                        }
                        className="me-2"
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          dispatch({ type: "OPEN_DELETE_MODAL", payload: movie })
                        }
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-3">
                    Không tìm thấy phim nào
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}

      {/* Modal xác nhận xóa */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim "{movieToDelete?.title}" (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
