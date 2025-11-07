import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Image, Alert } from "react-bootstrap";
import * as api from "../services/api";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState({});
  const [alert, setAlert] = useState("");

  const fetchUsers = async () => {
    const res = await api.getUsers();
    setUsers(res);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBan = async (id) => {
    const user = users.find((u) => u.id === id);
    if (user.status === "banned") {
      setAlert("User already banned!");
      return;
    }
    await api.updateUser(id, { ...user, status: "banned" });
    setAlert(`User ${user.username} has been banned.`);
    fetchUsers();
  };

  const handleFilter = (criteria) => setFilter(criteria);

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      !filter.search ||
      u.username.toLowerCase().includes(filter.search.toLowerCase()) ||
      u.fullName.toLowerCase().includes(filter.search.toLowerCase());
    const matchRole = !filter.role || u.role === filter.role;
    const matchStatus = !filter.status || u.status === filter.status;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <>
      {alert && <Alert variant="info" onClose={() => setAlert("")} dismissible>{alert}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td><Image src={u.avatar} roundedCircle width={40} height={40} /></td>
              <td>{u.username}</td>
              <td>{u.fullName}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td>
                <Button size="sm" variant="info" onClick={() => setSelected(u)}>View</Button>{" "}
                <Button size="sm" variant="danger" onClick={() => handleBan(u.id)}>Ban</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={!!selected} onHide={() => setSelected(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        {selected && (
          <Modal.Body>
            <Image src={selected.avatar} roundedCircle width={80} height={80} className="mb-3" />
            <p><strong>Username:</strong> {selected.username}</p>
            <p><strong>Full Name:</strong> {selected.fullName}</p>
            <p><strong>Role:</strong> {selected.role}</p>
            <p><strong>Status:</strong> {selected.status}</p>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}
