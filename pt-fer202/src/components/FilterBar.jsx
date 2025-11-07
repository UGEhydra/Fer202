// src/components/FilterBar.jsx
import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';

const FilterBar = () => {
  const { filter, setFilter, payments } = usePayment();

  // derive options from payments
  const semesters = Array.from(new Set(payments.map((p) => p.semester))).filter(Boolean);
  const courses = Array.from(new Set(payments.map((p) => p.courseName))).filter(Boolean);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            <Col xs={12} lg={4}>
              <Form.Group>
                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                <Form.Control
                  name="search"
                  value={filter.search || ''}
                  onChange={handleChange}
                  type="text"
                  placeholder="Search by semester or course name"
                />
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Semester</Form.Label>
                <Form.Select name="semester" value={filter.semester || ''} onChange={handleChange}>
                  <option value="">All Semesters</option>
                  {semesters.map((s) => <option key={s} value={s}>{s}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Course</Form.Label>
                <Form.Select name="course" value={filter.course || ''} onChange={handleChange}>
                  <option value="">All Courses</option>
                  {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4} lg={4}>
              <Form.Group>
                <Form.Label>Sắp xếp theo:</Form.Label>
                <Form.Select name="sort" value={filter.sort || ''} onChange={handleChange}>
                  <option value="">-- None --</option>
                  <option value="course_asc">Course name ascending</option>
                  <option value="course_desc">Course name descending</option>
                  <option value="date_asc">Date ascending</option>
                  <option value="date_desc">Date descending</option>
                  <option value="amount_asc">Amount ascending</option>
                  <option value="amount_desc">Amount descending</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;
