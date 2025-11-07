import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

// ✅ Trạng thái mặc định khi thêm mới
const initialMovieState = {
  id: "",
  title: "",
  year: "",
  genreId: "",
  duration: "",
  avatar: "",
  description: "",
};

const movieCategories = [
  'Hành động',
  'Kinh dị',
  'Hài kịch',
  'Tình cảm',
  'Khoa học viễn tưởng',
  'Phiêu lưu',
  'Hoạt hình',
  'Tài liệu'
];

const MovieFields = ({ currentMovie = initialMovieState, handleInputChange, handleFileChange, imagePreview }) => (
  <>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="formAvatar">
          <Form.Label>Ảnh (URL hoặc upload)</Form.Label>
          <Form.Control
            type="file"
            name="avatarFile"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2"
          />
          <Form.Control
            type="text"
            name="avatar"
            value={currentMovie.avatar || ''}
            onChange={handleInputChange}
            placeholder="Hoặc nhập URL hình ảnh"
          />
          {(imagePreview || currentMovie.avatar) && (
            <div className="mt-2">
              <Image
                src={imagePreview || currentMovie.avatar}
                alt="Preview"
                thumbnail
                style={{ maxWidth: '200px', maxHeight: '150px' }}
              />
            </div>
          )}
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="formTitle">
          <Form.Label>Tên Phim</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={currentMovie.title || ''}
            onChange={handleInputChange}
            placeholder="Tên phim"
            required
          />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={4}>
        <Form.Group controlId="formCategory">
          <Form.Label>Danh mục</Form.Label>
          <Form.Select
            name="genreId"
            value={currentMovie.genreId || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">Chọn danh mục</option>
            {movieCategories.map((c, i) => (
              <option key={i} value={i + 1}>
                {c}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group controlId="formDuration">
          <Form.Label>Thời lượng (phút)</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={currentMovie.duration || ''}
            onChange={handleInputChange}
            placeholder="Phút"
            required
          />
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group controlId="formYear">
          <Form.Label>Năm</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={currentMovie.year || ''}
            onChange={handleInputChange}
            placeholder="Năm"
            required
          />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col>
        <Form.Group controlId="formDesc">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={currentMovie.description || ''}
            onChange={handleInputChange}
            rows={3}
          />
        </Form.Group>
      </Col>
    </Row>
  </>
);

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal } = state;
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    const { name, type, value } = e.target;
    const newValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;
    dispatch({ type: 'UPDATE_FIELD', payload: { name, value: newValue } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const imageUrl = ev.target.result;
        setImagePreview(imageUrl);
        dispatch({
          type: 'UPDATE_FIELD',
          payload: { name: 'avatar', value: imageUrl },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseEditModal = () => {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentMovie) return;

    const dataToSend = {
      ...currentMovie,
      duration: Number(currentMovie.duration || 0),
      year: Number(currentMovie.year || 0),
      genreId: Number(currentMovie.genreId || 0),
    };

    const success = await handleCreateOrUpdate(
      dataToSend,
      isEditing !== null,
      isEditing
    );

    if (success && isEditing === null) setImagePreview('');
  };

  const isCreating = isEditing === null;

  return (
    <>
      <Container className="p-3 mb-4 border bg-white">
        <h3 className="mb-3">📽️ Thêm Phim Mới</h3>
        <Form onSubmit={handleSubmit}>
          <MovieFields
            currentMovie={isCreating ? initialMovieState : currentMovie}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            imagePreview={imagePreview}
          />
          <div className="d-flex gap-2 mt-3">
            <Button variant="success" type="submit">
              ➕ Thêm Phim
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => dispatch({ type: 'RESET_FORM' })}
            >
              Reset
            </Button>
          </div>
        </Form>
      </Container>

      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa Phim ID: {isEditing}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <MovieFields
              currentMovie={currentMovie || initialMovieState}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              imagePreview={imagePreview || currentMovie?.avatar || ""}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Hủy
            </Button>
            <Button variant="warning" type="submit">
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;
