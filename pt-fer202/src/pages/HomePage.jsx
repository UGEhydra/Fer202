import React, { useEffect, useState } from "react";
import { Table, Container, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { getPayments } from "../services/api";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";

export default function HomePage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState({ search: "", sort: "" });
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPayments();
      setPayments(data.filter((p) => p.userId === user.id));
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    let list = [...payments];

    // Search
    if (filter.search) {
      list = list.filter(
        (p) =>
          p.semester.toLowerCase().includes(filter.search.toLowerCase()) ||
          p.courseName.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    // Sort
    switch (filter.sort) {
      case "name-asc":
        list.sort((a, b) => a.courseName.localeCompare(b.courseName));
        break;
      case "name-desc":
        list.sort((a, b) => b.courseName.localeCompare(a.courseName));
        break;
      case "date-asc":
        list.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "amount-asc":
        list.sort((a, b) => a.amount - b.amount);
        break;
      case "amount-desc":
        list.sort((a, b) => b.amount - a.amount);
        break;
      default:
        break;
    }

    setFilteredList(list);
  }, [filter, payments]);

  return (
    <>
      <Header />
      <Container>
        <Card className="p-4 shadow-sm">
          <h4 className="mb-3">Payment List</h4>
          <FilterBar filter={filter} onFilterChange={setFilter} />
          <Table striped bordered hover>
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
              {filteredList.map((p, i) => (
                <tr key={p.id}>
                  <td>{i + 1}</td>
                  <td>{p.semester}</td>
                  <td>{p.courseName}</td>
                  <td>{p.amount.toLocaleString()}</td>
                  <td>{p.date}</td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
}
