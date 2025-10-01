const boxStyle = {
  backgroundColor: "#d3d3d3", // màu xám
  color: "black",
  border: "1px solid #6c757d",
  padding: "1rem"
};

export default function Grid() {
  return (
    <div className="container text-center my-4">
      <div className="row g-0">
        <div className="col" style={boxStyle}>First col</div>
        <div className="col" style={boxStyle}>Second col</div>
      </div>
      <div className="row g-0">
        <div className="col" style={boxStyle}>col</div>
        <div className="col" style={boxStyle}>col</div>
        <div className="col" style={boxStyle}>col</div>
      </div>
      <div className="row g-0">
        <div className="col" style={boxStyle}>col</div>
        <div className="col" style={boxStyle}>col</div>
        <div className="col" style={boxStyle}>col</div>
        <div className="col" style={boxStyle}>col</div>
      </div>
    </div>
  );
}
