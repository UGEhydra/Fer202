// src/pages/DashboardPage.jsx
import React from 'react';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';
import { Container } from 'react-bootstrap';

const DashboardPage = () => {
  return (
    <>
      <NavigationHeader />
      <Container>
        <FilterBar />
        <PaymentTable />
      </Container>
    </>
  );
};

export default DashboardPage;
