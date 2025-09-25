import React from "react";

export default function App() {
  const people = [
    { name: "Ann", age: 19 },
    { name: "Bob", age: 12 },
    { name: "Cindy", age: 15 },
    { name: "David", age: 22 },
    { name: "Emma", age: 13 }
  ];

  // Lọc tuổi từ 13 đến 19 và tạo chuỗi "Tên (Tuổi)"
  const teens = people
    .filter(person => person.age >= 13 && person.age <= 19)
    .map(person => `${person.name} (${person.age})`);

  return (
    <div>
      <h1>Danh sách Teen</h1>
      <ul>
        {teens.map((teen, index) => (
          <li key={index}>{teen}</li>
        ))}
      </ul>
    </div>
  );
}
