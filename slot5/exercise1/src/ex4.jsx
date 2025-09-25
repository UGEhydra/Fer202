import React from "react";

export default function App() {
  const ages = [33, 12, 20, 16];

  // Destructuring với default value + rest
  const [first, , third = 0, ...restAges] = ages;

  return (
    <div>
      <h1>Kết quả Destructuring</h1>
      <p>First: {first}</p>
      <p>Third: {third}</p>
      <p>Rest Ages: {restAges.join(", ")}</p>
    </div>
  );
}
