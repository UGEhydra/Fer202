export default function StudentCard({ student }) {
  return (
    <div className="card">
      <img src={student.image} alt={student.name} className="student-img" />
      <h3>{student.name}</h3>
      <p>{student.id}</p>
      <p>{student.campus}</p>

      <div className="attendance">
        <label>
          <input type="radio" name={student.id} /> Absent
        </label>
        <label>
          <input type="radio" name={student.id} /> Present
        </label>
      </div>

      <button className="submit-btn">Submit</button>
    </div>
  );
}
