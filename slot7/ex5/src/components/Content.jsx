import React from "react";

const students = [
  { id: "DE160182", name: "Nguyễn Hữu Quốc Khánh", campus: "Đà Nẵng", image: "/s1.jpg" },
  { id: "DE160377", name: "Choy Vinh Thức", campus: "Quảng Nam", image: "/s2.jpg" },
  { id: "DE160547", name: "Đỗ Nguyên Phúc", campus: "Quảng Nam", image: "/s3.jpg" },
  { id: "DE170049", name: "Lê Hoàng Minh", campus: "Đà Nẵng", image: "/s4.jpg" },
];

export default function Content() {
  return (
    <div>
      {/* Banner */}
      <div className="banner">
        <img src="/banner.jpg" alt="Banner" />
      </div>

      {/* Breadcrumb */}
      <div
        className="breadcrumb"
        style={{
          display: "inline-block",
          background: "#f5f5f5",
          padding: "10px 16px",
          borderRadius: "6px",
          fontSize: "16px",
          margin: "20px 0",
        }}
      >
        <span
          style={{
            color: "#f26522",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Home
        </span>
        <span style={{ color: "#555" }}> / Students</span>
      </div>

      {/* Title */}
      <h2 className="title">Students Detail</h2>

      {/* Student Grid */}
      <div className="student-grid">
        {students.map((s) => (
          <div key={s.id} className="student-card" style={{ textAlign: "center" }}>
            {/* Ảnh nhỏ lại */}
            <img
              src={s.image}
              alt={s.name}
              className="student-img"
              style={{ width: "640px", height: "680px", objectFit: "cover", marginBottom: "10px" }}
            />

            {/* ID */}
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>{s.id}</p>

            {/* Name + Campus trên 1 hàng */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>{s.name}</span>
              <span>{s.campus}</span>
            </div>

            {/* Attendance radio */}
            <div
              className="attendance"
              style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}
            >
              <label>
                <input type="radio" name={`status-${s.id}`} /> Absent
              </label>
              <label>
                <input type="radio" name={`status-${s.id}`} /> Present
              </label>
            </div>

            {/* Submit button */}
            <button className="submit-btn">Submit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
