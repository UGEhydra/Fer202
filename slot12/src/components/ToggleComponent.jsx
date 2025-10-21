import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";

// 1️⃣ Trạng thái khởi tạo
const initialState = { isOn: false };

// 2️⃣ Hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return { isOn: !state.isOn };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// 3️⃣ Component chính
function ToggleComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggle = () => dispatch({ type: "TOGGLE" });
  const reset = () => dispatch({ type: "RESET" });

  return (
    <Card
      className="p-4 text-center"
      style={{
        width: "350px",
        margin: "40px auto",
        backgroundColor: state.isOn ? "#d4edda" : "#f8d7da",
        border: state.isOn ? "2px solid #28a745" : "2px solid #dc3545",
      }}
    >
      <h3>Trạng thái hiện tại:</h3>
      <h2
        style={{
          color: state.isOn ? "#28a745" : "#dc3545",
          fontWeight: "bold",
        }}
      >
        {state.isOn ? "ON 🔆" : "OFF 🌙"}
      </h2>

      <div className="mt-3">
        <Button
          variant={state.isOn ? "danger" : "success"}
          onClick={toggle}
          style={{ margin: "0 10px" }}
        >
          {state.isOn ? "Tắt" : "Bật"}
        </Button>

        <Button variant="secondary" onClick={reset}>
          Reset
        </Button>
      </div>
    </Card>
  );
}

export default ToggleComponent;
