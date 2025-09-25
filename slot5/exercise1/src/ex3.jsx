import React from "react";

export default function App() {
  const person = {
    name: "Alice",
    age: 30,
    address: {
      street: "123 Main St",
      city: "Wonderland",
    },
  };

  // Destructuring object lồng nhau
  const {
    address: { street, city = "Unknown City" },
  } = person;

  return (
    <div>
      <h1>Bài Tập 3</h1>
      <p>Thông tin địa chỉ</p>
      <p>Street: {street}</p>
      <p>City: {city}</p>
    </div>
  );
}
