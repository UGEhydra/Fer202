import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext"; // ✅ thêm context

const CartPage = () => {
  const { state, dispatch } = useApp(); // ✅ lấy cart từ context
  const [total, setTotal] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ Nếu chưa login → không cho vào cart
  useEffect(() => {
    if (!user) {
      alert("You must login first to access your cart!");
      navigate("/");
    }
  }, [user, navigate]);

  // ✅ Load cart khi có user
  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:4000/cart")
        .then((res) => dispatch({ type: "SET_CART", payload: res.data })) // ✅ lưu vào context
        .catch((err) => console.error("Error loading cart:", err));
    }
  }, [user, dispatch]);

  // ✅ Tính tổng tiền
  useEffect(() => {
    const totalAmount = state.cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotal(totalAmount);
  }, [state.cart]);

  // ✅ Cập nhật số lượng
  const handleQuantityChange = (item, newQty) => {
    if (!user) {
      alert("You must login first to change quantity!");
      navigate("/");
      return;
    }
    if (newQty < 1) return;

    axios
      .patch(`http://localhost:4000/cart/${item.id}`, { quantity: newQty })
      .then(() => {
        const updated = state.cart.map((x) =>
          x.id === item.id ? { ...x, quantity: newQty } : x
        );
        dispatch({ type: "UPDATE_CART", payload: updated }); // ✅ cập nhật context
      })
      .catch((err) => console.error("Error updating quantity:", err));
  };

  // ✅ Xóa sản phẩm
  const handleRemove = (item) => {
    if (!user) {
      alert("You must login first to remove items!");
      navigate("/");
      return;
    }

    axios
      .get(`http://localhost:4000/motorbikes/${item.id}`)
      .then((res) => {
        const newStock = res.data.stock + (item.quantity || 1);
        return axios.patch(`http://localhost:4000/motorbikes/${item.id}`, {
          stock: newStock,
        });
      })
      .then(() => axios.delete(`http://localhost:4000/cart/${item.id}`))
      .then(() => {
        const updated = state.cart.filter((x) => x.id !== item.id);
        dispatch({ type: "UPDATE_CART", payload: updated }); // ✅ cập nhật context
        alert(`${item.model} removed from cart!`);
      })
      .catch((err) => console.error("Error removing from cart:", err));
  };

  // ✅ Checkout → Xóa giỏ hàng + Logout
  const handleCheckout = () => {
    if (!user) {
      alert("Please login before checkout!");
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:4000/cart")
      .then((res) => {
        const deletePromises = res.data.map((item) =>
          axios.delete(`http://localhost:4000/cart/${item.id}`)
        );
        return Promise.all(deletePromises);
      })
      .then(() => {
        dispatch({ type: "SET_CART", payload: [] }); // ✅ clear context
        alert("Checkout successful! You have been logged out.");
        logout();
        navigate("/");
      })
      .catch((err) => console.error("Error during checkout:", err));
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {state.cart.length === 0 ? (
        <h5 className="text-center text-muted">Your cart is empty.</h5>
      ) : (
        <>
          <Table bordered hover responsive className="align-middle">
            <thead className="text-center table-light">
              <tr>
                <th>Model</th>
                <th>Price</th>
                <th style={{ width: "120px" }}>Qty</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {state.cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.model}</td>
                  <td>${item.price.toLocaleString()}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) =>
                        handleQuantityChange(item, parseInt(e.target.value))
                      }
                      disabled={!user}
                      style={{
                        width: "70px",
                        display: "inline-block",
                        textAlign: "center",
                      }}
                    />
                  </td>
                  <td>
                    ${(item.price * (item.quantity || 1)).toLocaleString()}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemove(item)}
                      disabled={!user}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h4 className="m-0">
              <strong>Total:</strong> ${total.toLocaleString()}
            </h4>
            <Button variant="success" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
