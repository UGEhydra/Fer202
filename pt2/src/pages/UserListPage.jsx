import React from "react";
import NavigationHeader from "../components/NavigationHeader";
import UserFilter from "../components/UserFilter";
import UserTable from "../components/UserTable";
import { Container } from "react-bootstrap";

const UserListPage = () => {
  return (
    <>
      <NavigationHeader />
      <Container>
        <h3 className="mb-4">User Management</h3>
        <UserFilter />
        <UserTable />
      </Container>
    </>
  );
};

export default UserListPage;
