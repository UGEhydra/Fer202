import React from "react";

export default function App() {
  const companies = [
    { name: "Alpha", category: "Finance", start: 1999, end: 2007 },
    { name: "Beta", category: "Tech", start: 2005, end: 2015 }
  ];

  // Spread: tạo object mới từ companies[0] và tăng start thêm 1 (bất biến)
  const company0New = { ...companies[0], start: companies[0].start + 1 };

  // Rest: hàm gộp nhiều mảng lại thành một
  function concatAll(...arrays) {
    return [].concat(...arrays);
  }

  const merged = concatAll([1, 2], [3], [4, 5]);

  return (
    <div>
      <h1>Spread vs Rest</h1>

      <h2>Bất biến (Spread)</h2>
      <p>
        <strong>Gốc:</strong>{" "}
        {JSON.stringify(companies[0])}
      </p>
      <p>
        <strong>Mới:</strong>{" "}
        {JSON.stringify(company0New)}
      </p>

      <h2>Gộp mảng (Rest)</h2>
      <p>Kết quả: {merged.join(", ")}</p>
    </div>
  );
}
