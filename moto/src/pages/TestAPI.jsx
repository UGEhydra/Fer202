import React, { useEffect, useState } from "react";
import axios from "axios";

const TestAPI = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/motorbikes")
      .then(res => setBikes(res.data))
      .catch(err => console.error("API error:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Test API - Motorbikes</h2>
      <ul>
        {bikes.map(bike => (
          <li key={bike.id}>
            {bike.brand} {bike.model} - ${bike.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestAPI;
