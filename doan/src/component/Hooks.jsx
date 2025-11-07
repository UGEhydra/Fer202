import React, { useState, useEffect, useReducer } from "react";

// Bước 1: Tạo reducer đơn giản
const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const Hooks = () => {
  // useState
  const [name, setName] = useState("FreshFood Mart");

  // useReducer
  const [count, dispatch] = useReducer(counterReducer, 0);

  // useEffect
  useEffect(() => {
    console.log(`Store name: ${name}`);
  }, [name]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Welcome to {name}</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter store name"
      />
      <h3>Counter: {count}</h3>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </div>
  );
};

export default Hooks;
