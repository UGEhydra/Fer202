// src/components/PaymentTable.jsx
import React, { useMemo } from 'react';
import { Table, Card } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useAuth } from '../contexts/AuthContext';

const PaymentTable = () => {
  const { payments, filter } = usePayment();
  const { user } = useAuth();

  // filter to current user
  const userPayments = useMemo(() => payments.filter((p) => String(p.userId) === String(user?.id)), [payments, user]);

  // apply search / semester / course
  let list = userPayments.filter((p) => {
    const q = (filter.search || '').toLowerCase();
    const matchesSearch = q === '' || p.semester.toLowerCase().includes(q) || p.courseName.toLowerCase().includes(q);
    const matchesSemester = !filter.semester || p.semester === filter.semester;
    const matchesCourse = !filter.course || p.courseName === filter.course;
    return matchesSearch && matchesSemester && matchesCourse;
  });

  // sort
  switch (filter.sort) {
    case 'course_asc':
      list.sort((a, b) => a.courseName.localeCompare(b.courseName));
      break;
    case 'course_desc':
      list.sort((a, b) => b.courseName.localeCompare(a.courseName));
      break;
    case 'date_asc':
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'date_desc':
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'amount_asc':
      list.sort((a, b) => a.amount - b.amount);
      break;
    case 'amount_desc':
      list.sort((a, b) => b.amount - a.amount);
      break;
    default:
      break;
  }

  const total = list.reduce((s, p) => s + Number(p.amount || 0), 0);

  return (
    <Card className="shadow-sm">
      <Card.Header as="h5">Payment List</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Semester</th>
              <th>Course</th>
              <th>Amount (VND)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p, idx) => (
              <tr key={p.id}>
                <td>{idx + 1}</td>
                <td>{p.semester}</td>
                <td>{p.courseName}</td>
                <td>{Number(p.amount).toLocaleString('vi-VN')}</td>
                <td>{p.date}</td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">No results found</td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="text-end mt-2">
          <strong>Total: </strong> {total.toLocaleString('vi-VN')} VND
        </div>
      </Card.Body>
    </Card>
  );
};

export default PaymentTable;
