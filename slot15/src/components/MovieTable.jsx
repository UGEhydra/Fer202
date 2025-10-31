import React from 'react';
import { Table, Button, Image, Modal, Spinner, Alert } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, loading, movieToDelete, showDeleteModal } = state;

  const genreMap = { 1: 'Sci-Fi', 2: 'Comedy', 3: 'Drama', 4: 'Horror', 5: 'Romance', 6: 'Action', 7: 'Thriller' };

  const handleEditClick = (movie) => dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  const handleDeleteClick = (movie) => dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4"><Spinner animation="border" role="status" className="me-2" /><Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert></div>
      ) : (
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
            {movies.map(movie => (
              <tr key={movie.id}>
                <td style={{ width: 80 }}><Image src={movie.avatar || 'https://via.placeholder.com/80'} alt={movie.title} style={{ width: 60, height: 60, objectFit: 'cover' }} rounded /></td>
                <td>#{movie.id}</td>
                <td><strong>{movie.title}</strong><br/><small className="text-muted">({movie.year})</small></td>
                <td>{genreMap[movie.genreId] || 'Unknown'}</td>
                <td>{movie.duration} phút</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleEditClick(movie)} className="me-2">Sửa</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)}>Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton><Modal.Title>Xác nhận Xóa Phim</Modal.Title></Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa phim "{movieToDelete?.title}" (ID: {movieToDelete?.id}) không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>Hủy</Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>Xác nhận Xóa</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
