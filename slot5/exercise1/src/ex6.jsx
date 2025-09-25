import React from "react";

export default function App() {
  const companies = [
    { name: "Alpha", category: "Finance", start: 1999, end: 2007 },
    { name: "Beta", category: "Tech", start: 2005, end: 2015 },
    { name: "Gamma", category: "Retail", start: 2001, end: 2003 },
    { name: "Delta", category: "Auto", start: 1995, end: 2005 },
    { name: "Epsilon", category: "Health", start: 2000, end: 2010 }
  ];

  // Sắp xếp theo năm kết thúc và lấy 3 công ty đầu
  const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);
  const top3 = sortedCompanies.slice(0, 3);

  return (
    <div>
      <h1>Top 3 công ty theo năm kết thúc sớm</h1>
      <ul>
        {top3.map((c, index) => (
          <li key={index}>
            {c.name} – {c.end}
          </li>
        ))}
      </ul>
    </div>
  );
}
