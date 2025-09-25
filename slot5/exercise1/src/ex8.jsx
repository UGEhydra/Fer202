import React from "react";

export default function App() {
  const ages2 = [12, 15, 19, 22, 33, 17, 20, 14, 18];

  // Reduce nâng cao: tính tổng, min, max, đếm teen & adult
  const stats = ages2.reduce(
    (acc, age) => {
      acc.total += age;
      acc.min = age < acc.min ? age : acc.min;
      acc.max = age > acc.max ? age : acc.max;
      if (age >= 13 && age <= 19) acc.buckets.teen++;
      if (age >= 20) acc.buckets.adult++;
      return acc;
    },
    {
      total: 0,
      min: Infinity,
      max: -Infinity,
      buckets: { teen: 0, adult: 0 }
    }
  );

  return (
    <div>
      <h1>Thống kê tuổi</h1>
      <p><strong>Tổng:</strong> {stats.total}</p>
      <p><strong>Nhỏ nhất:</strong> {stats.min}</p>
      <p><strong>Lớn nhất:</strong> {stats.max}</p>
      <h2>Phân nhóm</h2>
      <p>Teen (13–19): {stats.buckets.teen}</p>
      <p>Adult (20+): {stats.buckets.adult}</p>
    </div>
  );
}
